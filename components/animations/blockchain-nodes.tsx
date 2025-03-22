"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface BlockchainNodesProps {
  className?: string
  nodeCount?: number
  intensity?: "high" | "medium" | "low"
  primaryColor?: string
  secondaryColor?: string
}

export function BlockchainNodes({
  className = "",
  nodeCount = 30,
  intensity = "medium",
  primaryColor = "rgba(124, 58, 237, 0.8)",
  secondaryColor = "rgba(59, 130, 246, 0.8)",
}: BlockchainNodesProps) {
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

    // Create nodes
    const nodes: {
      x: number
      y: number
      size: number
      speed: number
      connections: number[]
      color: string
      pulsePhase: number
      pulseSpeed: number
    }[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (Math.random() * 3 + 2) * intensityFactor,
        speed: (Math.random() * 0.5 + 0.1) * intensityFactor,
        connections: [],
        color: Math.random() > 0.5 ? primaryColor : secondaryColor,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.01,
      })
    }

    // Create connections
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * nodeCount)
        if (target !== i && !node.connections.includes(target)) {
          node.connections.push(target)
        }
      }
    })

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Update node positions
      nodes.forEach((node) => {
        node.x += Math.sin(time * node.speed) * 0.5
        node.y += Math.cos(time * node.speed) * 0.5

        // Keep nodes within canvas
        if (node.x < 0) node.x = canvas.width
        if (node.x > canvas.width) node.x = 0
        if (node.y < 0) node.y = canvas.height
        if (node.y > canvas.height) node.y = 0
      })

      // Draw connections
      ctx.lineWidth = 1

      nodes.forEach((node, i) => {
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex]
          const distance = Math.sqrt(Math.pow(target.x - node.x, 2) + Math.pow(target.y - node.y, 2))

          // Only draw connections within a certain distance
          if (distance < 150) {
            const opacity = 1 - distance / 150
            ctx.strokeStyle = node.color.replace("0.8", `${opacity * 0.5}`)

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(target.x, target.y)
            ctx.stroke()

            // Draw data packet traveling along the connection
            const packetPosition = (time % 3) / 3
            const packetX = node.x + (target.x - node.x) * packetPosition
            const packetY = node.y + (target.y - node.y) * packetPosition

            ctx.fillStyle = node.color
            ctx.beginPath()
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        // Pulse effect
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.5 + 0.5
        const size = node.size * (1 + pulse * 0.5)

        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3)
        gradient.addColorStop(0, node.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Node
        ctx.fillStyle = node.color
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [nodeCount, intensity, primaryColor, secondaryColor])

  return (
    <motion.div
      className={`absolute inset-0 opacity-80 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 1.5 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

