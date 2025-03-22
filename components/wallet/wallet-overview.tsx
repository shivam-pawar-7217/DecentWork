"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"

export default function WalletOverview() {
  const [showBalance, setShowBalance] = useState(true)
  const [copiedAddress, setCopiedAddress] = useState(false)

  const walletAddress = "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t"
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Wallet Overview</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Wallet Address</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="font-mono text-xs py-1 px-2">
                    {shortAddress}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyAddress}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                {copiedAddress && <p className="text-xs text-primary mt-1">Address copied to clipboard!</p>}
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <h2 className="text-3xl font-bold">{showBalance ? "$12,450.85" : "••••••••"}</h2>
              </div>
            </div>

            <Tabs defaultValue="tokens">
              <TabsList className="w-full">
                <TabsTrigger value="tokens" className="flex-1">
                  Tokens
                </TabsTrigger>
                <TabsTrigger value="nfts" className="flex-1">
                  NFTs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tokens" className="pt-4">
                <div className="space-y-4">
                  {[
                    { name: "Ethereum", symbol: "ETH", balance: "3.45", value: "$8,625.00", change: "+2.3%" },
                    { name: "USD Coin", symbol: "USDC", balance: "2,500.00", value: "$2,500.00", change: "0.0%" },
                    { name: "Chainlink", symbol: "LINK", balance: "120.5", value: "$1,325.85", change: "-1.2%" },
                  ].map((token, index) => (
                    <motion.div
                      key={token.symbol}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{token.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{token.name}</p>
                          <p className="text-xs text-muted-foreground">{token.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{showBalance ? token.balance : "•••••"}</p>
                        <div className="flex items-center justify-end gap-1">
                          <p className="text-sm">{showBalance ? token.value : "•••••"}</p>
                          <span
                            className={`text-xs ${
                              token.change.startsWith("+")
                                ? "text-green-500"
                                : token.change.startsWith("-")
                                  ? "text-red-500"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {token.change}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nfts" className="pt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((nft) => (
                    <motion.div
                      key={nft}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: nft * 0.1 }}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="aspect-square bg-muted">
                        <img
                          src={`/placeholder.svg?height=200&width=200`}
                          alt={`NFT ${nft}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium truncate">CryptoFreelance #{nft}</p>
                        <p className="text-xs text-muted-foreground">Collected 2 months ago</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

