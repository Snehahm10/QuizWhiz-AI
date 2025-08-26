import type { LucideIcon } from 'lucide-react';
import { Atom, BookOpen, Code, Cpu, Globe, Landmark, Sigma } from 'lucide-react';

export const SUBJECTS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'science', label: 'Science', icon: Atom },
  { value: 'history', label: 'History', icon: Landmark },
  { value: 'geography', label: 'Geography', icon: Globe },
  { value: 'mathematics', label: 'Mathematics', icon: Sigma },
  { value: 'technology', label: 'Technology', icon: Cpu },
  { value: 'literature', label: 'Literature', icon: BookOpen },
  { value: 'programming', label: 'Programming', icon: Code },
];

export const DIFFICULTIES = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'difficult', label: 'Difficult' },
];

export const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'kannada', label: 'Kannada' },
];

export type Subject = (typeof SUBJECTS)[number]['value'];
export type Difficulty = (typeof DIFFICULTIES)[number]['value'];
export type Language = (typeof LANGUAGES)[number]['value'];

export interface QuizSettings {
  subject: Subject;
  difficulty: Difficulty;
  language: Language;
  topic: string;
}
