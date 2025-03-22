import type { Metadata } from "next"
import { SubtleBackground } from "@/components/ui/subtle-background"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { PremiumCard } from "@/components/ui/premium-card"
import { PremiumButton } from "@/components/ui/premium-button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How It Works | DecentWork",
  description: "Learn how our decentralized freelancing platform works",
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background animations */}
      <SubtleBackground type="grid" intensity="low" className="z-0" />

      {/* Navigation */}
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">How DecentWork Works</h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Our platform makes freelancing simple, secure, and efficient through blockchain technology
          </p>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description:
                  "Set up your decentralized identity and showcase your skills and portfolio. Verify your credentials to build trust with potential clients or freelancers.",
                details: [
                  "Create a secure account with email or wallet",
                  "Build your professional profile with skills and experience",
                  "Upload portfolio items and credentials",
                  "Set your rates and availability",
                ],
              },
              {
                step: "02",
                title: "Find or Post Jobs",
                description:
                  "Browse available gigs or post your requirements for freelancers. Our smart matching system connects the right talent with the right projects.",
                details: [
                  "Post detailed job requirements with clear deliverables",
                  "Browse jobs filtered by skills, budget, and timeline",
                  "Save favorite jobs for later application",
                  "Receive notifications for matching opportunities",
                ],
              },
              {
                step: "03",
                title: "Secure Bidding Process",
                description:
                  "Submit or review proposals with transparent terms. Negotiate details and finalize agreements with confidence.",
                details: [
                  "Submit detailed proposals with timeline and cost breakdown",
                  "Review multiple bids with freelancer ratings and history",
                  "Negotiate terms through secure messaging",
                  "Accept proposals with clear milestones",
                ],
              },
              {
                step: "04",
                title: "Smart Contract Escrow",
                description:
                  "Funds are held securely in smart contracts until work is completed and approved, protecting both parties.",
                details: [
                  "Client funds are locked in secure escrow contracts",
                  "Milestone-based releases for larger projects",
                  "Automated payments upon milestone approval",
                  "Dispute resolution system if needed",
                ],
              },
              {
                step: "05",
                title: "Collaboration & Delivery",
                description:
                  "Work together through our integrated tools. Submit, review, and approve deliverables all in one place.",
                details: [
                  "Built-in messaging and file sharing",
                  "Progress tracking and milestone updates",
                  "Time tracking for hourly contracts",
                  "Version control for deliverables",
                ],
              },
              {
                step: "06",
                title: "Payment & Reviews",
                description:
                  "Receive instant payments when work is approved. Build your reputation with verified reviews.",
                details: [
                  "Instant payments to your wallet or bank account",
                  "Low transaction fees compared to traditional platforms",
                  "Verified review system tied to completed contracts",
                  "Build reputation score over time",
                ],
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8">
                <div className="md:w-24 flex-shrink-0">
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-white text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  <PremiumCard className="p-6 bg-gradient-premium">
                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-4 h-4 rounded-full bg-primary/20 mr-3 mt-1"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </PremiumCard>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of freelancers and clients already using our platform.
            </p>
            <Link href="/signup">
              <PremiumButton size="lg" glowIntensity="medium">
                Create Your Account
              </PremiumButton>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

