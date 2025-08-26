'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import { ScoreData } from './quiz-app';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';

const USER_COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--success))',
    '#FF9800', // Amber
    '#673AB7', // Deep Purple
    '#00BCD4', // Cyan
];

const processDataForChart = (data: ScoreData[], topUsers: string[]) => {
    if (!data || data.length === 0) {
        // Return data for the last 7 days with 0 score
        return {
            chartData: Array.from({ length: 7 }, (_, i) => {
                const date = subDays(new Date(), 6 - i);
                const dayData: {[key: string]: string | number} = { name: format(date, 'EEE') };
                topUsers.forEach(user => dayData[user] = 0);
                return dayData;
            }),
            users: []
        };
    }

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), 6 - i);
        return format(date, 'yyyy-MM-dd');
    });

    const scoresByDayByUser: { [day: string]: { [user: string]: number[] } } = {};

    data.forEach(item => {
        const day = format(new Date(item.date), 'yyyy-MM-dd');
        if (!scoresByDayByUser[day]) {
            scoresByDayByUser[day] = {};
        }
        if (!scoresByDayByUser[day][item.user]) {
            scoresByDayByUser[day][item.user] = [];
        }
        scoresByDayByUser[day][item.user].push(item.score);
    });

    const chartData = last7Days.map(day => {
        const dayData: {[key: string]: string | number} = { name: format(new Date(day), 'EEE') };
        
        topUsers.forEach(user => {
            const userDayScores = scoresByDayByUser[day]?.[user] || [];
            const averageScore = userDayScores.length > 0 ? userDayScores.reduce((a, b) => a + b, 0) / userDayScores.length : 0;
            dayData[user] = Math.round(averageScore);
        });

        return dayData;
    });
    
    return { chartData, users: topUsers };
};


export default function WeeklyProgressChart({ data, leaderboard }: { data: ScoreData[], leaderboard: any[] }) {
    const topUsers = (leaderboard || []).slice(0, 5).map(u => u.name);
    const { chartData, users } = processDataForChart(data, topUsers);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Weekly Activity
        </CardTitle>
        <CardDescription>Average quiz scores of top players over the last week.</CardDescription>
      </CardHeader>
      <CardContent>
        {users.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
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
              cursor={{fill: 'hsl(var(--accent))', fillOpacity: 0.5}}
            />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            {users.map((user, index) => (
                 <Line key={user} type="monotone" dataKey={user} stroke={USER_COLORS[index % USER_COLORS.length]} strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
            ))}
          </LineChart>
        </ResponsiveContainer>
        ) : (
             <div className="text-center text-muted-foreground h-[250px] flex items-center justify-center">
                No activity has been recorded yet.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
