"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownLeft, Plus, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function WalletActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deposit">
            <TabsList className="w-full">
              <TabsTrigger value="deposit" className="flex-1">
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="flex-1">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Withdraw
              </TabsTrigger>
              <TabsTrigger value="buy" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Buy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deposit-token">Token</Label>
                <Select defaultValue="eth">
                  <SelectTrigger id="deposit-token">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                    <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                    <SelectItem value="link">Chainlink (LINK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deposit-network">Network</Label>
                <Select defaultValue="ethereum">
                  <SelectTrigger id="deposit-network">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2 space-y-2">
                <p className="text-sm font-medium">Your deposit address:</p>
                <div className="p-3 bg-muted rounded-md font-mono text-xs break-all">
                  0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
                </div>
                <p className="text-xs text-muted-foreground">
                  Only send Ethereum (ETH) to this address. Sending any other asset may result in permanent loss.
                </p>
              </div>

              <Button className="w-full">
                <ArrowRight className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
            </TabsContent>

            <TabsContent value="withdraw" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdraw-token">Token</Label>
                <Select defaultValue="eth">
                  <SelectTrigger id="withdraw-token">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                    <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                    <SelectItem value="link">Chainlink (LINK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount</Label>
                <div className="flex items-center gap-2">
                  <Input id="withdraw-amount" placeholder="0.00" type="number" />
                  <Button variant="outline" size="sm">
                    Max
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Available: 3.45 ETH</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdraw-address">Recipient Address</Label>
                <Input id="withdraw-address" placeholder="0x..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdraw-network">Network</Label>
                <Select defaultValue="ethereum">
                  <SelectTrigger id="withdraw-network">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Withdraw Funds</Button>
            </TabsContent>

            <TabsContent value="buy" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buy-token">I want to buy</Label>
                <Select defaultValue="eth">
                  <SelectTrigger id="buy-token">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                    <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                    <SelectItem value="link">Chainlink (LINK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buy-amount">Amount</Label>
                <Input id="buy-amount" placeholder="0.00" type="number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buy-with">Pay with</Label>
                <Select defaultValue="card">
                  <SelectTrigger id="buy-with">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <div className="flex justify-between text-sm">
                  <span>Estimated cost:</span>
                  <span className="font-medium">$1,250.00</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Fee:</span>
                  <span>$25.00 (2%)</span>
                </div>
              </div>

              <Button className="w-full">Continue to Payment</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

