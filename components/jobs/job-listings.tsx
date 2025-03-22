"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Star, Clock, DollarSign, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const jobs = [
  {
    id: 1,
    title: "Smart Contract Developer for DeFi Protocol",
    description:
      "We're looking for an experienced Solidity developer to help build our decentralized finance protocol. You'll be responsible for designing and implementing smart contracts for lending, borrowing, and yield farming.",
    budget: "$3,000 - $5,000",
    duration: "2-3 weeks",
    location: "Remote",
    postedAt: "2 hours ago",
    skills: ["Solidity", "Ethereum", "DeFi", "Smart Contracts"],
    client: {
      name: "DeFi Innovations",
      rating: 4.9,
      reviews: 24,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    title: "UI/UX Designer for NFT Marketplace",
    description:
      "Design a modern and intuitive user interface for our upcoming NFT marketplace. The design should be visually appealing and provide a seamless user experience for browsing, buying, and selling NFTs.",
    budget: "$2,000 - $3,500",
    duration: "1-2 weeks",
    location: "Remote",
    postedAt: "5 hours ago",
    skills: ["UI/UX", "Figma", "NFT", "Web3"],
    client: {
      name: "NFT Collective",
      rating: 4.7,
      reviews: 18,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    title: "Full-Stack Developer for Web3 Social Platform",
    description:
      "We're building a decentralized social media platform and need a full-stack developer to help with both frontend and backend development. Experience with React, Node.js, and blockchain integration is required.",
    budget: "$4,000 - $6,000",
    duration: "1-2 months",
    location: "Remote",
    postedAt: "1 day ago",
    skills: ["React", "Node.js", "Web3.js", "MongoDB"],
    client: {
      name: "Decentralized Social",
      rating: 4.8,
      reviews: 32,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 4,
    title: "Blockchain Security Auditor",
    description:
      "Conduct a comprehensive security audit of our smart contracts and blockchain infrastructure. Identify vulnerabilities, suggest improvements, and provide a detailed report of your findings.",
    budget: "$5,000 - $8,000",
    duration: "2-3 weeks",
    location: "Remote",
    postedAt: "2 days ago",
    skills: ["Security", "Solidity", "Auditing", "Smart Contracts"],
    client: {
      name: "Secure Chain",
      rating: 5.0,
      reviews: 15,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

export default function JobListings() {
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const toggleSaveJob = (id: number) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id))
    } else {
      setSavedJobs([...savedJobs, id])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Showing {jobs.length} jobs</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Newest
          </Button>
          <Button variant="ghost" size="sm">
            Highest Budget
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-xl font-semibold hover:text-primary transition-colors"
                    >
                      {job.title}
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.postedAt}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.budget}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSaveJob(job.id)}
                    className={savedJobs.includes(job.id) ? "text-primary" : ""}
                  >
                    <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? "fill-primary" : ""}`} />
                  </Button>
                </div>

                <p className="mt-4 text-muted-foreground line-clamp-2">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={job.client.avatar} alt={job.client.name} />
                      <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{job.client.name}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-xs">{job.client.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({job.client.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Duration:</span> {job.duration}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 px-6 py-3">
                <div className="flex justify-end w-full">
                  <Button asChild>
                    <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

