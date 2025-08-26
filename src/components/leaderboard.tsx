'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

// Mock data for the leaderboard
const leaderboardData = [
  { rank: 1, name: "Alice", score: 980, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { rank: 2, name: "Bob", score: 950, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
  { rank: 3, name: "Charlie", score: 920, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
  { rank: 4, name: "David", score: 880, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
  { rank: 5, name: "Eve", score: 850, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
];

export default function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {leaderboardData.map((user) => (
            <li key={user.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg w-6 text-center">{user.rank}</span>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </div>
              <span className="font-bold text-primary">{user.score} pts</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
