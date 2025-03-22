"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { DollarSign, Star, CheckCircle, TrendingUp } from "lucide-react"

const earningsData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1900 },
  { name: "Mar", value: 1500 },
  { name: "Apr", value: 2400 },
  { name: "May", value: 2100 },
  { name: "Jun", value: 3200 },
  { name: "Jul", value: 2800 },
]

const projectsData = [
  { name: "Jan", value: 3 },
  { name: "Feb", value: 5 },
  { name: "Mar", value: 4 },
  { name: "Apr", value: 7 },
  { name: "May", value: 6 },
  { name: "Jun", value: 9 },
  { name: "Jul", value: 8 },
]

const ratingsData = [
  { name: "Jan", value: 4.5 },
  { name: "Feb", value: 4.6 },
  { name: "Mar", value: 4.7 },
  { name: "Apr", value: 4.8 },
  { name: "May", value: 4.7 },
  { name: "Jun", value: 4.9 },
  { name: "Jul", value: 5.0 },
]

export default function StatsOverview() {
  const [period, setPeriod] = useState("monthly")

  const stats = [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+14.5%",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Completed Projects",
      value: "42",
      change: "+5.2%",
      icon: CheckCircle,
      color: "text-blue-500",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.3",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      title: "Profile Views",
      value: "1,245",
      change: "+22.4%",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p className={`text-xs mt-1 ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-2 rounded-full bg-primary/10`}>
                    <stat.icon className={`h-5 w-5 text-primary`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track your earnings, projects, and ratings over time</CardDescription>
          <Tabs defaultValue="earnings" className="mt-4">
            <TabsList>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="ratings">Ratings</TabsTrigger>
            </TabsList>
            <div className="absolute right-6 top-6">
              <TabsList>
                <TabsTrigger
                  value="monthly"
                  onClick={() => setPeriod("monthly")}
                  data-state={period === "monthly" ? "active" : ""}
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  onClick={() => setPeriod("weekly")}
                  data-state={period === "weekly" ? "active" : ""}
                >
                  Weekly
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="earnings" className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={earningsData}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorEarnings)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="projects" className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectsData}>
                    <defs>
                      <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProjects)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="ratings" className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ratingsData}>
                    <defs>
                      <linearGradient id="colorRatings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis domain={[4, 5]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#eab308" fillOpacity={1} fill="url(#colorRatings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}

