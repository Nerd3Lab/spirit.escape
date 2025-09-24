import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Shield,
  Users,
  Trophy,
  TrendingUp,
  Gem,
  Crown,
  Medal,
  Award,
} from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  address: string;
  totalWinnings: number;
  gamesPlayed: number;
  winRate: number;
  biggestWin: number;
  level: string;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    address: "0x7f2c...e9a1",
    totalWinnings: 127.45,
    gamesPlayed: 892,
    winRate: 68.2,
    biggestWin: 24.7,
    level: "Legend",
  },
  {
    rank: 2,
    address: "0x4b8d...2f3c",
    totalWinnings: 98.32,
    gamesPlayed: 654,
    winRate: 71.8,
    biggestWin: 18.9,
    level: "Master",
  },
  {
    rank: 3,
    address: "0x9e1a...6b5d",
    totalWinnings: 89.76,
    gamesPlayed: 743,
    winRate: 65.4,
    biggestWin: 22.1,
    level: "Master",
  },
  {
    rank: 4,
    address: "0x2d4f...8a9e",
    totalWinnings: 76.21,
    gamesPlayed: 521,
    winRate: 69.3,
    biggestWin: 15.8,
    level: "Expert",
  },
  {
    rank: 5,
    address: "0x8c7b...4e2f",
    totalWinnings: 68.94,
    gamesPlayed: 478,
    winRate: 72.1,
    biggestWin: 19.4,
    level: "Expert",
  },
  {
    rank: 6,
    address: "0x5a3d...9c8b",
    totalWinnings: 62.15,
    gamesPlayed: 389,
    winRate: 74.8,
    biggestWin: 13.2,
    level: "Expert",
  },
  {
    rank: 7,
    address: "0x1f6e...7d4a",
    totalWinnings: 58.73,
    gamesPlayed: 412,
    winRate: 67.9,
    biggestWin: 16.5,
    level: "Expert",
  },
  {
    rank: 8,
    address: "0x9c2b...3e8f",
    totalWinnings: 54.89,
    gamesPlayed: 356,
    winRate: 70.2,
    biggestWin: 14.7,
    level: "Advanced",
  },
  {
    rank: 9,
    address: "0x6d8a...5f1c",
    totalWinnings: 51.42,
    gamesPlayed: 334,
    winRate: 66.5,
    biggestWin: 12.8,
    level: "Advanced",
  },
  {
    rank: 10,
    address: "0x4e7c...2b9d",
    totalWinnings: 47.96,
    gamesPlayed: 298,
    winRate: 68.7,
    biggestWin: 11.3,
    level: "Advanced",
  },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<"all-time" | "weekly" | "daily">(
    "all-time",
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-neon-orange" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Legend":
        return "text-neon-orange";
      case "Master":
        return "text-neon-purple";
      case "Expert":
        return "text-neon-blue";
      case "Advanced":
        return "text-neon-green";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-game-bg">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-neon-orange " />
            <h1 className="text-4xl font-bold text-neon-orange">Leaderboard</h1>
            <Trophy className="w-8 h-8 text-neon-orange" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Top Spirit Escape explorers ranked by total winnings. Compete with
            the best relic hunters across all realms.
          </p>
        </div>

        {/* Time Period Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-lg bg-game-surface p-1 border border-game-grid">
            <Button
              variant={activeTab === "all-time" ? "default" : "ghost"}
              onClick={() => setActiveTab("all-time")}
              className={`px-6 py-2 text-sm font-medium transition-all ${
                activeTab === "all-time"
                  ? "bg-neon-purple text-primary-foreground neon-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Time
            </Button>
            <Button
              variant={activeTab === "weekly" ? "default" : "ghost"}
              onClick={() => setActiveTab("weekly")}
              className={`px-6 py-2 text-sm font-medium transition-all ${
                activeTab === "weekly"
                  ? "bg-neon-purple text-primary-foreground neon-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Weekly
            </Button>
            <Button
              variant={activeTab === "daily" ? "default" : "ghost"}
              onClick={() => setActiveTab("daily")}
              className={`px-6 py-2 text-sm font-medium transition-all ${
                activeTab === "daily"
                  ? "bg-neon-purple text-primary-foreground neon-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Daily
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-morphism rounded-xl p-6 border border-neon-blue/30">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-neon-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Total Players</p>
                <p className="text-xl font-bold text-neon-blue">2,847</p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-6 border border-neon-green/30">
            <div className="flex items-center gap-3">
              <Gem className="w-6 h-6 text-neon-green" />
              <div>
                <p className="text-sm text-muted-foreground">Relics Found</p>
                <p className="text-xl font-bold text-neon-green">15,293</p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-6 border border-neon-orange/30">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-neon-orange" />
              <div>
                <p className="text-sm text-muted-foreground">Total Winnings</p>
                <p className="text-xl font-bold text-neon-orange">1,247 ETH</p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-neon-purple" />
              <div>
                <p className="text-sm text-muted-foreground">Biggest Win</p>
                <p className="text-xl font-bold text-neon-purple">24.7 ETH</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="glass-morphism rounded-xl border border-neon-purple/30">
          <div className="p-6 border-b border-game-grid">
            <h2 className="text-xl font-semibold text-neon-purple">
              Top Spirit Hunters
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-game-grid">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Rank
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Player
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Level
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Total Winnings
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Games Played
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Win Rate
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Biggest Win
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboardData.map((entry, index) => (
                  <tr
                    key={entry.rank}
                    className={`border-b border-game-grid/50 hover:bg-game-surface/30 transition-colors ${
                      entry.rank <= 3 ? "bg-game-surface/20" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-xs font-bold">
                          {entry.address.slice(2, 4).toUpperCase()}
                        </div>
                        <span className="font-mono text-sm text-neon-blue">
                          {entry.address}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-sm font-medium ${getLevelColor(entry.level)}`}
                      >
                        {entry.level}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-neon-green font-semibold">
                        {entry.totalWinnings.toFixed(2)} ETH
                      </span>
                    </td>
                    <td className="p-4 text-right text-sm text-muted-foreground">
                      {entry.gamesPlayed.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-neon-orange font-medium">
                        {entry.winRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-neon-purple font-semibold">
                        {entry.biggestWin.toFixed(1)} ETH
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Rank */}
        <div className="mt-8 glass-morphism rounded-xl p-6 border border-neon-blue/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neon-blue mb-2">
                Your Current Rank
              </h3>
              <p className="text-muted-foreground">
                Connect your wallet to see your position on the leaderboard
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-muted-foreground mb-1">
                #--
              </div>
              <p className="text-sm text-muted-foreground">Rank</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
