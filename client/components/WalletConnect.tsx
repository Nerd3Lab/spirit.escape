import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown } from "lucide-react";

interface WalletConnectProps {
  className?: string;
}

export function WalletConnect({ className = "" }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    // Simulate wallet connection
    setIsConnected(true);
    setAddress("0x1234...5678");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
  };

  if (isConnected) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-2 bg-game-surface rounded-lg px-3 py-2 border border-neon-purple/30">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse-glow"></div>
          <span className="text-sm font-medium text-neon-blue">{address}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      className={`bg-primary hover:bg-primary/90 text-primary-foreground neon-glow ${className}`}
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
}
