'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { Mcq } from "@/app/quiz/actions";

interface QuizCardProps {
  mcq: Mcq;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  isSubmitted: boolean;
  onSubmit: () => void;
  onNextQuestion: () => void;
}

export default function QuizCard({ mcq, selectedAnswer, onAnswerSelect, isSubmitted, onSubmit, onNextQuestion }: QuizCardProps) {
  const isCorrect = selectedAnswer === mcq.correctAnswerIndex;

  return (
    <Card className="w-full transition-all duration-300 ease-in-out transform hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{mcq.question}</CardTitle>
        <CardDescription>Choose the correct answer from the options below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedAnswer !== null ? String(selectedAnswer) : ''}
          onValueChange={(value) => onAnswerSelect(Number(value))}
          disabled={isSubmitted}
          className="space-y-4"
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
                    "flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer",
                    "hover:border-primary",
                    isSelected && !isSubmitted && "border-primary bg-primary/10",
                    isSubmitted && isCorrectOption && "border-success bg-success/10 text-success-foreground-dark font-bold",
                    isSubmitted && isSelected && !isCorrectOption && "border-destructive bg-destructive/10 text-destructive-foreground-dark font-bold",
                    isSubmitted && !isSelected && "opacity-60"
                  )}
                >
                  <span className="flex-1">{option}</span>
                  {isSubmitted && isCorrectOption && <CheckCircle2 className="h-5 w-5 text-success ml-4" />}
                  {isSubmitted && isSelected && !isCorrectOption && <XCircle className="h-5 w-5 text-destructive ml-4" />}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {isSubmitted && (
          <div className="p-4 bg-secondary rounded-lg space-y-3 animate-in fade-in duration-500">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {isCorrect ? (
                <><CheckCircle2 className="h-6 w-6 text-success" /> Correct!</>
              ) : (
                <><XCircle className="h-6 w-6 text-destructive" /> Incorrect</>
              )}
            </h3>
            <Separator />
            <p className="text-muted-foreground">{mcq.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isSubmitted ? (
          <Button onClick={onNextQuestion} className="w-full">
            Next Question <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={onSubmit} className="w-full">
            Submit Answer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
