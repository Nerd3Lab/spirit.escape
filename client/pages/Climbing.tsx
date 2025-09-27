import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DollarSign, Play, RefreshCw, Skull, Star, Undo2 } from "lucide-react";

interface RowConfig {
  bombIndex: number;
}

const COLS = 5;
const ROWS = 10;

function generateMultipliers(rows: number) {
  const out: number[] = [];
  // Smooth, increasing curve similar to common ladder games
  // Start a bit above 1x and grow with a small ratio
  let m = 1.4; // first clear
  let r = 1.18; // growth per row
  for (let i = 0; i < rows; i++) {
    out.push(parseFloat(m.toFixed(2)));
    m *= r;
    r = Math.min(r * 1.02, 1.27);
  }
  return out;
}

function createBoard(rows: number, cols: number): RowConfig[] {
  const board: RowConfig[] = [];
  for (let i = 0; i < rows; i++) {
    board.push({ bombIndex: Math.floor(Math.random() * cols) });
  }
  return board;
}

export default function Climbing() {
  const [bet, setBet] = useState(0.001);
  const [balance, setBalance] = useState(0.0046);
  const [inGame, setInGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0); // next row to play
  const [selectedCols, setSelectedCols] = useState<number[]>([]);
  const [board, setBoard] = useState<RowConfig[]>(() =>
    createBoard(ROWS, COLS),
  );

  const multipliers = useMemo(() => generateMultipliers(ROWS), []);

  const currentPayoutMultiplier =
    currentRow === 0 ? 1 : multipliers[currentRow - 1];
  const potentialWin = bet * currentPayoutMultiplier;

  const resetGame = () => {
    setInGame(false);
    setGameOver(false);
    setCurrentRow(0);
    setSelectedCols([]);
    setBoard(createBoard(ROWS, COLS));
  };

  const start = () => {
    if (inGame || bet <= 0 || balance < bet) return;
    setBalance((b) => b - bet);
    setInGame(true);
    setGameOver(false);
    setCurrentRow(0);
    setSelectedCols([]);
    setBoard(createBoard(ROWS, COLS));
  };

  const cashOut = () => {
    if (!inGame) return;
    setBalance((b) => b + potentialWin);
    setInGame(false);
  };

  const handlePick = (col: number) => {
    if (!inGame || gameOver) return;
    const row = currentRow;
    const isBomb = board[row].bombIndex === col;

    setSelectedCols((prev) => {
      const next = [...prev];
      next[row] = col;
      return next;
    });

    if (isBomb) {
      setGameOver(true);
      setInGame(false);
      return;
    }

    const nextRow = row + 1;
    setCurrentRow(nextRow);

    // Auto win if reached top
    if (nextRow >= ROWS) {
      setBalance((b) => b + potentialWin);
      setInGame(false);
    }
  };

  const shuffleTiles = () => {
    // Reshuffle bombs for remaining rows only
    setBoard((prev) =>
      prev.map((cfg, idx) =>
        idx < currentRow
          ? cfg
          : { bombIndex: Math.floor(Math.random() * COLS) },
      ),
    );
  };

  const quickSet = (v: number) => setBet(parseFloat(v.toFixed(4)));

  return (
    <div className="min-h-screen bg-game-bg">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neon-purple">
                  Climbing
                </h2>
                <p className="text-muted-foreground">
                  Pick a safe tile each row. Cash out anytime.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-xl font-bold text-neon-green">
                  {balance.toFixed(4)} ETH
                </p>
              </div>
            </div>

            {/* Board */}
            <div className="relative overflow-hidden rounded-xl border border-game-grid bg-game-surface">
              <div className="absolute inset-0 pointer-events-none cyber-grid opacity-40" />
              <div className="relative flex flex-col-reverse gap-3 p-4">
                {Array.from({ length: ROWS }).map((_, rIdxFromBottom) => {
                  const rowIndex = rIdxFromBottom; // 0 bottom -> up
                  const active = inGame && rowIndex === currentRow && !gameOver;
                  const cleared = rowIndex < currentRow;
                  const bombAt = board[rowIndex].bombIndex;
                  const picked = selectedCols[rowIndex];
                  const label = rowIndex === 0 ? 1 : multipliers[rowIndex - 1];
                  return (
                    <div
                      key={rowIndex}
                      className={cn(
                        "rounded-lg p-2 border transition-colors",
                        active ? "border-neon-green/60" : "border-game-grid",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-right text-xs text-muted-foreground">
                          {rowIndex === 0 ? "1.00x" : `${label.toFixed(2)}x`}
                        </div>
                        <div className="grid grid-cols-5 gap-2 flex-1">
                          {Array.from({ length: COLS }).map((__, c) => {
                            const isPicked = picked === c;
                            const isBomb = bombAt === c;
                            const canClick = active && !isPicked;
                            const revealed =
                              cleared ||
                              isPicked ||
                              (gameOver && rowIndex === currentRow && isBomb);
                            return (
                              <button
                                key={c}
                                disabled={!canClick}
                                onClick={() => handlePick(c)}
                                className={cn(
                                  "relative aspect-[1.8/1] rounded-md border text-center text-sm font-medium",
                                  canClick
                                    ? "bg-game-tile hover:bg-game-tile-hover border-neon-blue/40"
                                    : "bg-game-tile border-game-grid",
                                  revealed &&
                                    isBomb &&
                                    "bg-red-500/20 border-red-500",
                                  revealed &&
                                    !isBomb &&
                                    "bg-neon-purple/15 border-neon-purple",
                                  isPicked && "ring-2 ring-neon-green",
                                )}
                              >
                                <div className="absolute inset-0 flex items-center justify-center">
                                  {revealed ? (
                                    isBomb ? (
                                      <Skull className="w-4 h-4 text-red-400" />
                                    ) : (
                                      <Star className="w-4 h-4 text-neon-purple" />
                                    )
                                  ) : null}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] items-center">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  onClick={shuffleTiles}
                  disabled={!inGame || gameOver}
                  className="border-neon-blue/40"
                >
                  <RefreshCw className="w-4 h-4" /> Shuffle Tiles
                </Button>

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">Bet</span>
                  <Input
                    type="number"
                    value={bet}
                    min={0}
                    step={0.0001}
                    onChange={(e) => setBet(Number(e.target.value))}
                    disabled={inGame}
                    className="w-24 bg-game-tile border-game-grid"
                  />
                  <div className="flex gap-1">
                    {[0.001, 0.01, 0.1, 1].map((v) => (
                      <Button
                        key={v}
                        variant="outline"
                        size="sm"
                        disabled={inGame}
                        onClick={() => quickSet(v)}
                        className="border-game-grid"
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-stretch gap-3 justify-end">
                <div className="hidden md:flex flex-col items-end justify-center px-4 py-2 rounded-lg border border-neon-green/40 bg-game-surface">
                  <div className="text-xs text-muted-foreground">Payout</div>
                  <div className="text-neon-green font-bold">
                    {currentPayoutMultiplier.toFixed(2)}x
                  </div>
                </div>

                {!inGame ? (
                  <Button
                    onClick={start}
                    disabled={bet <= 0 || balance < bet}
                    className="bg-neon-green text-black hover:bg-neon-green/90 neon-glow"
                  >
                    <Play className="w-4 h-4" /> Start
                  </Button>
                ) : (
                  <Button
                    onClick={cashOut}
                    className="bg-neon-orange text-black hover:bg-neon-orange/90 neon-glow animate-pulse-glow"
                  >
                    <DollarSign className="w-4 h-4" /> Cash Out (
                    {potentialWin.toFixed(4)})
                  </Button>
                )}

                {(gameOver || (!inGame && currentRow > 0)) && (
                  <Button
                    variant="outline"
                    onClick={resetGame}
                    className="border-game-grid"
                  >
                    <Undo2 className="w-4 h-4" /> Reset
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
