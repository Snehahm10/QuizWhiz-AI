'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DIFFICULTIES, LANGUAGES, SUBJECTS, type QuizSettings } from "@/lib/constants";
import { Rocket } from "lucide-react";

interface QuizSettingsProps {
  settings: QuizSettings;
  onSettingsChange: React.Dispatch<React.SetStateAction<QuizSettings>>;
  onStartQuiz: () => void;
  isLoading: boolean;
  isQuizActive: boolean;
}

export default function QuizSettingsComponent({ settings, onSettingsChange, onStartQuiz, isLoading, isQuizActive }: QuizSettingsProps) {
  const handleSettingChange = (key: keyof QuizSettings) => (value: string) => {
    onSettingsChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Quiz Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g. Photosynthesis"
              value={settings.topic}
              onChange={(e) => onSettingsChange(prev => ({ ...prev, topic: e.target.value }))}
            />
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
        <Button onClick={onStartQuiz} disabled={isLoading || !settings.topic} className="w-full">
          <Rocket className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating...' : isQuizActive ? 'Generate New Quiz' : 'Start Quiz'}
        </Button>
      </CardContent>
    </Card>
  );
}
