import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Shield,
  Users,
  Copy,
  Share2,
  Gift,
  TrendingUp,
  Star,
  Crown,
  Coins,
  Link,
  CheckCircle,
  Twitter,
  MessageCircle,
  Gem,
  Trophy,
} from "lucide-react";

interface ReferralTier {
  name: string;
  icon: React.ReactNode;
  minReferrals: number;
  commission: number;
  bonusReward: number;
  color: string;
}

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  thisMonthEarnings: number;
  currentTier: string;
}

const referralTiers: ReferralTier[] = [
  {
    name: "Explorer",
    icon: <Star className="w-5 h-5" />,
    minReferrals: 0,
    commission: 10,
    bonusReward: 0,
    color: "text-neon-green",
  },
  {
    name: "Hunter",
    icon: <Gem className="w-5 h-5" />,
    minReferrals: 5,
    commission: 15,
    bonusReward: 0.1,
    color: "text-neon-blue",
  },
  {
    name: "Master",
    icon: <Trophy className="w-5 h-5" />,
    minReferrals: 15,
    commission: 20,
    bonusReward: 0.25,
    color: "text-neon-purple",
  },
  {
    name: "Legend",
    icon: <Crown className="w-5 h-5" />,
    minReferrals: 50,
    commission: 25,
    bonusReward: 0.5,
    color: "text-neon-orange",
  },
];

