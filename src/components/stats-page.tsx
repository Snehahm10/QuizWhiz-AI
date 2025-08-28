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
    // We can read the global data without waiting for the user object
    const storedLeaderboard = localStorage.getItem(`leaderboard_global`);
    if (storedLeaderboard) {
        const allUsers = JSON.parse(storedLeaderboard);
        if (user) {
            // Add isCurrentUser flag for highlighting
            const currentUser = user.displayName || user.email?.split('@')[0];
            const dataWithCurrentUser = allUsers.map((u: any) => ({ ...u, isCurrentUser: u.name === currentUser }));
            setLeaderboardData(dataWithCurrentUser);
        } else {
            setLeaderboardData(allUsers);
        }
    }
    
    const storedWeekly = localStorage.getItem(`weeklyProgress_global`);
    if (storedWeekly) setWeeklyData(JSON.parse(storedWeekly));
  }, [user]);

  if (!isMounted) {
    // Render a loading state or skeletons
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Global Statistics</h1>
                <p className="text-muted-foreground mt-1">
                    Loading performance data for all players...
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
        <h1 className="text-3xl font-bold tracking-tight">Global Statistics</h1>
        <p className="text-muted-foreground mt-1">
          Track player progress and see who is on top.
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-8 mt-8 animate-fade-in">
        <Leaderboard data={leaderboardData} />
        <WeeklyProgressChart data={weeklyData} leaderboard={leaderboardData.map(u => ({name: u.name, score: u.score, rank: u.rank, avatar: u.avatar}))} />
      </div>
    </div>
  );
}
