import { useState } from "react";
import { StakingPanel } from "@/components/StakingPanel";
import { GameStats } from "@/components/GameStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Shield, DollarSign } from "lucide-react";

export default function Staking() {
  const [balance, setBalance] = useState(2.5);
  const [yourStake, setYourStake] = useState(0.5);

  // Mock data for stats
  const [poolSize] = useState(1250.7);
  const [totalStakers] = useState(892);
  const [apy] = useState(18.5);

  const handleStake = (amount: number) => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      setYourStake((prev) => prev + amount);
    }
  };

  const handleUnstake = (amount: number) => {
    if (yourStake >= amount) {
      setYourStake((prev) => prev - amount);
      setBalance((prev) => prev + amount);
    }
  };

  return (
    <div className="min-h-screen bg-game-bg">
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-neon-purple" />
            <div>
              <h1 className="text-3xl font-bold text-neon-purple">
                House Staking
              </h1>
              <p className="text-muted-foreground">
                Stake ETH to become the house and earn revenue share
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-neon-orange text-neon-orange"
          >
            <Clock className="w-3 h-3 mr-1" />
            Minimum 1 Week Lock Period
          </Badge>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <GameStats
            poolSize={poolSize}
            totalStakers={totalStakers}
            yourStake={yourStake}
            apy={apy}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Staking Panel */}
          <div className="lg:col-span-2">
            <StakingPanel
              onStake={handleStake}
              onUnstake={handleUnstake}
              maxStake={balance}
              currentStake={yourStake}
            />
          </div>

          {/* Staking Information */}
          <div className="space-y-6">
            {/* Lock Period Info */}
            <Card className="glass-morphism border-neon-orange/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neon-orange">
                  <Clock className="w-5 h-5" />
                  Lock Period
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    <strong className="text-neon-orange">Minimum Lock:</strong>{" "}
                    1 Week
                  </p>
                  <p className="mb-2">
                    <strong className="text-neon-blue">Current APY:</strong>{" "}
                    {apy}%
                  </p>
                  <p>
                    <strong className="text-neon-green">
                      Instant Withdrawal:
                    </strong>{" "}
                    Available after lock period
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Sharing */}
            <Card className="glass-morphism border-neon-green/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neon-green">
                  <DollarSign className="w-5 h-5" />
                  Revenue Share
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <p>• House edge: 3-5% of all bets</p>
                  <p>• Distributed automatically</p>
                  <p>• Proportional to stake size</p>
                  <p>• Compounded daily</p>
                  <p>• Real-time profit tracking</p>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="glass-morphism border-neon-blue/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-neon-blue">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <p>• Smart contract audited</p>
                  <p>• Funds secured on-chain</p>
                  <p>• Verifiable randomness (VRF)</p>
                  <p>• Transparent revenue tracking</p>
                  <p>• Emergency pause mechanism</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="mt-8 p-6 bg-destructive/10 border border-destructive/30 rounded-lg">
          <h3 className="text-lg font-semibold text-destructive mb-3">
            ⚠️ Risk Warning
          </h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              • <strong>Minimum lock period of 1 week</strong> - You cannot
              unstake before this period ends
            </p>
            <p>
              • House staking involves risk - the house can lose money during
              bad luck streaks
            </p>
            <p>
              • Revenue sharing is based on actual house profits and can vary
              significantly
            </p>
            <p>
              • Only stake what you can afford to lose and keep locked for
              extended periods
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
