import type { Metadata } from "next"
import ProfileHeader from "@/components/profile/profile-header"
import ProfileTabs from "@/components/profile/profile-tabs"
import { DigitalWave } from "@/components/animations/digital-wave"
import { BlockchainNodes } from "@/components/animations/blockchain-nodes"

export const metadata: Metadata = {
  title: "Profile | Decentralized Freelancing Platform",
  description: "View and edit your freelancer profile",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] relative">
      {/* Background animations - profile themed */}
      <DigitalWave className="z-0" intensity="low" color="rgba(124, 58, 237, 0.3)" />
      <BlockchainNodes
        className="z-0"
        intensity="low"
        nodeCount={20}
        primaryColor="rgba(124, 58, 237, 0.8)"
        secondaryColor="rgba(59, 130, 246, 0.8)"
      />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <ProfileHeader />
        <ProfileTabs />
      </div>
    </div>
  )
}