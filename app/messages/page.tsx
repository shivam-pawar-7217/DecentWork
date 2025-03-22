import type { Metadata } from "next"
import ChatLayout from "@/components/chat/chat-layout"
import { DigitalWave } from "@/components/animations/digital-wave"
import { BlockchainNodes } from "@/components/animations/blockchain-nodes"

export const metadata: Metadata = {
  title: "Messages | Decentralized Freelancing Platform",
  description: "Chat with clients and freelancers",
}

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] relative">
      {/* Background animations - chat themed */}
      <DigitalWave className="z-0" intensity="low" color="rgba(59, 130, 246, 0.3)" />
      <BlockchainNodes
        className="z-0"
        intensity="low"
        nodeCount={25}
        primaryColor="rgba(59, 130, 246, 0.8)"
        secondaryColor="rgba(124, 58, 237, 0.8)"
      />

      <div className="relative z-10">
        <ChatLayout />
      </div>
    </div>
  )
}

