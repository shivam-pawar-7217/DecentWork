"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, PerspectiveCamera, Html } from "@react-three/drei"
import { type Group, Vector3, type Mesh, Color, DoubleSide, AdditiveBlending } from "three"
import { gsap } from "gsap"

// City grid component
function CityGrid({ size = 20, cellSize = 1, height = 2 }) {
  const gridRef = useRef<Group>(null)
  const buildings = useRef<{ position: Vector3; height: number; color: Color }[]>([])

  // Initialize buildings
  useEffect(() => {
    buildings.current = []
    for (let x = -size / 2; x < size / 2; x++) {
      for (let z = -size / 2; z < size / 2; z++) {
        // Skip some buildings for roads
        if ((x % 5 === 0 || z % 5 === 0) && Math.random() > 0.3) continue

        // Create buildings with varying heights
        const buildingHeight = Math.random() * height + 0.5
        const hue = 260 + Math.random() * 60 // Purple to blue hues
        const saturation = 0.6 + Math.random() * 0.4
        const lightness = 0.4 + Math.random() * 0.3

        buildings.current.push({
          position: new Vector3(x * cellSize, 0, z * cellSize),
          height: buildingHeight,
          color: new Color().setHSL(hue / 360, saturation, lightness),
        })
      }
    }
  }, [size, cellSize, height])

  useFrame((state) => {
    if (gridRef.current) {
      // Slow rotation for the entire city
      gridRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={gridRef} position={[0, -5, 0]}>
      {/* Base grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[size * cellSize, size * cellSize, size, size]} />
        <meshStandardMaterial color="#1a1a2e" wireframe emissive="#6a26cd" emissiveIntensity={0.2} />
      </mesh>

      {/* Buildings */}
      {buildings.current.map((building, i) => (
        <mesh key={i} position={[building.position.x, building.height / 2, building.position.z]}>
          <boxGeometry args={[cellSize * 0.8, building.height, cellSize * 0.8]} />
          <meshStandardMaterial
            color={building.color}
            emissive={building.color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Blockchain nodes component
function BlockchainNodes({ count = 50, radius = 15 }) {
  const group = useRef<Group>(null)
  const nodes = useRef<Vector3[]>([])
  const connections = useRef<{ from: number; to: number; strength: number }[]>([])
  const nodesRef = useRef<Mesh[]>([])

  // Initialize node positions and connections
  useEffect(() => {
    nodes.current = Array(count)
      .fill(0)
      .map(() => {
        return new Vector3(
          (Math.random() - 0.5) * radius * 2,
          (Math.random() - 0.5) * radius,
          (Math.random() - 0.5) * radius * 2,
        )
      })

    // Create connections between nodes
    connections.current = []
    for (let i = 0; i < count; i++) {
      // Connect to 2-4 other nodes
      const connectionCount = Math.floor(Math.random() * 3) + 2
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * count)
        if (target !== i) {
          connections.current.push({
            from: i,
            to: target,
            strength: Math.random() * 0.5 + 0.5,
          })
        }
      }
    }
  }, [count, radius])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Animate nodes
    nodesRef.current.forEach((node, i) => {
      if (node) {
        // Subtle floating motion
        node.position.y += Math.sin(time * 0.5 + i) * 0.002

        // Pulse effect
        const scale = 0.8 + Math.sin(time * 0.5 + i * 0.5) * 0.2
        node.scale.set(scale, scale, scale)

        // Color pulse
        if (node.material) {
          const material = node.material as any
          material.emissiveIntensity = 0.5 + Math.sin(time + i) * 0.3
        }
      }
    })
  })

  return (
    <group ref={group}>
      {/* Nodes */}
      {nodes.current.map((position, i) => (
        <mesh key={`node-${i}`} position={position} ref={(el) => (nodesRef.current[i] = el as Mesh)}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#3b82f6" : "#10b981"}
            emissive={i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#3b82f6" : "#10b981"}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Connections */}
      {connections.current.map((connection, i) => {
        const start = nodes.current[connection.from]
        const end = nodes.current[connection.to]

        return (
          <line key={`connection-${i}`}>
            <bufferGeometry attach="geometry" setFromPoints={[start, end]} />
            <lineBasicMaterial
              attach="material"
              color={connection.from % 3 === 0 ? "#7c3aed" : connection.from % 3 === 1 ? "#3b82f6" : "#10b981"}
              opacity={0.3 * connection.strength}
              transparent
              linewidth={1}
              blending={AdditiveBlending}
            />
          </line>
        )
      })}
    </group>
  )
}

// Digital waves component
function DigitalWaves() {
  const mesh = useRef<Mesh>(null)
  const { viewport } = useThree()

  useFrame(({ clock }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime()
      mesh.current.material = mesh.current.material as any

      // Animate wave pattern
      mesh.current.rotation.x = Math.sin(time * 0.2) * 0.1
      mesh.current.rotation.z = Math.cos(time * 0.1) * 0.1

      // Update shader uniforms if using shader material
      if ((mesh.current.material as any).uniforms) {
        ;(mesh.current.material as any).uniforms.time.value = time
      }
    }
  })

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2, 32, 32]} />
      <meshStandardMaterial
        color="#1a1a2e"
        wireframe
        emissive="#6a26cd"
        emissiveIntensity={0.3}
        side={DoubleSide}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

// Floating holographic elements
function HolographicElements() {
  const group = useRef<Group>(null)
  const elements = [
    { type: "profile", position: new Vector3(-5, 2, -3), rotation: [0.2, 0.5, 0] },
    { type: "contract", position: new Vector3(6, 1, -2), rotation: [-0.1, -0.3, 0.1] },
    { type: "transaction", position: new Vector3(0, 3, -5), rotation: [0.3, 0, -0.2] },
    { type: "profile", position: new Vector3(-3, 0, 4), rotation: [0, 0.7, 0.1] },
    { type: "contract", position: new Vector3(4, -1, 3), rotation: [-0.2, -0.4, 0] },
  ]

  useFrame(({ clock }) => {
    if (group.current) {
      const time = clock.getElapsedTime()

      // Animate the group
      group.current.rotation.y = Math.sin(time * 0.1) * 0.1

      // Animate individual elements
      group.current.children.forEach((child, i) => {
        child.position.y += Math.sin(time * 0.5 + i) * 0.002
        child.rotation.z = Math.sin(time * 0.3 + i * 0.5) * 0.05

        // Fade in/out effect
        const opacity = 0.5 + Math.sin(time * 0.2 + i * 0.7) * 0.3
        if (child.children[0] && (child.children[0] as any).material) {
          ;(child.children[0] as any).material.opacity = opacity
        }
      })
    }
  })

  return (
    <group ref={group}>
      {elements.map((element, i) => (
        <group key={i} position={element.position} rotation={element.rotation as any}>
          <Html
            transform
            distanceFactor={10}
            position={[0, 0, 0]}
            style={{
              width: "300px",
              height: "200px",
              background: "rgba(26, 26, 46, 0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(124, 58, 237, 0.5)",
              borderRadius: "10px",
              padding: "15px",
              color: "white",
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
              opacity: 0.8,
              pointerEvents: "none",
            }}
          >
            {element.type === "profile" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(45deg, #7c3aed, #3b82f6)",
                      marginRight: "10px",
                    }}
                  ></div>
                  <div>
                    <div style={{ fontWeight: "bold" }}>Alex Crypto</div>
                    <div style={{ fontSize: "12px", opacity: 0.7 }}>Blockchain Developer</div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", marginBottom: "5px" }}>
                  <span style={{ color: "#10b981" }}>★★★★★</span> 5.0 (32 reviews)
                </div>
                <div style={{ fontSize: "12px", display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}>
                  <span
                    style={{
                      background: "rgba(124, 58, 237, 0.2)",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      fontSize: "10px",
                    }}
                  >
                    Solidity
                  </span>
                  <span
                    style={{
                      background: "rgba(59, 130, 246, 0.2)",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      fontSize: "10px",
                    }}
                  >
                    Smart Contracts
                  </span>
                  <span
                    style={{
                      background: "rgba(16, 185, 129, 0.2)",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      fontSize: "10px",
                    }}
                  >
                    DeFi
                  </span>
                </div>
              </div>
            )}

            {element.type === "contract" && (
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#7c3aed",
                  }}
                >
                  Smart Contract
                </div>
                <div style={{ fontSize: "12px", marginBottom: "5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Contract ID:</span>
                    <span style={{ fontFamily: "monospace" }}>0x71C...9E3F</span>
                  </div>
                </div>
                <div style={{ fontSize: "12px", marginBottom: "5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Value:</span>
                    <span>2.5 ETH</span>
                  </div>
                </div>
                <div style={{ fontSize: "12px", marginBottom: "5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Status:</span>
                    <span style={{ color: "#10b981" }}>Active</span>
                  </div>
                </div>
                <div
                  style={{
                    height: "5px",
                    background: "rgba(124, 58, 237, 0.2)",
                    borderRadius: "3px",
                    marginTop: "15px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "65%",
                      background: "linear-gradient(90deg, #7c3aed, #3b82f6)",
                      borderRadius: "3px",
                    }}
                  ></div>
                </div>
                <div style={{ fontSize: "10px", textAlign: "right", marginTop: "5px" }}>65% Complete</div>
              </div>
            )}

            {element.type === "transaction" && (
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#3b82f6",
                  }}
                >
                  Transaction
                </div>
                <div style={{ fontSize: "12px", marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Hash:</span>
                    <span style={{ fontFamily: "monospace" }}>0x8F2...7B1D</span>
                  </div>
                </div>
                <div style={{ fontSize: "12px", marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>From:</span>
                    <span style={{ fontFamily: "monospace" }}>0x3A1...F42E</span>
                  </div>
                </div>
                <div style={{ fontSize: "12px", marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>To:</span>
                    <span style={{ fontFamily: "monospace" }}>0x71C...9E3F</span>
                  </div>
                </div>
                <div style={{ fontSize: "12px", marginBottom: "5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Amount:</span>
                    <span style={{ color: "#10b981" }}>0.75 ETH</span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "10px",
                    padding: "3px 8px",
                    background: "rgba(16, 185, 129, 0.2)",
                    borderRadius: "12px",
                    display: "inline-block",
                  }}
                >
                  Confirmed • 2 min ago
                </div>
              </div>
            )}
          </Html>
        </group>
      ))}
    </group>
  )
}

// Glitch effect component
function GlitchEffect() {
  const mesh = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime()

      // Random glitch effect
      if (Math.random() > 0.995) {
        gsap.to(mesh.current.material as any, {
          opacity: 0.8,
          duration: 0.1,
          onComplete: () => {
            gsap.to(mesh.current!.material as any, {
              opacity: 0,
              duration: 0.1,
            })
          },
        })
      }
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0} blending={AdditiveBlending} />
    </mesh>
  )
}

// Main scene component
function Scene() {
  const { camera } = useThree()

  // Camera animation
  useEffect(() => {
    // Slow zoom in effect
    gsap.to(camera.position, {
      z: 15,
      duration: 20,
      ease: "power1.inOut",
    })
  }, [camera])

  return (
    <>
      <CityGrid />
      <BlockchainNodes />
      <DigitalWaves />
      <HolographicElements />
      <GlitchEffect />
      <Environment preset="night" />
    </>
  )
}

export default function DigitalCityscape() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 25]} fov={60} />
        <Scene />
      </Canvas>
    </div>
  )
}