export default function Referral() {
  const [referralCode, setReferralCode] = useState("SPIRIT_7X9K2");
  const [copied, setCopied] = useState(false);
  const [customCode, setCustomCode] = useState("");

  const mockStats: ReferralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 2.47,
    thisMonthEarnings: 0.89,
    currentTier: "Hunter",
  };

  const referralLink = `https://spiritescape.game/?ref=${referralCode}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const shareToTwitter = () => {
    const text = `🎮 Join me in Spirit Escape - the ultimate crypto risk game! 💎 Explore ancient ruins, collect relics, and earn ETH! Use my referral link: ${referralLink}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const shareToTelegram = () => {
    const text = `🎮 Join me in Spirit Escape - the ultimate crypto risk game! 💎 Use my referral link: ${referralLink}`;
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const currentTier = referralTiers.find(
    (tier) => tier.name === mockStats.currentTier,
  );
  const nextTier = referralTiers.find(
    (tier) => tier.minReferrals > mockStats.totalReferrals,
  );

  return (
    <div className="min-h-screen bg-game-bg">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-neon-orange" />
            <h1 className="text-4xl font-bold text-neon-orange">
              Referral Program
            </h1>
            <Gift className="w-8 h-8 text-neon-orange" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Invite friends to Spirit Escape and earn commissions from their
            gameplay. The more you refer, the higher your tier and rewards!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-morphism rounded-xl p-6 border border-neon-blue/30">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-neon-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold text-neon-blue">
                  {mockStats.totalReferrals}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-6 border border-neon-green/30">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-neon-green" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Referrals
                </p>
                <p className="text-2xl font-bold text-neon-green">
                  {mockStats.activeReferrals}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
            <div className="flex items-center gap-3">
              <Coins className="w-6 h-6 text-neon-purple" />
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-neon-purple">
                  {mockStats.totalEarnings.toFixed(3)} ETH
                </p>
              </div>
            </div>
          </div>
          <div className="glass-morphism rounded-xl p-6 border border-neon-orange/30">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-neon-orange" />
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-neon-orange">
                  {mockStats.thisMonthEarnings.toFixed(3)} ETH
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Referral Link Section */}
          <div className="space-y-6">
            <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30">
              <div className="flex items-center gap-2 mb-6">
                <Link className="w-5 h-5 text-neon-purple" />
                <h3 className="text-lg font-semibold text-neon-purple">
                  Your Referral Link
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Referral Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={referralCode}
                      onChange={(e) =>
                        setReferralCode(e.target.value.toUpperCase())
                      }
                      className="font-mono bg-game-tile border-game-grid"
                      placeholder="Enter custom code"
                    />
                    <Button
                      onClick={() => copyToClipboard(referralCode)}
                      variant="outline"
                      size="sm"
                      className="border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Referral URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="font-mono bg-game-tile border-game-grid text-neon-blue"
                    />
                    <Button
                      onClick={() => copyToClipboard(referralLink)}
                      variant="outline"
                      size="sm"
                      className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={shareToTwitter}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Share on Twitter
                  </Button>
                  <Button
                    onClick={shareToTelegram}
                    className="flex-1 bg-blue-400 hover:bg-blue-500 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Share on Telegram
                  </Button>
                </div>
              </div>
            </div>

            {/* Current Tier Status */}
            <div className="glass-morphism rounded-xl p-6 border border-neon-green/30">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-semibold text-neon-green">
                  Your Progress
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentTier?.icon}
                    <span className={`font-medium ${currentTier?.color}`}>
                      {currentTier?.name} Tier
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neon-green">
                      {currentTier?.commission}% Commission
                    </p>
                  </div>
                </div>

                {nextTier && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to {nextTier.name}</span>
                        <span>
                          {mockStats.totalReferrals}/{nextTier.minReferrals}
                        </span>
                      </div>
                      <div className="w-full bg-game-tile rounded-full h-2">
                        <div
                          className="bg-neon-green h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min((mockStats.totalReferrals / nextTier.minReferrals) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {nextTier.minReferrals - mockStats.totalReferrals} more
                      referrals to unlock {nextTier.commission}% commission rate
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Referral Tiers */}
          <div className="glass-morphism rounded-xl p-6 border border-neon-orange/30">
            <div className="flex items-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-neon-orange" />
              <h3 className="text-lg font-semibold text-neon-orange">
                Referral Tiers
              </h3>
            </div>

            <div className="space-y-4">
              {referralTiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`p-4 rounded-lg border transition-all ${
                    tier.name === mockStats.currentTier
                      ? "border-neon-green bg-neon-green/5"
                      : "border-game-grid bg-game-tile"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={tier.color}>{tier.icon}</div>
                      <span className={`font-medium ${tier.color}`}>
                        {tier.name}
                      </span>
                      {tier.name === mockStats.currentTier && (
                        <span className="text-xs bg-neon-green text-black px-2 py-1 rounded">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <span className={`text-sm font-bold ${tier.color}`}>
                      {tier.commission}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Minimum referrals: {tier.minReferrals}</p>
                    <p>• Commission rate: {tier.commission}%</p>
                    {tier.bonusReward > 0 && (
                      <p>• Tier bonus: {tier.bonusReward} ETH</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 glass-morphism rounded-xl p-8 border border-neon-blue/30">
          <h3 className="text-2xl font-semibold text-neon-blue mb-6 text-center">
            How Referrals Work
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-neon-purple" />
              </div>
              <h4 className="text-lg font-medium text-neon-purple mb-2">
                1. Share Your Link
              </h4>
              <p className="text-sm text-muted-foreground">
                Share your unique referral link with friends through social
                media, messaging, or direct invites.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-neon-green" />
              </div>
              <h4 className="text-lg font-medium text-neon-green mb-2">
                2. Friends Join & Play
              </h4>
              <p className="text-sm text-muted-foreground">
                When someone uses your link to join Spirit Escape and starts
                playing, they become your referral.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-neon-orange" />
              </div>
              <h4 className="text-lg font-medium text-neon-orange mb-2">
                3. Earn Commissions
              </h4>
              <p className="text-sm text-muted-foreground">
                Receive a percentage of the house edge from every game your
                referrals play, automatically paid to your wallet.
              </p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Referral rewards are paid automatically every 24 hours. Minimum
            payout: 0.001 ETH. All referrals must be legitimate players - abuse
            will result in account suspension.
          </p>
        </div>
      </div>
    </div>
  );
}
