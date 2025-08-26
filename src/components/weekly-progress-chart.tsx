'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import { ScoreData } from './quiz-app';
import { format, subDays } from 'date-fns';


const processDataForChart = (data: ScoreData[]) => {
    if (!data || data.length === 0) {
        // Return data for the last 7 days with 0 score
        return Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i);
            return { name: format(date, 'EEE'), score: 0 };
        });
    }

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), 6 - i);
        return format(date, 'yyyy-MM-dd');
    });

    const scoresByDay: { [key: string]: number[] } = {};

    data.forEach(item => {
        const day = format(new Date(item.date), 'yyyy-MM-dd');
        if (!scoresByDay[day]) {
            scoresByDay[day] = [];
        }
        scoresByDay[day].push(item.score);
    });

    return last7Days.map(day => {
        const date = new Date(day);
        const dayScores = scoresByDay[day] || [];
        const averageScore = dayScores.length > 0 ? dayScores.reduce((a, b) => a + b, 0) / dayScores.length : 0;
        return {
            name: format(date, 'EEE'),
            score: Math.round(averageScore),
        };
    });
};


export default function WeeklyProgressChart({ data }: { data: ScoreData[] }) {
    const chartData = processDataForChart(data);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Weekly Activity
        </CardTitle>
        <CardDescription>Your average quiz scores over the last week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              cursor={{fill: 'hsl(var(--accent))'}}
            />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Bar dataKey="score" name="Average Score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
