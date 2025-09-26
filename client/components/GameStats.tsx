import { TrendingUp, Users, Coins, Percent } from "lucide-react";

interface GameStatsProps {
  poolSize: number;
  totalStakers: number;
  yourStake: number;
  apy: number;
}

export function GameStats({
  poolSize,
  totalStakers,
  yourStake,
  apy,
}: GameStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-morphism rounded-xl p-6 border border-neon-blue/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Pool Size</p>
            <p className="text-2xl font-bold text-neon-blue">
              {poolSize.toLocaleString()} Sol
            </p>
          </div>
          <div className="p-3 bg-neon-blue/10 rounded-lg">
            <Coins className="w-6 h-6 text-neon-blue" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Available for game liquidity
        </p>
      </div>

      <div className="glass-morphism rounded-xl p-6 border border-neon-green/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Stakers</p>
            <p className="text-2xl font-bold text-neon-green">
              {totalStakers.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-neon-green/10 rounded-lg">
            <Users className="w-6 h-6 text-neon-green" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          House edge participants
        </p>
      </div>

      <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your Stake</p>
            <p className="text-2xl font-bold text-neon-purple">
              {yourStake.toFixed(4)} Sol
            </p>
          </div>
          <div className="p-3 bg-neon-purple/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-neon-purple" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Current position value
        </p>
      </div>

      <div className="glass-morphism rounded-xl p-6 border border-neon-orange/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">APY</p>
            <p className="text-2xl font-bold text-neon-orange">
              {apy.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-neon-orange/10 rounded-lg">
            <Percent className="w-6 h-6 text-neon-orange" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Current staking yield
        </p>
      </div>
    </div>
  );
}
