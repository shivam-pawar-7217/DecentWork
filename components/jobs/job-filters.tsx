"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export default function JobFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    rating: true,
    skills: true,
  })

  const categories = [
    { id: "blockchain", label: "Blockchain" },
    { id: "design", label: "Design" },
    { id: "development", label: "Development" },
    { id: "nft", label: "NFT" },
    { id: "security", label: "Security" },
    { id: "consulting", label: "Consulting" },
  ]

  const skills = [
    { id: "solidity", label: "Solidity" },
    { id: "react", label: "React" },
    { id: "nextjs", label: "Next.js" },
    { id: "typescript", label: "TypeScript" },
    { id: "figma", label: "Figma" },
    { id: "web3", label: "Web3.js" },
    { id: "ethers", label: "Ethers.js" },
    { id: "hardhat", label: "Hardhat" },
  ]

  const ratings = [
    { id: "5", label: "5 Stars" },
    { id: "4", label: "4+ Stars" },
    { id: "3", label: "3+ Stars" },
  ]

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Collapsible open={expanded.category} onOpenChange={(open) => setExpanded({ ...expanded, category: open })}>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h3 className="text-sm font-medium">Categories</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded.category ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={`category-${category.id}`} />
                <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={expanded.price} onOpenChange={(open) => setExpanded({ ...expanded, price: open })}>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h3 className="text-sm font-medium">Price Range</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded.price ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div className="space-y-4">
              <Slider defaultValue={[0, 5000]} max={5000} step={100} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <Badge variant="outline">${priceRange[0]}</Badge>
                <Badge variant="outline">${priceRange[1]}</Badge>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={expanded.rating} onOpenChange={(open) => setExpanded({ ...expanded, rating: open })}>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h3 className="text-sm font-medium">Freelancer Rating</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded.rating ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {ratings.map((rating) => (
              <div key={rating.id} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating.id}`} />
                <Label htmlFor={`rating-${rating.id}`} className="text-sm cursor-pointer">
                  {rating.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={expanded.skills} onOpenChange={(open) => setExpanded({ ...expanded, skills: open })}>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h3 className="text-sm font-medium">Skills</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded.skills ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  {skill.label}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="pt-4 space-y-2">
          <Button className="w-full">Apply Filters</Button>
          <Button variant="outline" className="w-full">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

