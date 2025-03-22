import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PremiumCard } from "@/components/ui/premium-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { DollarSign, Star, CheckCircle, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Send, Download } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated: Today at 9:45 AM</span>
          <Button variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
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
            color: "text-primary",
          },
        ].map((stat, index) => (
          <PremiumCard key={index} className="overflow-hidden">
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
          </PremiumCard>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PremiumCard>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    title: "Smart Contract Development",
                    client: "Alex Johnson",
                    deadline: "Oct 15, 2023",
                    progress: 75,
                    daysLeft: 3,
                  },
                  {
                    title: "UI/UX Design for DeFi App",
                    client: "Sarah Chen",
                    deadline: "Oct 20, 2023",
                    progress: 45,
                    daysLeft: 8,
                  },
                  {
                    title: "NFT Collection Creation",
                    client: "Mike Rivera",
                    deadline: "Oct 28, 2023",
                    progress: 20,
                    daysLeft: 16,
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className="space-y-2 p-4 border border-white/5 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{project.title}</h4>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          project.daysLeft <= 3
                            ? "bg-red-500/10 text-red-500"
                            : project.daysLeft <= 7
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-green-500/10 text-green-500"
                        }`}
                      >
                        {project.daysLeft} days left
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2 flex-1" />
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Due {project.deadline}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </PremiumCard>
        </div>

        <div className="space-y-6">
          <PremiumCard>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              {[
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
                  color: "bg-primary",
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
              ].map((action, index) => (
                <Link key={index} href={action.href}>
                  <PremiumButton
                    variant="outline"
                    className="w-full justify-start h-auto py-3 px-4 hover:border-primary"
                  >
                    <div className={`${action.color} p-2 rounded-full mr-3`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </PremiumButton>
                </Link>
              ))}
            </CardContent>
          </PremiumCard>

          <PremiumCard>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "proposal",
                    title: "Your proposal was accepted",
                    project: "Smart Contract Development",
                    time: "2 hours ago",
                    status: "success",
                  },
                  {
                    type: "payment",
                    title: "Payment received",
                    project: "UI/UX Design for DeFi App",
                    time: "Yesterday",
                    amount: "$350",
                    status: "success",
                  },
                  {
                    type: "message",
                    title: "New message received",
                    project: "NFT Collection Creation",
                    time: "2 days ago",
                    status: "info",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-3 border border-white/5 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-lg font-bold">{activity.type.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            activity.status === "success"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.project}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        {activity.amount && (
                          <span className="text-sm font-medium text-green-500">{activity.amount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/dashboard/activity">
                  <PremiumButton variant="ghost" className="w-full mt-2">
                    View All Activity
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PremiumButton>
                </Link>
              </div>
            </CardContent>
          </PremiumCard>
        </div>
      </div>
    </div>
  )
}

