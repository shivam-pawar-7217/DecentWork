"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GlitchEffectProps {
  className?: string
  intensity?: "high" | "medium" | "low"
  children: React.ReactNode
}

export function GlitchEffect({ className = "", intensity = "medium", children }: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Intensity factors
    const intensityFactors = {
      high: { interval: [1000, 3000], duration: [100, 300], probability: 0.7 },
      medium: { interval: [2000, 5000], duration: [50, 200], probability: 0.5 },
      low: { interval: [5000, 10000], duration: [30, 100], probability: 0.3 },
    }

    const factor = intensityFactors[intensity]

    // Random glitch effect
    const glitchInterval = setInterval(
      () => {
        if (Math.random() < factor.probability) {
          // Random offset
          setGlitchOffset({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
          })

          setIsGlitching(true)

          // Random duration
          const duration = Math.random() * (factor.duration[1] - factor.duration[0]) + factor.duration[0]

          setTimeout(() => {
            setIsGlitching(false)
          }, duration)
        }
      },
      Math.random() * (factor.interval[1] - factor.interval[0]) + factor.interval[0],
    )

    return () => clearInterval(glitchInterval)
  }, [intensity])

  return (
    <div className={`relative ${className}`}>
      {/* Original content */}
      <div className={isGlitching ? "opacity-0" : "opacity-100"}>{children}</div>

      {/* Glitch layers */}
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.div
              className="absolute inset-0 text-[#ff00ea] opacity-70 mix-blend-screen"
              initial={{ x: 0, y: 0 }}
              animate={{ x: glitchOffset.x, y: glitchOffset.y }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>

            <motion.div
              className="absolute inset-0 text-[#00ffff] opacity-70 mix-blend-screen"
              initial={{ x: 0, y: 0 }}
              animate={{ x: -glitchOffset.x, y: -glitchOffset.y }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-white opacity-5 mix-blend-overlay"
              animate={{
                opacity: [0.05, 0.1, 0.05],
                transition: { duration: 0.1, repeat: 3 },
              }}
              exit={{ opacity: 0 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

