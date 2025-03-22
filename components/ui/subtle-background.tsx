"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface SubtleBackgroundProps {
  className?: string
  intensity?: "high" | "medium" | "low"
  type?: "wave" | "grid" | "nodes"
  color?: string
}

export function SubtleBackground({
  className = "",
  intensity = "low",
  type = "wave",
  color = "rgba(124, 58, 237, 0.15)",
}: SubtleBackgroundProps) {
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

    // Intensity factors
    const intensityFactors = {
      high: 1,
      medium: 0.6,
      low: 0.3,
    }

    const intensityFactor = intensityFactors[intensity]

    // Animation loop
    let animationFrameId: number

    const renderWave = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const height = canvas.height
      const width = canvas.width

      // Wave parameters
      const amplitude = 15 * intensityFactor
      const frequency = 0.02
      const speed = 0.05

      // Draw wave
      ctx.strokeStyle = color
      ctx.lineWidth = 1

      ctx.beginPath()
      for (let x = 0; x < width; x += 10) {
        const y = height / 2 + Math.sin(x * frequency + time * speed) * amplitude
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw subtle dots
      ctx.fillStyle = color
      for (let i = 0; i < width; i += 80) {
        const y = height / 2 + Math.sin(i * frequency + time * speed) * amplitude
        const size = 1 + Math.sin(time * 0.5 + i * 0.01) * 0.5
        ctx.beginPath()
        ctx.arc(i, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const renderGrid = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const height = canvas.height
      const width = canvas.width

      // Grid parameters
      const gridSize = 40
      const dotSize = 1 * intensityFactor

      // Draw grid
      ctx.fillStyle = color

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const pulseSize = dotSize + Math.sin(time * 0.5 + x * 0.01 + y * 0.01) * dotSize * 0.5
          ctx.beginPath()
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const renderNodes = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const height = canvas.height
      const width = canvas.width

      // Nodes parameters
      const nodeCount = 20 * intensityFactor
      const nodes: { x: number; y: number; size: number; speed: number }[] = []

      // Initialize nodes if needed
      if (nodes.length === 0) {
        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.1,
          })
        }
      }

      // Draw nodes and connections
      ctx.fillStyle = color
      ctx.strokeStyle = color

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i]

        // Update position
        node.x += Math.sin(time * node.speed) * 0.5
        node.y += Math.cos(time * node.speed) * 0.5

        // Keep within bounds
        if (node.x < 0) node.x = width
        if (node.x > width) node.x = 0
        if (node.y < 0) node.y = height
        if (node.y > height) node.y = 0

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const otherNode = nodes[j]
          const distance = Math.sqrt(Math.pow(otherNode.x - node.x, 2) + Math.pow(otherNode.y - node.y, 2))

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.globalAlpha = 1 - distance / 100
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
    }

    const render = () => {
      const time = Date.now() * 0.001

      if (type === "wave") {
        renderWave(time)
      } else if (type === "grid") {
        renderGrid(time)
      } else if (type === "nodes") {
        renderNodes(time)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [intensity, color, type])

  return (
    <motion.div
      className={`absolute inset-0 opacity-50 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1.5 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

