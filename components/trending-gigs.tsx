"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const gigs = [
  {
    id: 1,
    title: "Smart Contract Development",
    price: "$500",
    category: "Blockchain",
    rating: 4.9,
    reviews: 124,
    freelancer: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: 2,
    title: "UI/UX Design for DeFi App",
    price: "$350",
    category: "Design",
    rating: 4.8,
    reviews: 98,
    freelancer: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: 3,
    title: "NFT Collection Creation",
    price: "$800",
    category: "NFT",
    rating: 4.7,
    reviews: 56,
    freelancer: {
      name: "Mike Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  {
    id: 4,
    title: "Web3 Frontend Development",
    price: "$600",
    category: "Development",
    rating: 4.9,
    reviews: 87,
    freelancer: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: 5,
    title: "Solidity Code Audit",
    price: "$1200",
    category: "Security",
    rating: 5.0,
    reviews: 42,
    freelancer: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: 6,
    title: "Tokenomics Consultation",
    price: "$450",
    category: "Consulting",
    rating: 4.6,
    reviews: 31,
    freelancer: {
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
]

export default function TrendingGigs() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const maxIndex = Math.max(0, gigs.length - (typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : 1))

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-background border border-border shadow-md disabled:opacity-30"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="overflow-hidden" ref={carouselRef}>
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${currentIndex * (320 + 24)}px` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {gigs.map((gig) => (
            <Card key={gig.id} className="w-[320px] flex-shrink-0 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {gig.category}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{gig.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({gig.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">{gig.title}</h3>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={gig.freelancer.avatar} alt={gig.freelancer.name} />
                      <AvatarFallback>{gig.freelancer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{gig.freelancer.name}</p>
                      {gig.freelancer.verified && <span className="text-xs text-primary">Verified Pro</span>}
                    </div>
                  </div>
                  <p className="text-lg font-bold">{gig.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className="p-2 rounded-full bg-background border border-border shadow-md disabled:opacity-30"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

