'use client';

import { useState, useTransition, useCallback, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { type QuizSettings } from '@/lib/constants';
import { generateMcqAction, type Mcq } from '@/app/quiz/actions';

import QuizSettingsComponent from './quiz-settings';
import QuizCard from './quiz-card';
import QuizSkeleton from './quiz-skeleton';
import QuizResults from './quiz-results';
import { Progress } from './ui/progress';

const TOTAL_QUESTIONS = 10;

type QuizState = 'not-started' | 'loading' | 'in-progress' | 'completed';

export interface ScoreData {
  score: number;
  date: string; // ISO string
}

export default function QuizApp() {
  const [settings, setSettings] = useState<Omit<QuizSettings, 'topic'>>({
    subject: 'science',
    difficulty: 'medium',
    language: 'english',
  });
  const [questions, setQuestions] = useState<Mcq[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizState, setQuizState] = useState<QuizState>('not-started');
  
  const [isLoading, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStartQuiz = useCallback(() => {
    setQuizState('loading');
    setIsSubmitted(false);
    setSelectedAnswer(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    
    startTransition(async () => {
      try {
        const generatedQuestions: Mcq[] = [];
        const questionTexts: string[] = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
          const newQuestion = await generateMcqAction({ ...settings, previousQuestions: questionTexts });
          generatedQuestions.push(newQuestion);
          questionTexts.push(newQuestion.question);
        }
        setQuestions(generatedQuestions);
        setQuizState('in-progress');
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (error as Error).message,
        });
        setQuizState('not-started');
      }
    });
  }, [settings, toast]);
  
  const handleFinishQuiz = useCallback(() => {
    const finalScore = score;
    const today = new Date().toISOString();

    // --- Update History ---
    const newHistoryItem = {
      date: today,
      subject: settings.subject,
      score: finalScore,
      total: TOTAL_QUESTIONS,
    };
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const newHistory = [newHistoryItem, ...storedHistory];
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));


    // --- Update Weekly Progress ---
    const newScoreData: ScoreData = { score: finalScore * 10, date: today };
    const storedWeekly = JSON.parse(localStorage.getItem('weeklyProgress') || '[]') as ScoreData[];
    const updatedWeekly = [...storedWeekly, newScoreData];
    localStorage.setItem('weeklyProgress', JSON.stringify(updatedWeekly));
    

    // --- Update Leaderboard ---
    // In a real app, user data would come from auth
    const currentUser = { name: "You", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" };
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    
    const userIndex = storedLeaderboard.findIndex((u: any) => u.name === currentUser.name);
    if (userIndex > -1) {
        storedLeaderboard[userIndex].score += finalScore * 10;
    } else {
        storedLeaderboard.push({ ...currentUser, score: finalScore * 10 });
    }
    const sortedLeaderboard = storedLeaderboard.sort((a: any, b: any) => b.score - a.score).map((u: any, i: number) => ({ ...u, rank: i + 1 }));

    localStorage.setItem('leaderboard', JSON.stringify(sortedLeaderboard));
    
    setQuizState('completed');
  }, [score, settings.subject]);


  const handleNextQuestion = useCallback(() => {
    setIsSubmitted(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleFinishQuiz();
    }
  }, [currentQuestionIndex, questions.length, handleFinishQuiz]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null) {
      toast({
        variant: "destructive",
        title: "No Answer Selected",
        description: "Please select an answer before submitting.",
      });
      return;
    }
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    setIsSubmitted(true);
  }, [selectedAnswer, toast, questions, currentQuestionIndex]);

  const mcq = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {quizState !== 'in-progress' && quizState !== 'loading' && (
         <QuizSettingsComponent
          settings={settings}
          onSettingsChange={setSettings}
          onStartQuiz={handleStartQuiz}
          isLoading={isLoading}
          isQuizActive={quizState === 'in-progress'}
        />
      )}

      {quizState === 'loading' && <QuizSkeleton />}
      
      {quizState === 'in-progress' && mcq && (
        <>
          <div className="w-full max-w-2xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}</p>
              <p className="text-sm font-bold">Score: {score}</p>
            </div>
            <Progress value={progress} className="w-full mb-4" />
            <QuizCard
              mcq={mcq}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={setSelectedAnswer}
              isSubmitted={isSubmitted}
              onSubmit={handleSubmitAnswer}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={currentQuestionIndex === TOTAL_QUESTIONS - 1}
            />
          </div>
        </>
      )}

      {quizState === 'completed' && (
        <QuizResults
          score={score}
          totalQuestions={TOTAL_QUESTIONS}
          onRestart={handleStartQuiz}
        />
      )}
    </div>
  );
}
