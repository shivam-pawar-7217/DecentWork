import type { Metadata } from "next"
import JobDetails from "@/components/jobs/job-details"
import BidForm from "@/components/jobs/bid-form"
import ClientInfo from "@/components/jobs/client-info"
import SimilarJobs from "@/components/jobs/similar-jobs"
import { DigitalWave } from "@/components/animations/digital-wave"
import { BlockchainNodes } from "@/components/animations/blockchain-nodes"

export const metadata: Metadata = {
  title: "Job Details | Decentralized Freelancing Platform",
  description: "View job details and submit your proposal",
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#0a0a1a] relative">
      {/* Background animations - smart contract themed */}
      <DigitalWave className="z-0" intensity="low" color="rgba(16, 185, 129, 0.3)" />
      <BlockchainNodes
        className="z-0"
        intensity="medium"
        nodeCount={15}
        primaryColor="rgba(16, 185, 129, 0.8)"
        secondaryColor="rgba(59, 130, 246, 0.8)"
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <JobDetails id={params.id} />
            <BidForm id={params.id} />
          </div>

          <div className="w-full lg:w-80 space-y-6">
            <ClientInfo />
            <SimilarJobs />
          </div>
        </div>
      </div>
    </div>
  )
}

