import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Shield,
  Users,
  Search,
  CheckCircle,
  ExternalLink,
  Hash,
  Eye,
  Lock,
  Cpu,
  FileCheck,
  AlertCircle,
  Copy,
  Calendar,
  Clock,
} from "lucide-react";

interface GameRecord {
  gameId: string;
  player: string;
  timestamp: number;
  betAmount: number;
  outcome: "win" | "loss";
  winAmount?: number;
  gridSeed: string;
  vrfProof: string;
  blockHash: string;
  transactionHash: string;
  verified: boolean;
}

const mockGameRecords: GameRecord[] = [
  {
    gameId: "0x7f9a8b2c",
    player: "0x1234...5678",
    timestamp: Date.now() - 300000,
    betAmount: 0.1,
    outcome: "win",
    winAmount: 0.23,
    gridSeed:
      "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    vrfProof:
      "0x9876543210fedcba0987654321fedcba0987654321fedcba0987654321fedcba",
    blockHash:
      "0xdef123456789abcdef123456789abcdef123456789abcdef123456789abcdef12",
    transactionHash:
      "0x456789abcdef123456789abcdef123456789abcdef123456789abcdef12345678",
    verified: true,
  },
  {
    gameId: "0x8a1b9c3d",
    player: "0x9876...4321",
    timestamp: Date.now() - 450000,
    betAmount: 0.05,
    outcome: "loss",
    gridSeed:
      "0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567",
    vrfProof:
      "0x8765432109edcba0987654321fedcba0987654321fedcba0987654321fedcba",
    blockHash:
      "0xef123456789abcdef123456789abcdef123456789abcdef123456789abcdef123",
    transactionHash:
      "0x56789abcdef123456789abcdef123456789abcdef123456789abcdef123456789",
    verified: true,
  },
  {
    gameId: "0x9b2c4d5e",
    player: "0x5555...8888",
    timestamp: Date.now() - 600000,
    betAmount: 0.25,
    outcome: "win",
    winAmount: 0.48,
    gridSeed:
      "0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef123456789",
    vrfProof:
      "0x7654321098dcba0987654321fedcba0987654321fedcba0987654321fedcba",
    blockHash:
      "0xf123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234",
    transactionHash:
      "0x6789abcdef123456789abcdef123456789abcdef123456789abcdef1234567890",
    verified: true,
  },
];

