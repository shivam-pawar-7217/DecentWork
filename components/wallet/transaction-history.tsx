"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      type: "received",
      amount: "0.5 ETH",
      value: "$1,250.00",
      from: "0x1a2b...3c4d",
      to: "You",
      date: "Today, 10:30 AM",
      status: "completed",
      description: "Payment for Smart Contract Development",
    },
    {
      id: 2,
      type: "sent",
      amount: "250 USDC",
      value: "$250.00",
      from: "You",
      to: "0x5e6f...7g8h",
      date: "Yesterday, 2:15 PM",
      status: "completed",
      description: "Escrow deposit for UI/UX Design",
    },
    {
      id: 3,
      type: "received",
      amount: "0.25 ETH",
      value: "$625.00",
      from: "0x9i0j...1k2l",
      to: "You",
      date: "Oct 15, 2023",
      status: "completed",
      description: "Milestone payment for NFT Collection",
    },
    {
      id: 4,
      type: "sent",
      amount: "100 LINK",
      value: "$1,100.00",
      from: "You",
      to: "0x3m4n...5o6p",
      date: "Oct 10, 2023",
      status: "pending",
      description: "Payment for Web3 Integration",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="received" className="flex-1">
                Received
              </TabsTrigger>
              <TabsTrigger value="sent" className="flex-1">
                Sent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="pt-4">
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <TransactionCard key={tx.id} transaction={tx} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="received" className="pt-4">
              <div className="space-y-4">
                {transactions
                  .filter((tx) => tx.type === "received")
                  .map((tx, index) => (
                    <TransactionCard key={tx.id} transaction={tx} index={index} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="sent" className="pt-4">
              <div className="space-y-4">
                {transactions
                  .filter((tx) => tx.type === "sent")
                  .map((tx, index) => (
                    <TransactionCard key={tx.id} transaction={tx} index={index} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TransactionCard({ transaction, index }: { transaction: any; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="w-full cursor-pointer"
        onClick={() => setFlipped(!flipped)}
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div className={`p-4 border rounded-lg ${flipped ? "absolute inset-0 backface-hidden" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "received" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
                }`}
              >
                {transaction.type === "received" ? (
                  <ArrowDownLeft className="h-5 w-5" />
                ) : (
                  <ArrowUpRight className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-medium">
                  {transaction.type === "received" ? "Received" : "Sent"} {transaction.amount}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${transaction.type === "received" ? "text-green-500" : ""}`}>
                {transaction.type === "received" ? "+" : "-"}
                {transaction.value}
              </p>
              <Badge variant={transaction.status === "completed" ? "outline" : "secondary"} className="text-xs">
                {transaction.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`p-4 border rounded-lg ${flipped ? "" : "absolute inset-0 backface-hidden"}`}
          style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Description:</p>
              <p className="text-sm font-medium">{transaction.description}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">From:</p>
              <p className="text-sm font-medium">{transaction.from}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">To:</p>
              <p className="text-sm font-medium">{transaction.to}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Transaction ID:</p>
              <div className="flex items-center gap-1">
                <p className="text-sm font-mono">0x1a2b...3c4d</p>
                <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

