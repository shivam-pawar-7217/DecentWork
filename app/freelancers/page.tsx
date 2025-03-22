import type { Metadata } from "next"
import { SubtleBackground } from "@/components/ui/subtle-background"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { PremiumCard } from "@/components/ui/premium-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Hire Talent | DecentWork",
  description: "Find and hire top freelance talent for your projects",
}

export default function FreelancersPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background animations */}
      <SubtleBackground type="nodes" intensity="low" className="z-0" />

      {/* Navigation */}
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-8">Hire Talent</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Alex Johnson",
              title: "Blockchain Developer",
              rating: 4.9,
              reviews: 24,
              location: "San Francisco, CA",
              skills: ["Solidity", "Smart Contracts", "DeFi"],
              hourlyRate: "$85/hr",
              avatar: "/placeholder.svg?height=80&width=80",
            },
            {
              name: "Sarah Chen",
              title: "UI/UX Designer",
              rating: 4.8,
              reviews: 18,
              location: "New York, NY",
              skills: ["Figma", "UI/UX", "Web Design"],
              hourlyRate: "$75/hr",
              avatar: "/placeholder.svg?height=80&width=80",
            },
            {
              name: "Mike Rivera",
              title: "Full Stack Developer",
              rating: 4.7,
              reviews: 32,
              location: "Austin, TX",
              skills: ["React", "Node.js", "Web3"],
              hourlyRate: "$90/hr",
              avatar: "/placeholder.svg?height=80&width=80",
            },
            {
              name: "Emma Wilson",
              title: "Smart Contract Auditor",
              rating: 5.0,
              reviews: 15,
              location: "London, UK",
              skills: ["Security", "Solidity", "Auditing"],
              hourlyRate: "$120/hr",
              avatar: "/placeholder.svg?height=80&width=80",
            },
            {
              name: "David Kim",
              title: "Blockchain Consultant",
              rating: 4.9,
              reviews: 27,
              location: "Singapore",
              skills: ["Tokenomics", "Strategy", "DeFi"],
              hourlyRate: "$100/hr",
              avatar: "/placeholder.svg?height=80&width=80",
            },
            {
              name: "Olivia Martinez",
              title: "Frontend Developer",
              rating: 4.6,
              reviews: 21,
              location: "Berlin, Germany",
              skills: ["React", "TypeScript", "Web3.js"],
              hourlyRate: "$80/hr",
              avatar: "/placeholder.svg?height=80&width=80",
            },
          ].map((freelancer, index) => (
            <PremiumCard key={index} className="overflow-hidden" hoverEffect>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                    <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{freelancer.name}</h3>
                    <p className="text-muted-foreground">{freelancer.title}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">{freelancer.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({freelancer.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {freelancer.location}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {freelancer.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <span className="font-bold">{freelancer.hourlyRate}</span>
                  <Link href={`/freelancers/${index + 1}`}>
                    <PremiumButton variant="outline" size="sm">
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </PremiumButton>
                  </Link>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

