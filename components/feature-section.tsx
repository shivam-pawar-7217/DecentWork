"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Zap, Lock, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Escrow",
    description: "Smart contract escrow ensures your funds are safe until work is completed and approved.",
  },
  {
    icon: Zap,
    title: "Fast Payments",
    description: "Get paid instantly when work is approved, with no intermediaries or delays.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Your data is encrypted and your identity is protected on our decentralized platform.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Connect with clients and freelancers from anywhere in the world without restrictions.",
  },
]

export default function FeatureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section className="container mx-auto px-4 py-24" ref={ref}>
      <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our Platform</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

