'use client';

import { useState, useTransition, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { type QuizSettings } from '@/lib/constants';
import { generateMcqAction, type Mcq } from '@/app/quiz/actions';

import QuizSettingsComponent from './quiz-settings';
import QuizCard from './quiz-card';
import QuizSkeleton from './quiz-skeleton';
import QuizResults from './quiz-results';
import Leaderboard from './leaderboard';
import WeeklyProgressChart from './weekly-progress-chart';
import { Progress } from './ui/progress';

const TOTAL_QUESTIONS = 10;

type QuizState = 'not-started' | 'loading' | 'in-progress' | 'completed';

export default function QuizApp() {
  const [settings, setSettings] = useState<QuizSettings>({
    subject: 'science',
    difficulty: 'medium',
    language: 'english',
    topic: 'Photosynthesis',
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
        const newQuestions = await Promise.all(
          Array.from({ length: TOTAL_QUESTIONS }, () => generateMcqAction(settings))
        );
        setQuestions(newQuestions);
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
  
  const handleNextQuestion = useCallback(() => {
    setIsSubmitted(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('completed');
    }
  }, [currentQuestionIndex, questions.length]);

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
  const progress = (currentQuestionIndex / TOTAL_QUESTIONS) * 100;

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
          <div className="w-full max-w-2xl mx-auto">
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

      {quizState === 'not-started' && (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Leaderboard />
          <WeeklyProgressChart />
        </div>
      )}
    </div>
  );
}
