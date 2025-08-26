'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DIFFICULTIES, LANGUAGES, SUBJECTS, type QuizSettings } from "@/lib/constants";
import { Rocket } from "lucide-react";

interface QuizSettingsProps {
  settings: Omit<QuizSettings, 'topic'>;
  onSettingsChange: React.Dispatch<React.SetStateAction<Omit<QuizSettings, 'topic'>>>;
  onStartQuiz: () => void;
  isLoading: boolean;
  isQuizActive: boolean;
}

export default function QuizSettingsComponent({ settings, onSettingsChange, onStartQuiz, isLoading, isQuizActive }: QuizSettingsProps) {
  const handleSettingChange = (key: keyof Omit<QuizSettings, 'topic'>) => (value: string) => {
    onSettingsChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Quiz Setup</CardTitle>
        <CardDescription>Select your preferences and start a new quiz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={settings.subject} onValueChange={handleSettingChange('subject')}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map(subject => (
                  <SelectItem key={subject.value} value={subject.value}>
                    <div className="flex items-center gap-2">
                      <subject.icon className="h-4 w-4" />
                      {subject.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select value={settings.difficulty} onValueChange={handleSettingChange('difficulty')}>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map(difficulty => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={settings.language} onValueChange={handleSettingChange('language')}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map(language => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={onStartQuiz} disabled={isLoading} size="lg" className="w-full">
          <Rocket className="mr-2 h-5 w-5" />
          {isLoading ? 'Generating Quiz...' : isQuizActive ? 'Start a New Quiz' : 'Start Quiz'}
        </Button>
      </CardContent>
    </Card>
  );
}
