"use client"

import type React from "react"

import { type ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HolographicCardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
}

export function HolographicCard({ children, className, interactive = true }: HolographicCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return

    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    if (!interactive) return

    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden",
        "bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl",
        "border border-white/10",
        "shadow-[0_0_20px_rgba(124,58,237,0.3)]",
        className,
      )}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }}
    >
      {/* Holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 opacity-50 pointer-events-none" />

      {/* Rainbow edge effect */}
      <div className="absolute inset-0 rounded-xl p-[1px] pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 animate-[spin_6s_linear_infinite] opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

