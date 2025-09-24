import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  PlusCircle,
  MinusCircle,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface StakeEntry {
  amount: number;
  timestamp: number;
  unlockTime: number;
}

interface StakingPanelProps {
  onStake: (amount: number) => void;
  onUnstake: (amount: number) => void;
  maxStake: number;
  currentStake: number;
}

export function StakingPanel({
  onStake,
  onUnstake,
  maxStake,
  currentStake,
}: StakingPanelProps) {
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [stakes, setStakes] = useState<StakeEntry[]>([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const LOCK_PERIOD = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

  // Update current time every second for live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    if (activeTab === "stake") {
      // Create new stake entry with timelock
      const newStake: StakeEntry = {
        amount: numAmount,
        timestamp: Date.now(),
        unlockTime: Date.now() + LOCK_PERIOD,
      };
      setStakes((prev) => [...prev, newStake]);
      onStake(numAmount);
    } else {
      // Check if user has available unlocked stakes
      const availableStakes = stakes.filter(
        (stake) => currentTime >= stake.unlockTime,
      );
      const availableAmount = availableStakes.reduce(
        (sum, stake) => sum + stake.amount,
        0,
      );

      if (numAmount > availableAmount) {
        return; // Not enough unlocked stakes
      }

      // Remove stakes starting from oldest available
      let remainingToUnstake = numAmount;
      const updatedStakes = stakes.filter((stake) => {
        if (remainingToUnstake > 0 && currentTime >= stake.unlockTime) {
          if (stake.amount <= remainingToUnstake) {
            remainingToUnstake -= stake.amount;
            return false; // Remove this stake
          } else {
            // Partially unstake
            stake.amount -= remainingToUnstake;
            remainingToUnstake = 0;
            return true; // Keep modified stake
          }
        }
        return true; // Keep stake
      });

      setStakes(updatedStakes);
      onUnstake(numAmount);
    }
    setAmount("");
  };

  const setMaxAmount = () => {
    if (activeTab === "stake") {
      setAmount(maxStake.toString());
    } else {
      const availableStakes = stakes.filter(
        (stake) => currentTime >= stake.unlockTime,
      );
      const availableAmount = availableStakes.reduce(
        (sum, stake) => sum + stake.amount,
        0,
      );
      setAmount(availableAmount.toString());
    }
  };

  // Calculate available and locked amounts
  const availableStakes = stakes.filter(
    (stake) => currentTime >= stake.unlockTime,
  );
  const lockedStakes = stakes.filter((stake) => currentTime < stake.unlockTime);
  const availableAmount = availableStakes.reduce(
    (sum, stake) => sum + stake.amount,
    0,
  );
  const lockedAmount = lockedStakes.reduce(
    (sum, stake) => sum + stake.amount,
    0,
  );

  // Format time remaining for locked stakes
  const formatTimeRemaining = (unlockTime: number) => {
    const remaining = unlockTime - currentTime;
    if (remaining <= 0) return "Unlocked";

    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
    );
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-neon-purple" />
        <h3 className="text-lg font-semibold text-neon-purple">
          Stake to Be House
        </h3>
      </div>

      <div className="flex rounded-lg bg-game-tile p-1 mb-6">
        <button
          onClick={() => setActiveTab("stake")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "stake"
              ? "bg-neon-purple text-primary-foreground neon-glow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <PlusCircle className="w-4 h-4 inline mr-2" />
          Stake
        </button>
        <button
          onClick={() => setActiveTab("unstake")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === "unstake"
              ? "bg-neon-orange text-primary-foreground neon-glow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MinusCircle className="w-4 h-4 inline mr-2" />
          Unstake
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">
            Amount (ETH)
          </label>
          <div className="relative">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="pr-16 bg-game-tile border-game-grid focus:border-neon-purple"
            />
            <button
              onClick={setMaxAmount}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neon-blue hover:text-neon-blue/80"
            >
              MAX
            </button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {activeTab === "stake" ? (
            <>
              <p>Available: {maxStake.toFixed(4)} ETH</p>
              <p className="text-neon-orange">⚠️ Minimum 1 week lock period</p>
              <p>House edge: 3-5% shared proportionally</p>
            </>
          ) : (
            <>
              <p>Available to unstake: {availableAmount.toFixed(4)} ETH</p>
              <p>Locked: {lockedAmount.toFixed(4)} ETH</p>
              <p className="text-neon-orange">
                Locked funds cannot be withdrawn
              </p>
            </>
          )}
        </div>

        <Button
          onClick={handleAction}
          className={`w-full ${
            activeTab === "stake"
              ? "bg-neon-purple hover:bg-neon-purple/90"
              : "bg-neon-orange hover:bg-neon-orange/90"
          } neon-glow`}
          disabled={
            !amount ||
            parseFloat(amount) <= 0 ||
            (activeTab === "unstake" && parseFloat(amount) > availableAmount)
          }
        >
          {activeTab === "stake"
            ? "Stake ETH (1 Week Lock)"
            : "Unstake Available ETH"}
        </Button>
      </div>

      {/* Locked Stakes Display */}
      {lockedStakes.length > 0 && (
        <div className="mt-6 p-4 bg-game-tile rounded-lg border border-neon-orange/30">
          <h4 className="text-sm font-medium text-neon-orange mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Locked Stakes
          </h4>
          <div className="space-y-3">
            {lockedStakes.map((stake, index) => {
              const progress =
                ((currentTime - stake.timestamp) / LOCK_PERIOD) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>{stake.amount.toFixed(4)} ETH</span>
                    <Badge
                      variant="outline"
                      className="border-neon-orange text-neon-orange"
                    >
                      {formatTimeRemaining(stake.unlockTime)}
                    </Badge>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-1" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-game-tile rounded-lg border border-game-grid">
        <h4 className="text-sm font-medium text-neon-green mb-2">
          Revenue Sharing
        </h4>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>• House edge: 3-5% of all bets</p>
          <p>• Distributed automatically to stakers</p>
          <p>• Proportional to your stake size</p>
          <p>• Real-time profit tracking</p>
        </div>
      </div>
    </div>
  );
}
