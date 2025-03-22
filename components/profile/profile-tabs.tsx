"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="portfolio">
      <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>

      <TabsContent value="portfolio">
        <PortfolioTab />
      </TabsContent>

      <TabsContent value="experience">
        <ExperienceTab />
      </TabsContent>

      <TabsContent value="reviews">
        <ReviewsTab />
      </TabsContent>

      <TabsContent value="education">
        <EducationTab />
      </TabsContent>
    </Tabs>
  )
}

function PortfolioTab() {
  const projects = [
    {
      id: 1,
      title: "DeFi Lending Protocol",
      description:
        "Developed a decentralized lending protocol with automated interest rates and liquidation mechanisms.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Solidity", "React", "Web3.js", "DeFi"],
      link: "#",
    },
    {
      id: 2,
      title: "NFT Marketplace",
      description: "Created a marketplace for buying, selling, and trading NFTs with support for multiple blockchains.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Solidity", "Next.js", "Ethers.js", "NFT"],
      link: "#",
    },
    {
      id: 3,
      title: "DAO Governance Platform",
      description: "Built a governance platform for DAOs with proposal creation, voting, and execution functionality.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Solidity", "React", "The Graph", "DAO"],
      link: "#",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <a href={project.link} className="text-primary hover:underline flex items-center text-sm font-medium">
                  View Project <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ExperienceTab() {
  const experiences = [
    {
      id: 1,
      role: "Senior Blockchain Developer",
      company: "DeFi Innovations",
      period: "2021 - Present",
      description:
        "Leading the development of decentralized finance protocols, including lending platforms and automated market makers. Implementing smart contracts and integrating with frontend applications.",
    },
    {
      id: 2,
      role: "Smart Contract Engineer",
      company: "CryptoTech Solutions",
      period: "2019 - 2021",
      description:
        "Developed and audited smart contracts for various blockchain applications. Implemented ERC standards and created custom token contracts for clients.",
    },
    {
      id: 3,
      role: "Frontend Developer",
      company: "Web3 Ventures",
      period: "2017 - 2019",
      description:
        "Built user interfaces for decentralized applications using React and Web3.js. Integrated wallet connections and transaction signing functionality.",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{experience.role}</h3>
                  <p className="text-primary font-medium">{experience.company}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{experience.period}</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">{experience.description}</p>
                </div>
                <div className="md:text-right">
                  <Badge variant="outline" className="md:ml-auto">
                    {experience.period.split(" - ")[1] === "Present"
                      ? "Current"
                      : `${Number.parseInt(experience.period.split(" - ")[1]) - Number.parseInt(experience.period.split(" - ")[0])} years`}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ReviewsTab() {
  const reviews = [
    {
      id: 1,
      client: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "DeFi Lending Protocol",
      rating: 5,
      date: "Oct 15, 2023",
      comment:
        "John is an exceptional blockchain developer. His expertise in Solidity and DeFi protocols is impressive. He delivered the project ahead of schedule and was very communicative throughout the process.",
    },
    {
      id: 2,
      client: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "NFT Marketplace",
      rating: 5,
      date: "Sep 22, 2023",
      comment:
        "Working with John was a pleasure. He understood our requirements perfectly and implemented the NFT marketplace with all the features we needed. His code is clean and well-documented.",
    },
    {
      id: 3,
      client: {
        name: "Mike Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "Smart Contract Audit",
      rating: 4,
      date: "Aug 10, 2023",
      comment:
        "John provided a thorough audit of our smart contracts and identified several potential vulnerabilities. His recommendations helped us improve the security of our protocol significantly.",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.client.avatar} alt={review.client.name} />
                  <AvatarFallback>{review.client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{review.client.name}</h3>
                      <p className="text-sm text-primary">{review.project}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

function EducationTab() {
  const education = [
    {
      id: 1,
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      period: "2015 - 2017",
      description: "Specialized in Distributed Systems and Blockchain Technology. Thesis on 'Scalability Solutions for Ethereum-based Applications'."
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Engineering",
      institution: "MIT",
      period: "2011 - 2015",
      description: "Graduated with honors. Coursework included Data Structures, Algorithms, Computer Networks, and Cryptography."
    }
  ]
  
  const certifications = [
    {
      id: 1,
      name: "Certified Blockchain Developer",
      issuer: "Blockchain Council",
      date: "2020",
      credential: "BC-2020-12345"
    },
    {
      id: 2,
      name: "Ethereum Developer Certification",
      issuer: "ConsenSys Academy",
      date: "2019",
      credential: "ETH-DEV-9876"
    },
    {
      id: 3,
      name: "Smart Contract Security Professional",
      issuer: "OpenZeppelin",
      date: "2021",
      credential: "SCSP-2021-5432"
    }
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>\

\

