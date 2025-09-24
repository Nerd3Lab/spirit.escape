import { useState } from "react";
import { Gem, Zap, Eye } from "lucide-react";

interface Tile {
  id: number;
  isRevealed: boolean;
  hasRelic: boolean;
  hasTrap: boolean;
  multiplier?: number;
}

interface GameGridProps {
  onTileClick: (tile: Tile) => void;
  gameActive: boolean;
}

export function GameGrid({ onTileClick, gameActive }: GameGridProps) {
  const [tiles, setTiles] = useState<Tile[]>(() => {
    const newTiles: Tile[] = [];
    for (let i = 0; i < 25; i++) {
      newTiles.push({
        id: i,
        isRevealed: false,
        hasRelic: Math.random() > 0.7, // 30% chance for relic
        hasTrap: Math.random() > 0.85, // 15% chance for trap
        multiplier: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 2 : 1,
      });
    }
    return newTiles;
  });

  const handleTileClick = (tileId: number) => {
    if (!gameActive) return;

    const tile = tiles.find((t) => t.id === tileId);
    if (!tile || tile.isRevealed) return;

    const updatedTiles = tiles.map((t) =>
      t.id === tileId ? { ...t, isRevealed: true } : t,
    );
    setTiles(updatedTiles);
    onTileClick({ ...tile, isRevealed: true });
  };

  const resetGrid = () => {
    setTiles((prevTiles) =>
      prevTiles.map((tile) => ({
        ...tile,
        isRevealed: false,
        hasRelic: Math.random() > 0.7,
        hasTrap: Math.random() > 0.85,
        multiplier: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 2 : 1,
      })),
    );
  };

  return (
    <div className="game-grid">
      <div className="grid grid-cols-5 gap-2 p-6 bg-game-surface rounded-xl border border-game-grid cyber-grid">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            onClick={() => handleTileClick(tile.id)}
            className={`
              relative aspect-square rounded-lg border transition-all duration-300 cursor-pointer
              ${
                tile.isRevealed
                  ? tile.hasTrap
                    ? "bg-red-500/20 border-red-500 animate-trap-explosion"
                    : tile.hasRelic
                      ? "bg-neon-purple/20 border-neon-purple animate-relic-collect"
                      : "bg-game-tile-hover border-muted"
                  : gameActive
                    ? "bg-game-tile border-game-grid hover:bg-game-tile-hover hover:border-neon-blue/50 hover:scale-105"
                    : "bg-game-tile border-game-grid opacity-60"
              }
            `}
          >
            {tile.isRevealed ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {tile.hasTrap ? (
                  <Zap className="w-6 h-6 text-red-400 animate-pulse" />
                ) : tile.hasRelic ? (
                  <div className="flex flex-col items-center">
                    <Gem className="w-6 h-6 text-neon-purple animate-float" />
                    {tile.multiplier && tile.multiplier > 1 && (
                      <span className="text-xs text-neon-orange font-bold">
                        {tile.multiplier}x
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="w-4 h-4 text-muted-foreground/50" />
              </div>
            )}

            {!tile.isRevealed && gameActive && (
              <div className="absolute inset-0 relic-shimmer rounded-lg"></div>
            )}
          </div>
        ))}
      </div>

      {!gameActive && (
        <div className="flex justify-center mt-4">
          <button
            onClick={resetGrid}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors"
          >
            Reset Grid
          </button>
        </div>
      )}
    </div>
  );
}
