"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface DigitalWaveProps {
  className?: string
  intensity?: "high" | "medium" | "low"
  color?: string
}

export function DigitalWave({
  className = "",
  intensity = "medium",
  color = "rgba(124, 58, 237, 0.3)",
}: DigitalWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Wave parameters
    const intensityFactors = {
      high: 1,
      medium: 0.6,
      low: 0.3,
    }

    const intensityFactor = intensityFactors[intensity]
    const waves = [
      { amplitude: 15 * intensityFactor, frequency: 0.02, speed: 0.05, phase: 0 },
      { amplitude: 10 * intensityFactor, frequency: 0.03, speed: 0.03, phase: 2 },
      { amplitude: 5 * intensityFactor, frequency: 0.05, speed: 0.07, phase: 4 },
    ]

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001
      const height = canvas.height
      const width = canvas.width

      // Draw waves
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      waves.forEach((wave, index) => {
        ctx.beginPath()

        for (let x = 0; x < width; x += 5) {
          const y = height / 2 + Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      })

      // Draw data points
      ctx.fillStyle = color
      for (let i = 0; i < width; i += 40) {
        const randomHeight = Math.random() * 20 * intensityFactor
        ctx.fillRect(i, height / 2 - randomHeight / 2, 2, randomHeight)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [intensity, color])

  return (
    <motion.div
      className={`absolute inset-0 opacity-70 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1.5 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ filter: "blur(1px)" }} />
    </motion.div>
  )
}

