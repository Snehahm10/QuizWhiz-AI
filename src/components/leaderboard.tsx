'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// Mock data for the leaderboard
const defaultLeaderboardData = [
  { rank: 1, name: "Alice", score: 980, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { rank: 2, name: "Bob", score: 950, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
  { rank: 3, name: "Charlie", score: 920, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
  { rank: 4, name: "David", score: 880, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
  { rank: 5, name: "Eve", score: 850, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
];

interface LeaderboardProps {
    data?: { rank: number; name: string; score: number; avatar: string; isCurrentUser?: boolean }[];
}

export default function Leaderboard({ data }: LeaderboardProps) {
  const leaderboardData = data && data.length > 0 ? data : defaultLeaderboardData;
  const { user } = useAuth();
  const currentUserData = leaderboardData.find(u => u.name === (user?.displayName || user?.email?.split('@')[0]));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboardData.length > 0 ? (
          <ul className="space-y-2">
            {leaderboardData.slice(0, 5).map((player) => (
              <li key={player.rank} className={`flex items-center justify-between p-2 rounded-lg transition-all hover:bg-primary/10 ${player.isCurrentUser ? 'bg-primary/10 ring-2 ring-primary' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg w-6 text-center">{player.rank}</span>
                  <Avatar>
                    <AvatarImage src={player.avatar} alt={player.name} />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{player.name}</span>
                </div>
                <span className="font-bold text-primary">{player.score} pts</span>
              </li>
            ))}
            {currentUserData && currentUserData.rank > 5 && (
                <>
                    <li className="text-center text-muted-foreground">...</li>
                     <li key={currentUserData.rank} className="flex items-center justify-between p-2 rounded-lg bg-primary/10 ring-2 ring-primary transition-all hover:bg-primary/20">
                        <div className="flex items-center gap-4">
                        <span className="font-bold text-lg w-6 text-center">{currentUserData.rank}</span>
                        <Avatar>
                            <AvatarImage src={currentUserData.avatar} alt={currentUserData.name} />
                            <AvatarFallback>{currentUserData.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{currentUserData.name}</span>
                        </div>
                        <span className="font-bold text-primary">{currentUserData.score} pts</span>
                    </li>
                </>
            )}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground h-24 flex items-center justify-center">
            No leaderboard data yet. Compete to get on the board!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
