import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-game-bg p-6">
      <div className="max-w-md w-full glass-morphism rounded-xl p-8 border border-game-grid text-center">
        <div className="mb-4">
          <div className="text-6xl">💀</div>
        </div>
        <h1 className="text-2xl font-bold text-neon-orange mb-2">Game Over</h1>
        <p className="text-sm text-muted-foreground mb-4">
          You hit a trap and lost {lost ? `${lost.toFixed(4)} ETH` : "your bet"}.
        </p>

        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate('/play')} className="bg-neon-green text-black neon-glow">
            Retry
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Home
          </Button>
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          Tip: You can cash out early in future rounds to secure winnings.
        </div>
      </div>
    </div>
  );
}
