"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Send, Download } from "lucide-react"
import { motion } from "framer-motion"

export default function QuickActions() {
  const actions = [
    {
      title: "Post a Job",
      description: "Create a new job listing",
      icon: PlusCircle,
      color: "bg-blue-500",
      href: "/dashboard/jobs/create",
    },
    {
      title: "Find Work",
      description: "Browse available jobs",
      icon: Search,
      color: "bg-purple-500",
      href: "/dashboard/jobs",
    },
    {
      title: "Send Proposal",
      description: "Apply to open positions",
      icon: Send,
      color: "bg-green-500",
      href: "/dashboard/proposals",
    },
    {
      title: "Withdraw Funds",
      description: "Transfer to your wallet",
      icon: Download,
      color: "bg-amber-500",
      href: "/dashboard/wallet/withdraw",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button variant="outline" className="w-full justify-start h-auto py-3 px-4 hover:border-primary" asChild>
              <a href={action.href}>
                <div className={`${action.color} p-2 rounded-full mr-3`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </a>
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}

