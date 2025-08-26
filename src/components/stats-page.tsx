'use client';

import { useState, useEffect } from 'react';
import Leaderboard from './leaderboard';
import WeeklyProgressChart from './weekly-progress-chart';
import { ScoreData } from './quiz-app';
import { useAuth } from '@/hooks/use-auth';

export default function StatsPage() {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<ScoreData[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsMounted(true);
    if (user) {
        const storedLeaderboard = localStorage.getItem(`leaderboard_${user.uid}`);
        if (storedLeaderboard) setLeaderboardData(JSON.parse(storedLeaderboard));
        
        const storedWeekly = localStorage.getItem(`weeklyProgress_${user.uid}`);
        if (storedWeekly) setWeeklyData(JSON.parse(storedWeekly));
    }
  }, [user]);

  if (!isMounted) {
    // Render a loading state or skeletons
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Your Statistics</h1>
                <p className="text-muted-foreground mt-1">
                    Loading your performance data...
                </p>
            </header>
            <div className="grid md:grid-cols-2 gap-8 mt-8 animate-pulse">
                <div className="h-96 bg-muted rounded-lg"></div>
                <div className="h-96 bg-muted rounded-lg"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Statistics</h1>
        <p className="text-muted-foreground mt-1">
          Track your progress and see how you stack up against others.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-8 mt-8 animate-fade-in">
        <Leaderboard data={leaderboardData} />
        <WeeklyProgressChart data={weeklyData} />
      </div>
    </div>
  );
}
