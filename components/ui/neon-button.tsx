"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeonButtonProps {
  children: ReactNode
  className?: string
  glowColor?: string
  onClick?: () => void
  disabled?: boolean
  variant?: "default" | "outline" | "ghost"
}

export function NeonButton({
  children,
  className,
  glowColor = "rgba(124, 58, 237, 0.5)",
  onClick,
  disabled = false,
  variant = "default",
}: NeonButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantStyles = {
    default: "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600",
    outline: "bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500/10",
    ghost: "bg-transparent hover:bg-purple-500/10 text-purple-500",
  }

  return (
    <motion.button
      className={cn(baseStyles, variantStyles[variant], "h-10 px-4 py-2", className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        boxShadow: variant !== "ghost" ? `0 0 15px ${glowColor}` : undefined,
      }}
    >
      {/* Glow effect */}
      <span className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-sm" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

