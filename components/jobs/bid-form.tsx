"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function BidForm({ id }: { id: string }) {
  const [bidAmount, setBidAmount] = useState(4000)
  const [deliveryTime, setDeliveryTime] = useState(14)
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bid-amount">Your Bid Amount</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="bid-amount"
                  min={3000}
                  max={5000}
                  step={100}
                  value={[bidAmount]}
                  onValueChange={(value) => setBidAmount(value[0])}
                  className="flex-1"
                />
                <div className="w-24">
                  <Input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="text-right"
                    min={3000}
                    max={5000}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Client's budget: $3,000 - $5,000</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery-time">Delivery Time (Days)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="delivery-time"
                  min={7}
                  max={21}
                  step={1}
                  value={[deliveryTime]}
                  onValueChange={(value) => setDeliveryTime(value[0])}
                  className="flex-1"
                />
                <div className="w-24">
                  <Input
                    type="number"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(Number(e.target.value))}
                    className="text-right"
                    min={7}
                    max={21}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Client's expected timeline: 14-21 days</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover-letter">Cover Letter</Label>
              <Textarea
                id="cover-letter"
                placeholder="Introduce yourself and explain why you're the best fit for this project..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Highlight your relevant experience and skills. Be specific about how you can help the client.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments (Optional)</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                <Button variant="outline" className="mt-2">
                  Browse Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Max file size: 10MB. Supported formats: PDF, DOC, DOCX, PNG, JPG
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

