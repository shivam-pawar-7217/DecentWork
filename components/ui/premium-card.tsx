"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PremiumCardProps {
  children: ReactNode
  className?: string
  glowIntensity?: "none" | "low" | "medium" | "high"
  hoverEffect?: boolean
  onClick?: () => void
}

export function PremiumCard({
  children,
  className,
  glowIntensity = "low",
  hoverEffect = true,
  onClick,
}: PremiumCardProps) {
  const glowClasses = {
    none: "",
    low: "shadow-[0_0_10px_rgba(124,58,237,0.1)]",
    medium: "shadow-[0_0_15px_rgba(124,58,237,0.2)]",
    high: "shadow-[0_0_20px_rgba(124,58,237,0.3)]",
  }

  return (
    <motion.div
      className={cn(
        "relative rounded-xl border border-white/5 bg-card/80 backdrop-blur-sm",
        glowClasses[glowIntensity],
        "transition-all duration-300",
        hoverEffect && "hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:border-white/10",
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverEffect ? { y: -5 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

