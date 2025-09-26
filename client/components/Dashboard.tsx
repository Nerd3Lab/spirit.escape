import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GameGrid } from "./GameGrid";
import { GameStats } from "./GameStats";
import { Play, Square, DollarSign } from "lucide-react";

interface Tile {
  id: number;
  isRevealed: boolean;
  hasRelic: boolean;
  hasTrap: boolean;
  multiplier?: number;
}

export function Dashboard() {
  const [gameActive, setGameActive] = useState(false);
  const [currentBet, setCurrentBet] = useState(0.1);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [balance, setBalance] = useState(2.5);
  const [gameEnded, setGameEnded] = useState(false);

  // Mock data for stats
  const [poolSize] = useState(1250.7);
  const [totalStakers] = useState(892);
  const [yourStake] = useState(0.5);
  const [apy] = useState(18.5);

  const startGame = () => {
    if (balance < currentBet) return;
    setGameActive(true);
    setGameEnded(false);
    setCurrentMultiplier(1.0);
    setBalance((prev) => prev - currentBet);
  };

  const cashOut = () => {
    const winAmount = currentBet * currentMultiplier;
    setBalance((prev) => prev + winAmount);
    setGameActive(false);
    setGameEnded(true);
  };

  const handleTileClick = (tile: Tile) => {
    if (tile.hasTrap) {
      // Game over - lost bet
      setGameActive(false);
      setGameEnded(true);
    } else if (tile.hasRelic) {
      // Found relic - increase multiplier
      const multiplierIncrease = tile.multiplier || 1.2;
      setCurrentMultiplier((prev) => prev * multiplierIncrease);
    }
  };

  return (
    <div className="min-h-screen bg-game-bg">
      {/* Stats Section */}
      <div className="container mx-auto px-6 pt-8">
        <GameStats
          poolSize={poolSize}
          totalStakers={totalStakers}
          yourStake={yourStake}
          apy={apy}
        />
      </div>

      {/* Main Game Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neon-purple mb-2">
                  Spirit Escape
                </h2>
                <p className="text-muted-foreground">
                  Explore ancient ruins and collect spirit relics
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-xl font-bold text-neon-green">
                  {balance.toFixed(4)} Sol
                </p>
              </div>
            </div>

            {/* Game Controls */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-game-surface rounded-lg border border-game-grid">
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Bet:</label>
                <input
                  type="number"
                  value={currentBet}
                  onChange={(e) => setCurrentBet(parseFloat(e.target.value))}
                  step="0.01"
                  min="0.01"
                  disabled={gameActive}
                  className="w-20 px-2 py-1 bg-game-tile border border-game-grid rounded text-sm"
                />
                <span className="text-sm text-muted-foreground">Sol</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Multiplier:
                </span>
                <span className="text-lg font-bold text-neon-orange">
                  {currentMultiplier.toFixed(2)}x
                </span>
              </div>

              <div className="flex gap-2 ml-auto">
                {!gameActive ? (
                  <Button
                    onClick={startGame}
                    disabled={balance < currentBet}
                    className="bg-neon-green hover:bg-neon-green/90 text-black neon-glow"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play ({currentBet} Sol)
                  </Button>
                ) : (
                  <Button
                    onClick={cashOut}
                    className="bg-neon-orange hover:bg-neon-orange/90 text-black neon-glow animate-pulse-glow"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Cash Out ({(currentBet * currentMultiplier).toFixed(4)} Sol)
                  </Button>
                )}
              </div>
            </div>

            {/* Game Grid */}
            <GameGrid onTileClick={handleTileClick} gameActive={gameActive} />

            {gameEnded && (
              <div className="mt-4 p-4 bg-game-surface rounded-lg border border-game-grid text-center">
                <p className="text-lg font-medium">
                  {currentMultiplier > 1
                    ? `🎉 You won ${(currentBet * currentMultiplier).toFixed(4)} Sol!`
                    : "💀 Game Over - You hit a trap!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Info */}
      <div className="container mx-auto px-6 pb-8">
        <div className="glass-morphism rounded-xl p-6 border border-neon-blue/30">
          <h3 className="text-lg font-semibold text-neon-blue mb-4">
            How to Play
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="text-neon-purple font-medium mb-2">
                🎯 Objective
              </h4>
              <p>
                Explore the 5x5 grid to find spirit relics while avoiding deadly
                traps. Each relic increases your payout multiplier.
              </p>
            </div>
            <div>
              <h4 className="text-neon-green font-medium mb-2">💎 Relics</h4>
              <p>
                Power relics increase your multiplier. The rarer the relic, the
                higher the multiplier bonus. Cash out anytime to secure
                winnings.
              </p>
            </div>
            <div>
              <h4 className="text-neon-orange font-medium mb-2">
                ⚡ Fair Play
              </h4>
              <p>
                All games use verifiable randomness (VRF) and are fully
                on-chain. House edge of 3-5% is shared with Sol stakers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
