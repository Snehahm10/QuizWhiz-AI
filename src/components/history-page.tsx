'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { BookCopy } from 'lucide-react';

interface QuizResult {
  date: string;
  subject: string;
  score: number;
  total: number;
}

// Mock data, in a real app this would come from a database
const mockHistory: QuizResult[] = [
    { date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), subject: 'Science', score: 8, total: 10 },
    { date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), subject: 'Python', score: 6, total: 10 },
    { date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), subject: 'History', score: 9, total: 10 },
    { date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), subject: 'Mathematics', score: 5, total: 10 },
    { date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), subject: 'JavaScript', score: 7, total: 10 },
];


export default function HistoryPage() {
  const [history, setHistory] = useState<QuizResult[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this from a database.
    // For now, we'll use local storage to persist results across page loads.
    const storedHistory = localStorage.getItem('quizHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    } else {
      setHistory(mockHistory);
    }
  }, []);

  const getBadgeVariant = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'secondary';
    return 'destructive';
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
         <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Quiz History</h1>
            <p className="text-muted-foreground mt-1">
                Review your past quiz performances.
            </p>
        </header>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookCopy />
                    Your Past Quizzes
                </CardTitle>
                <CardDescription>
                    A log of all the quizzes you have completed.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.length > 0 ? history.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                                <TableCell className="font-medium">{result.subject}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={getBadgeVariant(result.score, result.total)}>
                                        {result.score} / {result.total}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center h-24">
                                    You haven't completed any quizzes yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
