'use client'

import { memo, Suspense, useState, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  MeshReflectorMaterial,
  PerformanceMonitor,
} from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import CarModel from './CarModel'
import Preloader from './Preloader'

// ─── Responsive Car Model ─────────────────────────────────────────────────────
function ResponsiveCarModel() {
  const { size } = useThree()
  const pixelWidth = size.width

  const config =
    pixelWidth < 768
      ? { scale: 0.95, position: [0.15, -1.05, 0] as [number, number, number] }
      : pixelWidth < 1024
        ? { scale: 1.15, position: [0.75, -1.05, 0] as [number, number, number] }
        : { scale: 1.28, position: [1.2, -1.05, 0] as [number, number, number] }

  return (
    <CarModel
      position={config.position}
      rotation={[0, -Math.PI / 5.5, 0]}
      scale={config.scale}
    />
  )
}

// ─── Scroll-Driven Camera Controller ─────────────────────────────────────────
// Coordinates seamless camera transition between Overview -> Performance -> Engineering -> Configurator
const POS_HERO = new THREE.Vector3(5.6, 0.75, 6.4)
const POS_PERFORMANCE = new THREE.Vector3(0.8, 0.15, 7.2)
const POS_ENGINEERING = new THREE.Vector3(-2.4, 2.8, 3.2)
const POS_CONFIG = new THREE.Vector3(5.0, 0.65, 4.2)

const TARGET_HERO = new THREE.Vector3(0.8, -0.2, 0)
const TARGET_PERFORMANCE = new THREE.Vector3(0.6, -0.3, 1.8)
const TARGET_ENGINEERING = new THREE.Vector3(0.6, 0.1, 0.2)
const TARGET_CONFIG = new THREE.Vector3(1.2, -0.2, 0)

const tempTargetPos = new THREE.Vector3()
const tempTargetLook = new THREE.Vector3()
const tempOrbitPos = new THREE.Vector3()

function ScrollCameraController() {
  useFrame((state) => {
    const scrollY = window.scrollY || 0
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0

    if (progress < 0.30) {
      const p = progress / 0.30
      tempTargetPos.lerpVectors(POS_HERO, POS_PERFORMANCE, p)
      tempTargetLook.lerpVectors(TARGET_HERO, TARGET_PERFORMANCE, p)
    } else if (progress < 0.65) {
      const p = (progress - 0.30) / 0.35
      tempTargetPos.lerpVectors(POS_PERFORMANCE, POS_ENGINEERING, p)
      tempTargetLook.lerpVectors(TARGET_PERFORMANCE, TARGET_ENGINEERING, p)
    } else if (progress < 0.85) {
      const p = (progress - 0.65) / 0.20
      tempTargetPos.lerpVectors(POS_ENGINEERING, POS_CONFIG, p)
      tempTargetLook.lerpVectors(TARGET_ENGINEERING, TARGET_CONFIG, p)
    } else {
      const p = Math.min((progress - 0.85) / 0.15, 1)
      const time = state.clock.elapsedTime
      const angle = -0.3 + Math.sin(time * 0.16) * 0.65
      const radius = 6.4

      tempOrbitPos.set(
        1.2 + Math.cos(angle) * radius,
        0.55 + Math.sin(time * 0.22) * 0.18,
        Math.sin(angle) * radius
      )

      tempTargetPos.lerpVectors(POS_CONFIG, tempOrbitPos, p)
      tempTargetLook.copy(TARGET_CONFIG)
    }

    state.camera.position.lerp(tempTargetPos, 0.05)

    if (!state.camera.userData.currentLookAt) {
      state.camera.userData.currentLookAt = TARGET_HERO.clone()
    }
    state.camera.userData.currentLookAt.lerp(tempTargetLook, 0.05)
    state.camera.lookAt(state.camera.userData.currentLookAt)
  })

  return null
}

