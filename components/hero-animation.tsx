"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D, Center, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { type Group, Vector3 } from "three"

function BlockchainNodes({ count = 12, radius = 4 }) {
  const group = useRef<Group>(null)
  const nodes = useRef<Vector3[]>([])

  // Initialize node positions
  useEffect(() => {
    nodes.current = Array(count)
      .fill(0)
      .map(() => {
        const angle = Math.random() * Math.PI * 2
        const height = (Math.random() - 0.5) * 2
        const r = radius * (0.7 + Math.random() * 0.3)
        return new Vector3(Math.cos(angle) * r, (height * radius) / 2, Math.sin(angle) * r)
      })
  }, [count, radius])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={group}>
      {nodes.current.map((position, i) => (
        <group key={i} position={position}>
          <mesh>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#3b82f6" : "#10b981"} />
          </mesh>
          {/* Connection lines to nearby nodes */}
          {nodes.current.slice(0, i).map((otherPos, j) => {
            const distance = position.distanceTo(otherPos)
            if (distance < radius * 0.8) {
              return (
                <line key={`${i}-${j}`}>
                  <bufferGeometry
                    attach="geometry"
                    setFromPoints={[
                      new Vector3(0, 0, 0),
                      new Vector3(otherPos.x - position.x, otherPos.y - position.y, otherPos.z - position.z),
                    ]}
                  />
                  <lineBasicMaterial attach="material" color="#8884" opacity={0.5} transparent linewidth={1} />
                </line>
              )
            }
            return null
          })}
        </group>
      ))}

      {/* Central sphere */}
      <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.7}
        />
      </Sphere>

      <Center position={[0, -3, 0]}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.8} height={0.2} curveSegments={12}>
          DECENTWORK
          <meshStandardMaterial color="#7c3aed" />
        </Text3D>
      </Center>
    </group>
  )
}

export default function HeroAnimation() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <BlockchainNodes />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