export default function FairnessCheck() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<GameRecord | null>(null);
  const [verificationInput, setVerificationInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const filteredRecords = mockGameRecords.filter(
    (record) =>
      record.gameId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.transactionHash.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-game-bg">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-neon-green" />
            <h1 className="text-4xl font-bold text-neon-green">
              Provable Fairness
            </h1>
            <Shield className="w-8 h-8 text-neon-green" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every game in Spirit Escape is provably fair using Chainlink VRF and
            cryptographic proofs. Verify any game result independently and
            transparently.
          </p>
        </div>

        {/* Fairness Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-morphism rounded-xl p-6 border border-neon-blue/30">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-neon-blue" />
              <h3 className="text-lg font-semibold text-neon-blue">
                Chainlink VRF
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Game outcomes use Chainlink's Verifiable Random Function,
              providing cryptographically secure and verifiable randomness that
              cannot be manipulated.
            </p>
          </div>

          <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-neon-purple" />
              <h3 className="text-lg font-semibold text-neon-purple">
                On-Chain Proofs
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              All game seeds, outcomes, and random numbers are stored on-chain
              with cryptographic proofs that can be independently verified by
              anyone.
            </p>
          </div>

          <div className="glass-morphism rounded-xl p-6 border border-neon-orange/30">
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="w-6 h-6 text-neon-orange" />
              <h3 className="text-lg font-semibold text-neon-orange">
                Open Source
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Our smart contracts are open source and audited. The fairness
              algorithm can be reviewed and verified by the community.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Game Verification */}
          <div className="space-y-6">
            <div className="glass-morphism rounded-xl p-6 border border-neon-green/30">
              <div className="flex items-center gap-2 mb-6">
                <Search className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-neon-green">
                  Verify Game Result
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Game ID or Transaction Hash
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={verificationInput}
                      onChange={(e) => setVerificationInput(e.target.value)}
                      placeholder="0x7f9a8b2c... or full transaction hash"
                      className="font-mono bg-game-tile border-game-grid"
                    />
                    <Button
                      variant="outline"
                      className="border-neon-green/30 text-neon-green hover:bg-neon-green/10"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-game-surface rounded-lg border border-game-grid">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" />
                    <span className="text-neon-green font-medium">
                      Verification Steps
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      <span>1. Fetch VRF proof from blockchain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      <span>2. Verify randomness commitment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      <span>3. Reconstruct game grid from seed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      <span>4. Validate outcome integrity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Verification Tool */}
            <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-5 h-5 text-neon-purple" />
                <h3 className="text-lg font-semibold text-neon-purple">
                  Quick Hash Verification
                </h3>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Latest Block:</span>
                    <p className="text-neon-blue font-mono">18,542,891</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">VRF Requests:</span>
                    <p className="text-neon-green font-mono">1,247</p>
                  </div>
                </div>
                <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-primary-foreground">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Solscan
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Games */}
          <div className="glass-morphism rounded-xl p-6 border border-neon-orange/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-neon-orange" />
                <h3 className="text-lg font-semibold text-neon-orange">
                  Recent Verified Games
                </h3>
              </div>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games..."
                className="w-48 bg-game-tile border-game-grid text-sm"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredRecords.map((record) => (
                <div
                  key={record.gameId}
                  onClick={() => setSelectedRecord(record)}
                  className="p-4 bg-game-surface rounded-lg border border-game-grid hover:border-neon-orange/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-neon-orange">
                        {record.gameId}
                      </span>
                      <CheckCircle className="w-4 h-4 text-neon-green" />
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        record.outcome === "win"
                          ? "bg-neon-green/20 text-neon-green"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {record.outcome === "win"
                        ? `+${record.winAmount} SOL`
                        : `-${record.betAmount} SOL`}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span className="block">Player:</span>
                      <span className="font-mono">
                        {truncateHash(record.player)}
                      </span>
                    </div>
                    <div>
                      <span className="block">Time:</span>
                      <span>{formatTimestamp(record.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Game Details */}
        {selectedRecord && (
          <div className="mt-8 glass-morphism rounded-xl p-6 border border-neon-blue/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-neon-blue" />
                <h3 className="text-lg font-semibold text-neon-blue">
                  Game Details
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRecord(null)}
                className="border-muted text-muted-foreground"
              >
                Close
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Game ID
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-neon-blue">
                      {selectedRecord.gameId}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(selectedRecord.gameId, "gameId")
                      }
                    >
                      {copied === "gameId" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Player
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-neon-green">
                      {selectedRecord.player}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(selectedRecord.player, "player")
                      }
                    >
                      {copied === "player" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Bet Amount
                    </label>
                    <span className="text-neon-orange font-semibold">
                      {selectedRecord.betAmount} SOL
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Outcome
                    </label>
                    <span
                      className={
                        selectedRecord.outcome === "win"
                          ? "text-neon-green"
                          : "text-red-400"
                      }
                    >
                      {selectedRecord.outcome === "win"
                        ? `Won ${selectedRecord.winAmount} SOL`
                        : "Lost"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Grid Seed
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-neon-purple break-all">
                      {truncateHash(selectedRecord.gridSeed)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(selectedRecord.gridSeed, "gridSeed")
                      }
                    >
                      {copied === "gridSeed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    VRF Proof
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-neon-blue break-all">
                      {truncateHash(selectedRecord.vrfProof)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(selectedRecord.vrfProof, "vrfProof")
                      }
                    >
                      {copied === "vrfProof" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Transaction
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-neon-green">
                      {truncateHash(selectedRecord.transactionHash)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `https://solscan.io/tx/${selectedRecord.transactionHash}`,
                          "_blank",
                        )
                      }
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-neon-green/5 border border-neon-green/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <span className="text-neon-green font-medium">
                  Verification Status
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                This game has been cryptographically verified using Chainlink
                VRF. The random seed, game outcome, and all proofs have been
                validated against the blockchain.
              </p>
            </div>
          </div>
        )}

        {/* How Fairness Works */}
        <div className="mt-12 glass-morphism rounded-xl p-8 border border-neon-purple/30">
          <h3 className="text-2xl font-semibold text-neon-purple mb-6 text-center">
            How Provable Fairness Works
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-neon-blue" />
              </div>
              <h4 className="text-lg font-medium text-neon-blue mb-2">
                1. Game Initiated
              </h4>
              <p className="text-sm text-muted-foreground">
                Player places bet and initiates game. A commitment to the future
                random seed is created on-chain.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-neon-green" />
              </div>
              <h4 className="text-lg font-medium text-neon-green mb-2">
                2. VRF Request
              </h4>
              <p className="text-sm text-muted-foreground">
                Chainlink VRF generates verifiable random number using
                cryptographic proofs that cannot be manipulated.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hash className="w-8 h-8 text-neon-orange" />
              </div>
              <h4 className="text-lg font-medium text-neon-orange mb-2">
                3. Grid Generation
              </h4>
              <p className="text-sm text-muted-foreground">
                Random seed is used to deterministically generate the game grid
                with relic and trap positions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-neon-purple" />
              </div>
              <h4 className="text-lg font-medium text-neon-purple mb-2">
                4. Verification
              </h4>
              <p className="text-sm text-muted-foreground">
                All data is stored on-chain permanently. Anyone can verify the
                game outcome using the provided proofs.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground mb-4">
            Smart contracts are deployed on Solona mainnet and verified on
            Solscan. VRF coordinator:
            0x271682DEB8C4E0901D1a1550aD2e64D568E69909
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-neon-blue/30 text-neon-blue"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Smart Contract
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-neon-green/30 text-neon-green"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Audit Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
