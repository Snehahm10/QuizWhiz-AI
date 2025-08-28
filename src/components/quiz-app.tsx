
'use client';

import { useState, useTransition, useCallback, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { type QuizSettings } from '@/lib/constants';
import { generateMcqAction, type Mcq } from '@/app/quiz/actions';
import { useAuth } from '@/hooks/use-auth';

import QuizSettingsComponent from './quiz-settings';
import QuizCard from './quiz-card';
import QuizSkeleton from './quiz-skeleton';
import QuizResults from './quiz-results';

const TOTAL_QUESTIONS = 10;

type QuizState = 'not-started' | 'loading-initial' | 'in-progress' | 'loading-next' | 'completed';

export interface ScoreData {
  score: number;
  date: string; // ISO string
  user: string;
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
  
  const [isGenerating, startTransition] = useTransition();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleStartQuiz = useCallback(() => {
    setQuizState('loading-initial');
    setIsSubmitted(false);
    setSelectedAnswer(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    
    startTransition(async () => {
      try {
        const generatedQuestions: Mcq[] = [];
        const questionTexts: string[] = [];
        // For the sake of speed in the prototype, let's just generate one question to start.
        const newQuestion = await generateMcqAction({ ...settings, previousQuestions: [] });
        generatedQuestions.push(newQuestion);

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
  
  // This function is now defined inside the component to be used by handleFinishQuiz
  // It reads from localStorage directly to avoid stale closures.
  const updateGlobalStats = (finalScore: number) => {
    if (!user) return;
  
    const today = new Date().toISOString();
    const userId = user.uid;
    const userName = user.displayName || user.email?.split('@')[0] || 'Anonymous';
    const userAvatar = user.photoURL || `https://i.pravatar.cc/150?u=${userId}`;
  
    // --- Update History (per-user) ---
    const historyKey = `quizHistory_${userId}`;
    const storedHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
    const newHistoryItem = {
      date: today,
      subject: settings.subject,
      score: finalScore,
      total: TOTAL_QUESTIONS,
    };
    const newHistory = [newHistoryItem, ...storedHistory];
    localStorage.setItem(historyKey, JSON.stringify(newHistory));
  
    // --- Update Weekly Progress (Global) ---
    const weeklyKey = `weeklyProgress_global`;
    const newScoreData: ScoreData = { score: finalScore * 10, date: today, user: userName };
    const storedWeekly = JSON.parse(localStorage.getItem(weeklyKey) || '[]') as ScoreData[];
    const updatedWeekly = [...storedWeekly, newScoreData];
    localStorage.setItem(weeklyKey, JSON.stringify(updatedWeekly));
      
    // --- Update Leaderboard (Global) ---
    const leaderboardKey = `leaderboard_global`;
    const storedLeaderboard = JSON.parse(localStorage.getItem(leaderboardKey) || '[]');
      
    const userIndex = storedLeaderboard.findIndex((u: any) => u.name === userName);
    if (userIndex > -1) {
      storedLeaderboard[userIndex].score += finalScore * 10;
    } else {
      storedLeaderboard.push({ name: userName, avatar: userAvatar, score: finalScore * 10 });
    }
    const sortedLeaderboard = storedLeaderboard.sort((a: any, b: any) => b.score - a.score).map((u: any, i: number) => ({ ...u, rank: i + 1 }));
    localStorage.setItem(leaderboardKey, JSON.stringify(sortedLeaderboard));
  };

  const handleFinishQuiz = useCallback(() => {
    updateGlobalStats(score);
    setQuizState('completed');
  }, [score, settings.subject, user]);


  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex >= TOTAL_QUESTIONS - 1) {
      handleFinishQuiz();
      return;
    }

    setQuizState('loading-next');
    
    startTransition(async () => {
        try {
            const questionTexts = questions.map(q => q.question);
            const newQuestion = await generateMcqAction({ ...settings, previousQuestions: questionTexts });
            
            setQuestions(prev => [...prev, newQuestion]);
            setCurrentQuestionIndex(prev => prev + 1);
            setIsSubmitted(false);
            setSelectedAnswer(null);
            setQuizState('in-progress');

        } catch (error) {
             toast({
                variant: "destructive",
                title: "Error fetching next question",
                description: (error as Error).message,
            });
            // Try to recover or end quiz
            setQuizState('in-progress');
        }
    });

  }, [currentQuestionIndex, handleFinishQuiz, questions, settings, toast]);

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

  const isLoading = quizState === 'loading-initial' || quizState === 'loading-next';
  const mcq = questions[currentQuestionIndex];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      {quizState === 'not-started' || quizState === 'completed' ? (
         <QuizSettingsComponent
          settings={settings}
          onSettingsChange={setSettings}
          onStartQuiz={handleStartQuiz}
          isLoading={isGenerating}
          isQuizActive={quizState === 'in-progress'}
        />
      ) : null}

      {(quizState === 'loading-initial' || quizState === 'loading-next') && <QuizSkeleton />}
      
      {quizState === 'in-progress' && mcq && (
        <>
          <div className="w-full max-w-2xl mx-auto animate-fade-in">
            <QuizCard
              mcq={mcq}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={setSelectedAnswer}
              isSubmitted={isSubmitted}
              onSubmit={handleSubmitAnswer}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={currentQuestionIndex === TOTAL_QUESTIONS - 1}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={TOTAL_QUESTIONS}
              score={score}
            />
          </div>
        </>
      )}

      {quizState === 'completed' && (
        <QuizResults
          score={score}
          totalQuestions={TOTAL_QUESTIONS}
          onRestart={() => setQuizState('not-started')}
        />
      )}
    </div>
  );
}
