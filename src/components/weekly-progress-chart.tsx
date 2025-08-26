'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Mon', score: 40 },
  { name: 'Tue', score: 60 },
  { name: 'Wed', score: 50 },
  { name: 'Thu', score: 80 },
  { name: 'Fri', score: 70 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 75 },
];

export default function WeeklyProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Weekly Activity
        </CardTitle>
        <CardDescription>Your quiz scores over the last week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
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
            />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
