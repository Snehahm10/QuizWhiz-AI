'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DIFFICULTIES, LANGUAGES, SUBJECTS, type QuizSettings } from "@/lib/constants";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizSettingsProps {
  settings: Omit<QuizSettings, 'topic'>;
  onSettingsChange: React.Dispatch<React.SetStateAction<Omit<QuizSettings, 'topic'>>>;
  onStartQuiz: () => void;
  isLoading: boolean;
  isQuizActive: boolean;
}

export default function QuizSettingsComponent({ settings, onSettingsChange, onStartQuiz, isLoading, isQuizActive }: QuizSettingsProps) {
  
  return (
    <Card className="animate-fade-in shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">New Quiz</CardTitle>
        <CardDescription>Configure your quiz and jump right in.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
            <Label className="text-lg font-semibold">Subject</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {SUBJECTS.map(subject => (
                    <Button 
                        key={subject.value}
                        variant={settings.subject === subject.value ? 'default' : 'outline'}
                        className="flex flex-col h-24 justify-center items-center gap-2 text-center"
                        onClick={() => onSettingsChange(prev => ({ ...prev, subject: subject.value }))}
                    >
                       <subject.icon className="h-8 w-8" />
                       <span className="text-xs font-medium">{subject.label}</span>
                    </Button>
                ))}
            </div>
        </div>

        <div className="space-y-4">
            <Label className="text-lg font-semibold">Difficulty</Label>
            <div className="flex flex-wrap gap-2">
                {DIFFICULTIES.map(difficulty => (
                    <Button 
                        key={difficulty.value}
                        variant={settings.difficulty === difficulty.value ? 'default' : 'outline'}
                        onClick={() => onSettingsChange(prev => ({ ...prev, difficulty: difficulty.value }))}
                        className="capitalize"
                    >
                        {difficulty.label}
                    </Button>
                ))}
            </div>
        </div>
        
        <div className="space-y-4">
            <Label className="text-lg font-semibold">Language</Label>
             <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => (
                    <Button 
                        key={lang.value}
                        variant={settings.language === lang.value ? 'default' : 'outline'}
                        onClick={() => onSettingsChange(prev => ({ ...prev, language: lang.value }))}
                    >
                        {lang.label}
                    </Button>
                ))}
            </div>
        </div>

        <Button 
            onClick={onStartQuiz} 
            disabled={isLoading} 
            size="lg" 
            className={cn(
                "w-full font-bold text-lg tracking-wider",
                "bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90",
                "transition-all duration-300 ease-in-out",
                "shadow-lg hover:shadow-primary/40"
                )}
            >
          <Rocket className="mr-2 h-5 w-5" />
          {isLoading ? 'Generating Quiz...' : 'Start Quiz'}
        </Button>
      </CardContent>
    </Card>
  );
}
