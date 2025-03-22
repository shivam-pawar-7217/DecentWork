"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Edit, Share2 } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfileHeader() {
  const [editing, setEditing] = useState(false)

  // This would normally come from an API
  const profile = {
    name: "John Doe",
    title: "Senior Blockchain Developer",
    avatar: "/placeholder.svg?height=120&width=120",
    location: "San Francisco, CA",
    memberSince: "June 2022",
    rating: 4.9,
    reviews: 24,
    verified: true,
    skills: ["Solidity", "Smart Contracts", "Ethereum", "React", "Web3.js", "DeFi", "NFT"],
    hourlyRate: "$85/hr",
    availability: "Available for work",
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="mb-8 overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-primary/20 to-purple-500/20 relative">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]"></div>
          <div className="absolute right-4 top-4 flex gap-2">
            <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => setEditing(!editing)}
            >
              <Edit className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <CardContent className="pt-0">
          <div className="flex flex-col md:flex-row gap-6 -mt-16">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="mt-4 text-center md:text-left">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-muted-foreground">{profile.title}</p>

                <div className="flex items-center justify-center md:justify-start mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{profile.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({profile.reviews} reviews)</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">Member since {profile.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Hourly Rate</h3>
                  <p className="text-xl font-bold">{profile.hourlyRate}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-center md:items-end">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 font-medium">
                  {profile.availability}
                </Badge>

                {profile.verified && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3 text-primary-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Verified Freelancer</span>
                  </div>
                )}

                <div className="flex gap-2 mt-2">
                  <Button>Hire Me</Button>
                  <Button variant="outline">Contact</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

