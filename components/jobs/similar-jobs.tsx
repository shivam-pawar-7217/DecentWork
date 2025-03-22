"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function SimilarJobs() {
  // This would normally come from an API
  const similarJobs = [
    {
      id: 5,
      title: "Solidity Developer for NFT Marketplace",
      budget: "$2,500 - $4,000",
      postedAt: "1 day ago",
      skills: ["Solidity", "NFT", "ERC-721"],
    },
    {
      id: 6,
      title: "Smart Contract Auditor",
      budget: "$3,500 - $5,500",
      postedAt: "3 days ago",
      skills: ["Security", "Solidity", "Auditing"],
    },
    {
      id: 7,
      title: "DeFi Protocol Engineer",
      budget: "$4,000 - $6,000",
      postedAt: "5 days ago",
      skills: ["DeFi", "Solidity", "Web3"],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Similar Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {similarJobs.map((job, index) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <div className="p-3 border rounded-md hover:border-primary hover:bg-muted/50 transition-colors">
                <h3 className="font-medium line-clamp-1">{job.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {job.budget}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {job.postedAt}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.skills.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

