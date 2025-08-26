'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <Card className="w-full max-w-2xl mx-auto text-center animate-in fade-in duration-500">
      <CardHeader>
        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
            <Trophy className="h-16 w-16 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold mt-4">Quiz Completed!</CardTitle>
        <CardDescription>You've finished the quiz. Here are your results.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-5xl font-bold text-primary">{percentage}%</p>
        <p className="text-muted-foreground">You answered {score} out of {totalQuestions} questions correctly.</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onRestart} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Play Again
        </Button>
      </CardFooter>
    </Card>
  );
}
