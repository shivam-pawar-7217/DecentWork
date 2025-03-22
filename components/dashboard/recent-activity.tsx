"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const activities = [
  {
    id: 1,
    type: "proposal",
    title: "Your proposal was accepted",
    project: "Smart Contract Development",
    time: "2 hours ago",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "success",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    project: "UI/UX Design for DeFi App",
    time: "Yesterday",
    amount: "$350",
    status: "success",
  },
  {
    id: 3,
    type: "message",
    title: "New message received",
    project: "NFT Collection Creation",
    time: "2 days ago",
    user: {
      name: "Mike Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "info",
  },
  {
    id: 4,
    type: "review",
    title: "New review received",
    project: "Web3 Frontend Development",
    time: "3 days ago",
    rating: 5,
    user: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "success",
  },
  {
    id: 5,
    type: "milestone",
    title: "Milestone completed",
    project: "Solidity Code Audit",
    time: "1 week ago",
    status: "success",
  },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {activity.user && (
                <Avatar>
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              {!activity.user && (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-lg font-bold">{activity.type.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <Badge
                    variant={
                      activity.status === "success" ? "default" : activity.status === "info" ? "secondary" : "outline"
                    }
                  >
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.project}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  {activity.amount && <span className="text-sm font-medium text-green-500">{activity.amount}</span>}
                  {activity.rating && (
                    <div className="flex items-center">
                      {[...Array(activity.rating)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

