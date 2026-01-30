import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface StrandProps {
  color: string
  offset: number
  rotationSpeed: number
}

function DNAStrand({ color, offset, rotationSpeed }: StrandProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particleCount = 80
  
  const { positions, connections } = useMemo(() => {
    const pos: THREE.Vector3[] = []
    const conn: [number, number][] = []
    
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 8
      const x = Math.cos(t + offset) * 2
      const y = (i - particleCount / 2) * 0.15
      const z = Math.sin(t + offset) * 2
      pos.push(new THREE.Vector3(x, y, z))
      
      if (i > 0) {
        conn.push([i - 1, i])
      }
    }
    
    return { positions: pos, connections: conn }
  }, [offset])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group ref={groupRef}>
      {/* Strand spheres */}
      {positions.map((pos, i) => (
        <mesh key={`sphere-${i}`} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
      
      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                ...positions[a].toArray(),
                ...positions[b].toArray()
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} opacity={0.6} transparent linewidth={2} />
        </line>
      ))}
    </group>
  )
}

interface RungProps {
  index: number
  total: number
}

function BasePair({ index, total }: RungProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  const position = useMemo(() => {
    const t = (index / total) * Math.PI * 8
    const y = (index - total / 2) * 0.15
    return {
      x1: Math.cos(t) * 2,
      z1: Math.sin(t) * 2,
      x2: Math.cos(t + Math.PI) * 2,
      z2: Math.sin(t + Math.PI) * 2,
      y
    }
  }, [index, total])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b']
  const color = colors[index % colors.length]

  return (
    <group ref={groupRef}>
      {/* Connection rung */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              position.x1, position.y, position.z1,
              position.x2, position.y, position.z2
            ]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} opacity={0.4} transparent linewidth={1} />
      </line>
      
      {/* Base pair spheres */}
      <mesh position={[position.x1, position.y, position.z1]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[position.x2, position.y, position.z2]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 200
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    const colorPalette = [
      new THREE.Color('#ef4444'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#10b981'),
      new THREE.Color('#f59e0b'),
      new THREE.Color('#8b5cf6')
    ]
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    
    return { positions: pos, colors: col }
  }, [])

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02
      particlesRef.current.rotation.x += delta * 0.01
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#3b82f6" />
      
      <DNAStrand color="#3b82f6" offset={0} rotationSpeed={0.1} />
      <DNAStrand color="#ef4444" offset={Math.PI} rotationSpeed={0.1} />
      
      {Array.from({ length: 60 }, (_, i) => (
        <BasePair key={i} index={i} total={60} />
      ))}
      
      <FloatingParticles />
    </>
  )
}

export default function DNAHelix() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