// ─── Cinematic Lighting Architecture (One Cohesive Night-Circuit) ────────────
const CinematicLighting = memo(function CinematicLighting() {
  return (
    <group>
      {/* Subtle Gunmetal Ambient Lighting */}
      <ambientLight color="#282E35" intensity={0.45} />
      <hemisphereLight color="#82909C" groundColor="#0A0C0F" intensity={0.3} />

      {/* Main Overhead Pit-Lane Soft White Key Light */}
      <directionalLight
        position={[4, 8, 5]}
        color="#F4F6F8"
        intensity={1.35}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={32}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={10}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0003}
      />

      {/* Titanium Silver Backlight behind car to cleanly separate carbon silhouette */}
      <pointLight
        position={[1.2, 0.9, -3.2]}
        color="#82909C"
        intensity={2.0}
        distance={8.5}
        decay={2}
      />

      {/* Soft Titanium Silver Rear Wing & Roof Fin Highlight */}
      <spotLight
        position={[0, 4.5, -4.5]}
        target-position={[1.2, 0, 0]}
        color="#C1CAD2"
        intensity={0.65}
        angle={0.7}
        penumbra={0.9}
        distance={10}
      />

      {/* Front Splitter & Nose Highlights */}
      <spotLight
        position={[1.2, 2.5, 5.5]}
        angle={0.55}
        penumbra={0.8}
        intensity={0.95}
        color="#F4F6F8"
      />

      {/* Titanium Silver Lateral Bodywork Fill */}
      <directionalLight position={[-5, 3, 5]} color="#82909C" intensity={0.6} />
      <directionalLight position={[-5, 3, -4]} color="#282E35" intensity={0.5} />

      {/* Subtle Ground Underbody Reflection */}
      <pointLight position={[1.2, -0.85, 0]} color="#282E35" intensity={0.4} distance={4.5} decay={2} />
    </group>
  )
})

function FpsLimiter({ fps = 60 }: { fps?: number }) {
  const { invalidate } = useThree()

  useEffect(() => {
    let animId: number
    let lastTime = performance.now()
    const frameInterval = 1000 / fps

    const tick = (now: number) => {
      animId = requestAnimationFrame(tick)
      const elapsed = now - lastTime

      if (elapsed >= frameInterval - 1.5) {
        lastTime = now - (elapsed % frameInterval)
        invalidate()
      }
    }

    animId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [fps, invalidate])

  return null
}

export default function HeroScene() {
  const [dpr, setDpr] = useState(1.5)

  return (
    <div className="w-full h-full">
      <Canvas
        frameloop="demand"
        camera={{
          position: [5.6, 0.75, 6.4],
          fov: 34,
          near: 0.1,
          far: 60,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        shadows="percentage"
        dpr={dpr}
      >
        <FpsLimiter fps={60} />
        {/* Carbon-Black Atmosphere Backdrop & Seamless Deep Fog */}
        <color attach="background" args={['#0A0C0F']} />
        <fog attach="fog" args={['#0A0C0F', 10, 30]} />

        <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />

        <CinematicLighting />

        <Suspense fallback={<Preloader />}>
          {/* Consistent Studio Environment with subtle intensity */}
          <Environment preset="studio" environmentIntensity={0.22} />
          <ResponsiveCarModel />
        </Suspense>

        {/* Natural Ground Contact Shadow */}
        <ContactShadows
          position={[1.2, -1.04, 0]}
          opacity={0.88}
          scale={15}
          blur={2.4}
          far={3}
          color="#030406"
        />

        {/* Wet, Dark Asphalt with Restrained Subtle Sheen (seamlessly fades into fog) */}
        <mesh
          position={[0, -1.05, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[240, 240]} />
          <MeshReflectorMaterial
            blur={[180, 50]}
            resolution={512}
            mixBlur={1}
            mixStrength={1.2}
            roughness={0.78}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#07080A"
            metalness={0.35}
            mirror={0.05}
          />
        </mesh>

        <ScrollCameraController />

        {/* Restrained Postprocessing (avoids excessive bloom & distortion) */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.78}
            mipmapBlur
            intensity={0.15}
            levels={8}
            opacity={0.85}
          />
          <Vignette
            offset={0.34}
            darkness={0.52}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}