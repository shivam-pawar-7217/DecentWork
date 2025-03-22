"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export default function EscrowContracts() {
  const escrows = [
    {
      id: 1,
      project: "Smart Contract Development",
      client: "Alex Johnson",
      amount: "0.8 ETH",
      value: "$2,000",
      status: "active",
      progress: 60,
      milestones: [
        { name: "Initial Design", complete: true, amount: "0.2 ETH" },
        { name: "Implementation", complete: true, amount: "0.3 ETH" },
        { name: "Testing", complete: false, amount: "0.3 ETH" },
      ],
    },
    {
      id: 2,
      project: "UI/UX Design for DeFi App",
      client: "Sarah Chen",
      amount: "0.5 ETH",
      value: "$1,250",
      status: "pending",
      progress: 0,
      milestones: [
        { name: "Wireframes", complete: false, amount: "0.2 ETH" },
        { name: "UI Design", complete: false, amount: "0.3 ETH" },
      ],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Escrow Contracts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {escrows.map((escrow, index) => (
            <motion.div
              key={escrow.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{escrow.project}</h3>
                  <p className="text-sm text-muted-foreground">Client: {escrow.client}</p>
                </div>
                <Badge
                  variant={
                    escrow.status === "active" ? "default" : escrow.status === "pending" ? "secondary" : "outline"
                  }
                >
                  {escrow.status}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Total Amount:</span>
                  <span className="font-medium">
                    {escrow.amount} ({escrow.value})
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span className="font-medium">{escrow.progress}%</span>
                </div>
                <Progress value={escrow.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Milestones:</p>
                {escrow.milestones.map((milestone, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          milestone.complete ? "bg-primary" : "border border-muted-foreground"
                        }`}
                      >
                        {milestone.complete && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary-foreground"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span className={milestone.complete ? "line-through" : ""}>{milestone.name}</span>
                    </div>
                    <span className="font-medium">{milestone.amount}</span>
                  </div>
                ))}
              </div>

              {escrow.status === "active" && (
                <div className="pt-2 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button className="flex-1">Release Funds</Button>
                </div>
              )}

              {escrow.status === "pending" && (
                <div className="pt-2">
                  <Button className="w-full">Fund Escrow</Button>
                </div>
              )}
            </motion.div>
          ))}

          <Button variant="outline" className="w-full">
            Create New Escrow
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

