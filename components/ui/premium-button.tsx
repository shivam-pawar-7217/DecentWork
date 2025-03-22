"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PremiumButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  asChild?: boolean
  glowIntensity?: "none" | "low" | "medium" | "high"
}

export function PremiumButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  disabled = false,
  type = "button",
  asChild = false,
  glowIntensity = "low",
}: PremiumButtonProps) {
  const glowClasses = {
    none: "",
    low: "shadow-[0_0_10px_rgba(124,58,237,0.1)]",
    medium: "shadow-[0_0_15px_rgba(124,58,237,0.2)]",
    high: "shadow-[0_0_20px_rgba(124,58,237,0.3)]",
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={glowClasses[glowIntensity]}>
      <Button
        className={cn(
          "relative overflow-hidden",
          variant === "default" && "bg-gradient-to-r from-primary to-primary/80",
          className,
        )}
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        type={type}
        asChild={asChild}
      >
        {children}
      </Button>
    </motion.div>
  )
}

