import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { SubtleBackground } from "@/components/ui/subtle-background"
import { PremiumButton } from "@/components/ui/premium-button"
import { PremiumCard } from "@/components/ui/premium-card"
import { StatsCounter } from "@/components/ui/stats-counter"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <SubtleBackground type="wave" intensity="low" className="z-0" />

      {/* Navigation */}
      <Navbar transparent />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Empowering Freelancers,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Decentralized & Secure
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Connect with top talent, secure payments with smart contracts, and build your decentralized career on
                the blockchain.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/signup">
                  <PremiumButton glowIntensity="medium">Get Started</PremiumButton>
                </Link>
                <Link href="/jobs">
                  <PremiumButton variant="outline">
                    Explore Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PremiumButton>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <PremiumCard className="p-8 max-w-md mx-auto" glowIntensity="medium">
                <Image
                  src="/blockchain-marketplace.jpg"
                  width={500}
                  height={400}
                  alt="Futuristic blockchain freelancing marketplace"
                  className="rounded-lg shadow-lg"
                  priority
                />
              </PremiumCard>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5 bg-gradient-premium">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter value={10000} label="Freelancers" suffix="+" />
            <StatsCounter value={5000} label="Completed Projects" suffix="+" />
            <StatsCounter value={2500} label="Active Jobs" suffix="+" />
            <StatsCounter value={1000000} label="Secure Transactions" prefix="$" suffix="+" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-muted-foreground text-lg">
              DecentWork combines the best of blockchain technology with a premium user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Escrow",
                description: "Smart contract escrow ensures your funds are safe until work is completed and approved.",
              },
              {
                title: "Fast Payments",
                description: "Get paid instantly when work is approved, with no intermediaries or delays.",
              },
              {
                title: "Privacy Protected",
                description: "Your data is encrypted and your identity is protected on our decentralized platform.",
              },
            ].map((feature, index) => (
              <PremiumCard key={index} className="p-6" hoverEffect>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-gradient-premium">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Our platform makes freelancing simple, secure, and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Set up your decentralized identity and showcase your skills and portfolio.",
              },
              {
                step: "02",
                title: "Find or Post Jobs",
                description: "Browse available gigs or post your requirements for freelancers.",
              },
              {
                step: "03",
                title: "Secure Payments",
                description: "Use smart contracts for escrow and get paid securely when milestones are completed.",
              },
            ].map((item, index) => (
              <PremiumCard key={index} className="p-6 relative" hoverEffect>
                <div className="absolute -top-5 -left-2 bg-gradient-to-r from-primary to-primary/80 text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <PremiumCard className="p-8 md:p-12 max-w-4xl mx-auto text-center" glowIntensity="medium">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your decentralized career?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of freelancers and clients already using our platform.
            </p>
            <Link href="/signup">
              <PremiumButton glowIntensity="high" size="lg">
                Get Started Today
              </PremiumButton>
            </Link>
          </PremiumCard>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

