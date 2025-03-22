"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, DollarSign, MapPin, Calendar, Bookmark, Share2 } from "lucide-react"
import { motion } from "framer-motion"

export default function JobDetails({ id }: { id: string }) {
  const [saved, setSaved] = useState(false)

  // This would normally come from an API
  const job = {
    id: Number.parseInt(id),
    title: "Smart Contract Developer for DeFi Protocol",
    description:
      "We're looking for an experienced Solidity developer to help build our decentralized finance protocol. You'll be responsible for designing and implementing smart contracts for lending, borrowing, and yield farming.",
    longDescription: `
      <p>Our DeFi protocol aims to revolutionize the way users interact with decentralized finance. We're building a comprehensive platform that includes lending, borrowing, yield farming, and liquidity provision.</p>
      
      <p>As a Smart Contract Developer, you will:</p>
      <ul>
        <li>Design and implement secure, gas-efficient smart contracts</li>
        <li>Collaborate with our frontend team to integrate contracts with the UI</li>
        <li>Conduct thorough testing and debugging of smart contracts</li>
        <li>Optimize contracts for gas efficiency and security</li>
        <li>Stay up-to-date with the latest developments in the DeFi space</li>
      </ul>
      
      <p>The ideal candidate has:</p>
      <ul>
        <li>2+ years of experience with Solidity development</li>
        <li>Deep understanding of ERC standards and DeFi protocols</li>
        <li>Experience with testing frameworks like Hardhat and Truffle</li>
        <li>Knowledge of security best practices in smart contract development</li>
        <li>Familiarity with frontend integration using ethers.js or web3.js</li>
      </ul>
    `,
    budget: "$3,000 - $5,000",
    duration: "2-3 weeks",
    location: "Remote",
    postedAt: "2 hours ago",
    deadline: "Oct 30, 2023",
    skills: ["Solidity", "Ethereum", "DeFi", "Smart Contracts", "Web3.js", "Hardhat"],
    attachments: [
      { name: "project_requirements.pdf", size: "1.2 MB" },
      { name: "technical_specifications.docx", size: "845 KB" },
    ],
    proposals: 12,
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{job.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Posted {job.postedAt}
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {job.budget}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Due by {job.deadline}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSaved(!saved)}
              className={saved ? "text-primary" : ""}
            >
              <Bookmark className={`h-5 w-5 ${saved ? "fill-primary" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="description">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: job.longDescription }} />

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requirements">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Project Scope</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      The project involves developing a suite of smart contracts for a DeFi protocol that includes
                      lending, borrowing, and yield farming functionalities. The contracts should be secure,
                      gas-efficient, and thoroughly tested.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Technical Requirements</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Smart contracts must be written in Solidity 0.8.x</li>
                      <li>Must include comprehensive test coverage using Hardhat</li>
                      <li>Should implement proper access control mechanisms</li>
                      <li>Must follow best practices for gas optimization</li>
                      <li>Should include detailed documentation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Deliverables</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Complete source code for all smart contracts</li>
                      <li>Comprehensive test suite</li>
                      <li>Deployment scripts for various networks</li>
                      <li>Technical documentation</li>
                      <li>Security audit report</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Timeline</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Week 1: Initial design and architecture</li>
                      <li>Week 2: Implementation of core contracts</li>
                      <li>Week 3: Testing, optimization, and documentation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="attachments">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  The client has provided the following attachments for this project:
                </p>
                <div className="space-y-2">
                  {job.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                          <span className="text-primary font-medium">
                            {attachment.name.split(".").pop()?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Proposals: </span>
                <span className="font-medium">{job.proposals}</span>
              </div>
              <Button>Apply Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

