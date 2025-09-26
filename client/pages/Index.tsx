import { WalletConnect } from "@/components/WalletConnect";
import { Dashboard } from "@/components/Dashboard";
import { Sparkles, Shield, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-game-bg">
      {/* Main Dashboard */}
      <Dashboard />

      {/* Staking Promotion */}
      <div className="container mx-auto px-6 pb-8">
        <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-neon-purple" />
              <h3 className="text-xl font-bold text-neon-purple">
                Become the House
              </h3>
              <Sparkles className="w-6 h-6 text-neon-purple" />
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Stake your SOL to become part of the house and earn a share of the
              revenue. All stakers receive proportional rewards from the 3-5%
              house edge on every game.
            </p>
            <div className="flex items-center justify-center gap-8 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-neon-green" />
                <span className="text-muted-foreground">
                  Secure & Transparent
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neon-blue" />
                <span className="text-muted-foreground">18.5% APY</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neon-orange" />
                <span className="text-muted-foreground">Auto-Compounding</span>
              </div>
            </div>
            <Link
              to="/staking"
              className="inline-flex items-center gap-2 bg-neon-purple hover:bg-neon-purple/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors neon-glow"
            >
              Start Staking SOL
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
