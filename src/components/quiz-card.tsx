'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ArrowRight, Trophy, Timer } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { Mcq } from "@/app/quiz/actions";

interface QuizCardProps {
  mcq: Mcq;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  isSubmitted: boolean;
  onSubmit: () => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  questionNumber: number;
  totalQuestions: number;
  score: number;
}

const QUESTION_TIME_LIMIT = 30; // 30 seconds

export default function QuizCard({ 
    mcq, 
    selectedAnswer, 
    onAnswerSelect, 
    isSubmitted, 
    onSubmit, 
    onNextQuestion, 
    isLastQuestion,
    questionNumber,
    totalQuestions,
    score,
}: QuizCardProps) {
  const isCorrect = selectedAnswer === mcq.correctAnswerIndex;
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const progress = (questionNumber / totalQuestions) * 100;

  useEffect(() => {
    setTimeLeft(QUESTION_TIME_LIMIT); // Reset timer for each new question
    
    if (isSubmitted) {
      return; // Stop the timer if answer is submitted
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onNextQuestion(); // Move to next question when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount or re-render
  }, [mcq.question, isSubmitted, onNextQuestion]);
  

  return (
    <Card className="w-full transition-all duration-300 ease-in-out transform shadow-lg hover:shadow-2xl border-primary/10">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Question {questionNumber} of {totalQuestions}</p>
            <p className="text-sm font-bold">Score: {score}</p>
        </div>
        <Progress value={progress} className="w-full mb-4" />
        <CardTitle className="text-2xl tracking-tight pt-4">{mcq.question}</CardTitle>
        <CardDescription>Choose the correct answer from the options below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-end text-lg font-bold text-primary">
            <Timer className="mr-2 h-6 w-6" />
            <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
        </div>

        <RadioGroup
          value={selectedAnswer !== null ? String(selectedAnswer) : ''}
          onValueChange={(value) => onAnswerSelect(Number(value))}
          disabled={isSubmitted}
          className="space-y-3"
        >
          {mcq.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === mcq.correctAnswerIndex;

            return (
              <div key={index}>
                <RadioGroupItem value={String(index)} id={`option-${index}`} className="sr-only" />
                <Label
                  htmlFor={`option-${index}`}
                  className={cn(
                    "flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer text-base",
                    "hover:border-primary/50 text-foreground",
                    isSelected && !isSubmitted && "border-primary bg-primary/10 ring-2 ring-primary/50",
                    isSubmitted && isCorrectOption && "border-success bg-success/10 text-success-foreground font-semibold ring-2 ring-success/50",
                    isSubmitted && isSelected && !isCorrectOption && "border-destructive bg-destructive/10 text-destructive-foreground font-semibold ring-2 ring-destructive/50",
                    isSubmitted && !isSelected && "opacity-60 hover:opacity-80"
                  )}
                >
                  <span className="flex-1">{option}</span>
                  {isSubmitted && isCorrectOption && <CheckCircle2 className="h-5 w-5 text-success-foreground ml-4" />}
                  {isSubmitted && isSelected && !isCorrectOption && <XCircle className="h-5 w-5 text-destructive-foreground ml-4" />}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {isSubmitted && (
          <div className="p-4 bg-muted/80 rounded-lg space-y-3 animate-in fade-in-50 duration-500">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {isCorrect ? (
                <><CheckCircle2 className="h-6 w-6 text-success" /> Correct!</>
              ) : (
                <><XCircle className="h-6 w-6 text-destructive" /> Incorrect</>
              )}
            </h3>
            <Separator />
            <p className="text-muted-foreground text-base">{mcq.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isSubmitted ? (
          <Button onClick={onNextQuestion} className="w-full" size="lg">
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            {isLastQuestion ? <Trophy className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        ) : (
          <Button onClick={onSubmit} className="w-full" size="lg" disabled={selectedAnswer === null}>
            Submit Answer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
