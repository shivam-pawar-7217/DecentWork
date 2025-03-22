"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassmorphismCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  hoverEffect?: boolean
  glitchEffect?: boolean
}

export function GlassmorphismCard({
  children,
  className,
  glowColor = "rgba(124, 58, 237, 0.5)",
  hoverEffect = true,
  glitchEffect = false,
}: GlassmorphismCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl",
        "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
        hoverEffect && "hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all duration-300",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: `0 0 20px ${glowColor}`,
      }}
      whileHover={hoverEffect ? { scale: 1.02 } : undefined}
    >
      {glitchEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 bg-white/5"
          animate={{
            opacity: [0, 0.2, 0],
            x: [0, -2, 0, 2, 0],
            transition: {
              opacity: { duration: 0.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: Math.random() * 5 + 3 },
              x: { duration: 0.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: Math.random() * 5 + 3 },
            },
          }}
        />
      )}

      {/* Neon border effect */}
      <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none" />

      {children}
    </motion.div>
  )
}

