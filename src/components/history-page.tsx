
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { BookCopy } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface QuizResult {
  date: string;
  subject: string;
  score: number;
  total: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsMounted(true);
    if (user) {
        const storedHistory = localStorage.getItem(`quizHistory_${user.uid}`);
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }
  }, [user]);

  const getBadgeVariant = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'secondary';
    return 'destructive';
  }

  if (!isMounted) {
    return null;
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
