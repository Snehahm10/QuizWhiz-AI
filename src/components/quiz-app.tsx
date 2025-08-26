'use client';

import { useState, useTransition, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { type QuizSettings } from '@/lib/constants';
import { generateMcqAction, type Mcq } from '@/app/quiz/actions';

import QuizSettingsComponent from './quiz-settings';
import QuizCard from './quiz-card';
import QuizSkeleton from './quiz-skeleton';

export default function QuizApp() {
  const [settings, setSettings] = useState<QuizSettings>({
    subject: 'science',
    difficulty: 'medium',
    language: 'english',
    topic: 'Photosynthesis',
  });
  const [mcq, setMcq] = useState<Mcq | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [isLoading, startTransition] = useTransition();
  const { toast } = useToast();

  const handleStartQuiz = useCallback(() => {
    setIsSubmitted(false);
    setSelectedAnswer(null);
    setMcq(null);
    
    startTransition(async () => {
      try {
        const newMcq = await generateMcqAction(settings);
        setMcq(newMcq);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (error as Error).message,
        });
      }
    });
  }, [settings, toast]);
  
  const handleNextQuestion = useCallback(() => {
    handleStartQuiz();
  }, [handleStartQuiz]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null) {
      toast({
        variant: "destructive",
        title: "No Answer Selected",
        description: "Please select an answer before submitting.",
      });
      return;
    }
    setIsSubmitted(true);
  }, [selectedAnswer, toast]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
      <QuizSettingsComponent
        settings={settings}
        onSettingsChange={setSettings}
        onStartQuiz={handleStartQuiz}
        isLoading={isLoading}
        isQuizActive={!!mcq}
      />

      <div className="w-full transition-all duration-300">
        {isLoading ? (
          <QuizSkeleton />
        ) : mcq ? (
          <QuizCard
            mcq={mcq}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={setSelectedAnswer}
            isSubmitted={isSubmitted}
            onSubmit={handleSubmitAnswer}
            onNextQuestion={handleNextQuestion}
          />
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <p>Select your preferences and start a quiz!</p>
          </div>
        )}
      </div>
    </div>
  );
}
