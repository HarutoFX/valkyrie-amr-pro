'use client'

import { useMemo, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useConfiguratorStore } from '@/lib/store'
import { CAR_COLORS, ACCENT_LIVERIES, WHEEL_FINISHES, INTERIOR_THEMES } from '@/lib/constants'

type CarModelProps = {
  url?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function CarModel({
  url = '/models/aston-martin-valkyrie-amr-pro.glb',
  position = [0, -1, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: CarModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  const selectedColor = useConfiguratorStore((state) => state.selectedColor)
  const selectedAccent = useConfiguratorStore((state) => state.selectedAccent)
  const selectedWheels = useConfiguratorStore((state) => state.selectedWheels)
  const selectedInterior = useConfiguratorStore((state) => state.selectedInterior)

  const { scene } = useGLTF(url)

  const {
    model,
    normalizedScale,
    offset,
    bodyMaterials,
    accentMaterials,
    wheelMaterials,
    interiorMaterials,
  } = useMemo(() => {
    /**
     * Clone the hierarchy with isolated materials.
     * Shadow flags, material cloning, and material patching are all
     * executed in a single clean traversal to optimize loading time.
     */
    const clonedScene = scene.clone(true)

    const box = new THREE.Box3()
    const foundBodyMats: THREE.MeshStandardMaterial[] = []
    const foundAccentMats: THREE.MeshStandardMaterial[] = []
    const foundWheelMats: THREE.MeshStandardMaterial[] = []
    const foundInteriorMats: THREE.MeshStandardMaterial[] = []

    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      // Enable realistic shadow casting and receiving
      child.castShadow = true
      child.receiveShadow = true

      // Isolate material so Drei cache is never mutated
      if (Array.isArray(child.material)) {
        child.material = child.material.map((m) => m.clone())
      } else {
        child.material = child.material.clone()
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material]

      materials.forEach((mat) => {
        const name = (mat.name || '').toLowerCase()

        /**
         * 1. Main Exterior Bodywork ('body')
         */
        if (name === 'body' || name.includes('carpaint') || name.startsWith('body_')) {
          if ('metalness' in mat) mat.metalness = 0.88
          if ('roughness' in mat) mat.roughness = 0.16
          if ('envMapIntensity' in mat) mat.envMapIntensity = 2.0
          mat.needsUpdate = true
          foundBodyMats.push(mat as THREE.MeshStandardMaterial)
        }

        /**
         * 2. AMR Livery Clubsport Accents ('yelow')
         */
        else if (name === 'yelow' || name.includes('yellow') || name.includes('accent') || name.includes('livery')) {
          if ('metalness' in mat) mat.metalness = 0.25
          if ('roughness' in mat) mat.roughness = 0.35
          if ('envMapIntensity' in mat) mat.envMapIntensity = 1.4
          mat.needsUpdate = true
          foundAccentMats.push(mat as THREE.MeshStandardMaterial)
        }

        /**
         * 3. Carbon Fiber Aero Package ('carbon')
         */
        else if (
          name === 'carbon' ||
          name.includes('carbon_0') ||
          name.includes('diffuser') ||
          name.includes('splitter') ||
          name.includes('wing')
        ) {
          if ('color' in mat) mat.color.set('#0d0f12')
          if ('metalness' in mat) mat.metalness = 0.4
          if ('roughness' in mat) mat.roughness = 0.25
          if ('envMapIntensity' in mat) mat.envMapIntensity = 1.8
          mat.needsUpdate = true
        }

        /**
         * 4. Wheels & Magnesium Rims ('rim_chrome', 'material_52')
         */
        else if (
          name.includes('rim') ||
          name.includes('wheel') ||
          name === 'rim_chrome' ||
          name === 'material_52'
        ) {
          if ('metalness' in mat) mat.metalness = 0.92
          if ('roughness' in mat) mat.roughness = 0.26
          if ('envMapIntensity' in mat) mat.envMapIntensity = 2.2
          mat.needsUpdate = true
          foundWheelMats.push(mat as THREE.MeshStandardMaterial)
        }

        /**
         * 5. Slick Tires ('EXT_Tyre')
         */
        else if (name.includes('tyre') || name.includes('tire') || name === 'ext_tyre') {
          if ('color' in mat) mat.color.set('#141416')
          if ('metalness' in mat) mat.metalness = 0.05
          if ('roughness' in mat) mat.roughness = 0.88
          mat.needsUpdate = true
        }

        /**
         * 6. Carbon Ceramic Brake Discs ('EXT_Disc')
         */
        else if (name.includes('disc') || name.includes('brake') || name === 'ext_disc') {
          if ('color' in mat) mat.color.set('#2c2e30')
          if ('metalness' in mat) mat.metalness = 0.65
          if ('roughness' in mat) mat.roughness = 0.45
          mat.needsUpdate = true
        }

        /**
         * 7. Canopy Glass ('glass', 'win_int')
         */
        else if (name === 'glass' || name === 'win_int' || name.includes('windshield')) {
          if ('color' in mat) mat.color.set('#04080a')
          if ('metalness' in mat) mat.metalness = 0.15
          if ('roughness' in mat) mat.roughness = 0.02
          if ('envMapIntensity' in mat) mat.envMapIntensity = 2.8
          mat.transparent = true
          mat.opacity = 0.88
          mat.needsUpdate = true
        }

        /**
         * 8. Headlights ('linza', 'white')
         */
        else if (name === 'linza' || name.includes('headlight')) {
          if ('color' in mat) mat.color.set('#ffffff')
          if ('emissive' in mat) {
            mat.emissive.set('#ffffff')
            mat.emissiveIntensity = 1.2
          }
          if ('roughness' in mat) mat.roughness = 0.05
          mat.needsUpdate = true
        }

        /**
         * 9. Rear Lights & Brake Bar ('r_lights', 'r_glass')
         */
        else if (name === 'r_lights' || name === 'r_glass' || name.includes('taillight')) {
          if ('color' in mat) mat.color.set('#ff0d25')
          if ('emissive' in mat) {
            mat.emissive.set('#ff0d25')
            mat.emissiveIntensity = 2.4
          }
          mat.needsUpdate = true
        }

        /**
         * 10. Cockpit Alcantara & Harnesses
         */
        else if (
          name.includes('alcnt') ||
          name.includes('alcantara') ||
          name.includes('seat') ||
          name.includes('cintura') ||
          name.includes('belt')
        ) {
          if ('roughness' in mat) mat.roughness = 0.82
          if ('metalness' in mat) mat.metalness = 0.02
          if ('envMapIntensity' in mat) mat.envMapIntensity = 0.6
          mat.needsUpdate = true
          foundInteriorMats.push(mat as THREE.MeshStandardMaterial)
        }
      })

      // Expand bounding box incrementally inside the same traversal
      box.expandByObject(child)
    })

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    /**
     * Aston Martin Valkyrie AMR Pro real-world length = 4.80m.
     * We normalize the longest horizontal axis (Z = 0.054) to 4.80m.
     */
    const longestAxis = Math.max(size.x, size.z)
    const baseScale = longestAxis > 0 ? 4.80 / longestAxis : 1

    /**
     * Center the car horizontally and move its bottom surface to Y = 0
     * so ground shadows, floor reflections, and camera transitions align accurately.
     */
    const offset: [number, number, number] = [
      -center.x,
      -box.min.y,
      -center.z,
    ]

    return {
      model: clonedScene,
      normalizedScale: baseScale,
      offset,
      bodyMaterials: foundBodyMats,
      accentMaterials: foundAccentMats,
      wheelMaterials: foundWheelMats,
      interiorMaterials: foundInteriorMats,
    }
  }, [scene])

  // React to body paint color changes
  useEffect(() => {
    const colorConfig = CAR_COLORS.find((c) => c.id === selectedColor)
    const hex = colorConfig?.hex || '#0A0C0F'
    const color = new THREE.Color(hex)
    const isMatte = !!colorConfig?.matte

    bodyMaterials.forEach((mat) => {
      mat.color.set(color)
      mat.roughness = isMatte ? 0.42 : 0.16
      mat.metalness = isMatte ? 0.35 : 0.88
      mat.needsUpdate = true
    })
  }, [bodyMaterials, selectedColor])

  // React to AMR accent livery changes
  useEffect(() => {
    const accentConfig = ACCENT_LIVERIES.find((a) => a.id === selectedAccent)
    const hex = accentConfig?.hex || '#C1CAD2'
    const color = new THREE.Color(hex)

    accentMaterials.forEach((mat) => {
      mat.color.set(color)
      mat.needsUpdate = true
    })
  }, [accentMaterials, selectedAccent])

  // React to wheel finish changes
  useEffect(() => {
    const wheelConfig = WHEEL_FINISHES.find((w) => w.id === selectedWheels)
    const hex = wheelConfig?.hex || '#C8A251'
    const color = new THREE.Color(hex)

    wheelMaterials.forEach((mat) => {
      mat.color.set(color)
      if (wheelConfig) {
        mat.roughness = wheelConfig.roughness
        mat.metalness = wheelConfig.metalness
      }
      mat.needsUpdate = true
    })
  }, [wheelMaterials, selectedWheels])

  // React to interior theme changes
  useEffect(() => {
    const theme = INTERIOR_THEMES.find((t) => t.id === selectedInterior)
    const hex = theme?.hex || '#0A0C0F'
    const color = new THREE.Color(hex)

    interiorMaterials.forEach((mat) => {
      const name = (mat.name || '').toLowerCase()
      if (name.includes('cintura') || name.includes('belt')) {
        // Harness accent color
        mat.color.set(new THREE.Color(theme?.accent || '#C1CAD2'))
      } else {
        mat.color.set(color)
      }
      mat.needsUpdate = true
    })
  }, [interiorMaterials, selectedInterior])

  /**
   * Cinematic idle floating and gentle pointer parallax.
   */
  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const px = position[0]
    const py = position[1]
    const pz = position[2]

    const time = state.clock.elapsedTime

    // Subtly breathing suspension motion
    const idleY = py + Math.sin(time * 0.6) * 0.008

    group.position.x = px
    group.position.y = THREE.MathUtils.damp(group.position.y, idleY, 4, delta)
    group.position.z = pz

    // Subtle cinematic yaw + mouse parallax
    const cinematicRotation = Math.sin(time * 0.12) * 0.04
    const mouseRotation = state.pointer.x * 0.06
    const targetRotationY = rotation[1] + cinematicRotation + mouseRotation

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotationY,
      3,
      delta
    )

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      rotation[0] + state.pointer.y * 0.012,
      3,
      delta
    )

    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      rotation[2],
      3,
      delta
    )
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive
        object={model}
        position={offset}
        scale={normalizedScale * scale}
      />
    </group>
  )
}

useGLTF.preload('/models/aston-martin-valkyrie-amr-pro.glb')