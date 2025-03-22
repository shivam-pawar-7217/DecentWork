"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatsCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  labelClassName?: string
  valueClassName?: string
}

export function StatsCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  labelClassName,
  valueClassName,
}: StatsCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <motion.div
      className={cn("flex flex-col items-center", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={cn("text-3xl font-bold", valueClassName)}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </motion.div>
      <div className={cn("text-sm text-muted-foreground mt-1", labelClassName)}>{label}</div>
    </motion.div>
  )
}

