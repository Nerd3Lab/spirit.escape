import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function LayoutFooter() {
  return (
    <footer className="border-t border-game-grid bg-game-surface/30 mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-neon-purple" />
              <span className="font-semibold text-neon-purple">
                Spirit Escape
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A fully decentralized crypto game built on Ethereum with
              verifiable fairness and community ownership.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Game</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="#" className="block hover:text-neon-blue">
                How to Play
              </Link>
              <Link to="#" className="block hover:text-neon-blue">
                Fairness Proof
              </Link>
              <Link to="#" className="block hover:text-neon-blue">
                Game Statistics
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Staking</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="#" className="block hover:text-neon-blue">
                Become House
              </Link>
              <Link to="#" className="block hover:text-neon-blue">
                Revenue Sharing
              </Link>
              <Link to="#" className="block hover:text-neon-blue">
                Stake Calculator
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Community</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="#" className="block hover:text-neon-blue">
                Discord
              </Link>
              <Link to="#" className="block hover:text-neon-blue">
                Twitter
              </Link>
              <Link to="#" className="block hover:text-neon-blue">
                GitHub
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-game-grid mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Spirit Escape. Built with ❤️ for the crypto community.</p>
        </div>
      </div>
    </footer>
  );
}

export default LayoutFooter;
