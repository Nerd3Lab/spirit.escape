import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Shuffle, Volume } from "lucide-react";

export default function Death() {
  const location = useLocation();
  const navigate = useNavigate();

  const lost = useMemo(() => {
    const stateLost = (location.state as any)?.lost;
    if (typeof stateLost === "number") return stateLost;
    const params = new URLSearchParams(location.search);
    const q = params.get("lost");
    return q ? parseFloat(q) : undefined;
  }, [location]);

  const rows = Array.from({ length: 6 }).map((_, idx) => ({
    multiplier: [3.32, 2.65, 2.21, 1.84, 1.58, 1.26][idx] ?? 1 + idx * 0.1,
    tiles: Array.from({ length: 6 }).map((__, t) => ({
      hasSkull: Math.random() < (t === 2 && idx === 4 ? 1 : 0.15),
      highlighted: idx === 4 && t === 4,
    })),
  }));

  return (
    <div className="min-h-screen bg-game-bg flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-md mx-auto">
          <div className="space-y-4">
            {rows.map((row, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-3 py-4 rounded-xl ${
                  i === 4 ? "border-4 border-neon-green/80" : "border border-game-grid"
                } bg-game-surface`}
              >
                <div className="w-12 text-left text-sm text-muted-foreground">
                  {row.multiplier.toFixed(2)}x
                </div>
                <div className="flex-1 grid grid-cols-6 gap-3">
                  {row.tiles.map((tile, tIdx) => (
                    <div
                      key={tIdx}
                      className={`h-12 rounded flex items-center justify-center ${
                        tile.highlighted
                          ? "bg-neon-green"
                          : "bg-game-tile border border-game-grid"
                      }`}
                    >
                      {tile.hasSkull ? (
                        <span className={`${tile.highlighted ? "text-black" : "text-white"} text-xl`}>
                          ☠️
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="border-t border-game-grid bg-game-surface p-4 sticky bottom-0">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="px-6 py-2 bg-neon-green rounded-full text-black font-bold text-lg">
              1.58 x
            </div>
            <div className="ml-3 w-8 h-8 rounded-full border border-game-grid flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-neon-green mb-4">
            <div className="flex items-center gap-2">
              <div className="text-neon-green">♦</div>
              <div className="text-white">0.0016</div>
            </div>
            <div className="flex items-center gap-2">
              <div>😵</div>
              <div className="text-white">+0.23</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <div className="rounded-lg border border-neon-green p-1 flex items-center gap-2">
                <button className="px-4 py-2 rounded-full bg-neon-green text-black font-semibold">.001</button>
                <button className="px-4 py-2 rounded-full text-muted-foreground">.01</button>
                <button className="px-4 py-2 rounded-full text-muted-foreground">.1</button>
                <button className="px-4 py-2 rounded-full text-muted-foreground">1</button>
              </div>
              <div className="text-xs text-muted-foreground mt-2">0.0046 ETH / CUSTOM BET</div>
            </div>

            <div>
              <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow">
                <Shuffle className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          <div className="mb-2">
            <Button className="w-full bg-neon-green text-black neon-glow py-4 text-lg font-bold">Start</Button>
          </div>

          <div className="flex justify-end">
            <button className="p-2 text-muted-foreground">
              <Volume className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
