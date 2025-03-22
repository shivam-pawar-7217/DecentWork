"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

export default function ClientInfo() {
  // This would normally come from an API
  const client = {
    name: "DeFi Innovations",
    avatar: "/placeholder.svg?height=80&width=80",
    location: "Global, Remote",
    memberSince: "June 2022",
    rating: 4.9,
    reviews: 24,
    jobsPosted: 18,
    hireRate: "85%",
    verified: true,
    description:
      "We're a team building innovative DeFi solutions on multiple blockchains. We work with talented freelancers from around the world to create cutting-edge decentralized applications.",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>About the Client</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-2">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{client.name}</h3>
            {client.verified && (
              <Badge variant="secondary" className="mt-1">
                Verified Client
              </Badge>
            )}
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium">{client.rating}</span>
              <span className="text-sm text-muted-foreground ml-1">({client.reviews} reviews)</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{client.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Member since {client.memberSince}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="text-center p-2 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">Jobs Posted</p>
              <p className="font-medium">{client.jobsPosted}</p>
            </div>
            <div className="text-center p-2 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">Hire Rate</p>
              <p className="font-medium">{client.hireRate}</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm">{client.description}</p>
          </div>

          <Button className="w-full" variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Client
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

