import { WalletConnect } from "@/components/WalletConnect";
import { Shield, Sparkles, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

function LayoutHeader() {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-game-grid bg-game-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-3 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Left: sidebar trigger + logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-neon-purple animate-float" />
              <div className="absolute inset-0 blur-sm">
                <Sparkles className="w-8 h-8 text-neon-purple/50" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Zonic<span className="text-neon-purple">.Fun</span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Decentralized Risk Game
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Trust Indicators */}
            <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-neon-green" />
                <span>VRF Verified</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-neon-blue" />
                <span>892 Players</span>
              </div>
            </div>

            {/* Wallet Connect */}
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
}

export default LayoutHeader;
