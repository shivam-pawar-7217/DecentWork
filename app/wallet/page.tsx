import type { Metadata } from "next"
import WalletOverview from "@/components/wallet/wallet-overview"
import TransactionHistory from "@/components/wallet/transaction-history"
import WalletActions from "@/components/wallet/wallet-actions"
import EscrowContracts from "@/components/wallet/escrow-contracts"
import { DigitalWave } from "@/components/animations/digital-wave"
import { BlockchainNodes } from "@/components/animations/blockchain-nodes"
import { GlitchEffect } from "@/components/animations/glitch-effect"

export const metadata: Metadata = {
  title: "Wallet | Decentralized Freelancing Platform",
  description: "Manage your crypto wallet and transactions",
}

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] relative">
      {/* Background animations - finance themed */}
      <DigitalWave className="z-0" intensity="low" color="rgba(16, 185, 129, 0.3)" />
      <BlockchainNodes
        className="z-0"
        intensity="medium"
        nodeCount={30}
        primaryColor="rgba(16, 185, 129, 0.8)"
        secondaryColor="rgba(234, 179, 8, 0.8)"
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <GlitchEffect intensity="low">
          <h1 className="text-3xl font-bold mb-8 text-white">Wallet</h1>
        </GlitchEffect>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <WalletOverview />
            <TransactionHistory />
          </div>

          <div className="space-y-8">
            <WalletActions />
            <EscrowContracts />
          </div>
        </div>
      </div>
    </div>
  )
}

