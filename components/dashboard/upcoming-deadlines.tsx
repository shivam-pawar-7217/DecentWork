"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

const deadlines = [
  {
    id: 1,
    project: "Smart Contract Development",
    deadline: "Oct 15, 2023",
    progress: 75,
    daysLeft: 3,
  },
  {
    id: 2,
    project: "UI/UX Design for DeFi App",
    deadline: "Oct 20, 2023",
    progress: 45,
    daysLeft: 8,
  },
  {
    id: 3,
    project: "NFT Collection Creation",
    deadline: "Oct 28, 2023",
    progress: 20,
    daysLeft: 16,
  },
]

export default function UpcomingDeadlines() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {deadlines.map((deadline, index) => (
            <motion.div
              key={deadline.id}
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">{deadline.project}</h4>
                <span
                  className={`text-xs font-medium ${
                    deadline.daysLeft <= 3
                      ? "text-red-500"
                      : deadline.daysLeft <= 7
                        ? "text-amber-500"
                        : "text-green-500"
                  }`}
                >
                  {deadline.daysLeft} days left
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={deadline.progress} className="h-2" />
                <span className="text-xs font-medium">{deadline.progress}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Due {deadline.deadline}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

