'use client'

import { Html, useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const { active, progress } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setShow(false), 600)
      return () => clearTimeout(timeout)
    }
  }, [active, progress])

  return (
    <Html center zIndexRange={[1000, 0]} className="pointer-events-none">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0A0C0F]"
            style={{ width: '100vw', height: '100vh', transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center">
                {/* Outer Titanium Silver Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                  className="h-24 w-24 rounded-full border-[1.5px] border-white/10 border-t-[#C1CAD2]"
                />
                {/* Inner Gunmetal Glow */}
                <motion.div
                  animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.35, 0.8, 0.35] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute h-12 w-12 rounded-full bg-[#282E35] blur-xl"
                />
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#C1CAD2]">
                  AMR
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#F4F6F8]">
                  Aston Martin Valkyrie AMR Pro
                </span>
                <span className="text-[9px] font-light tracking-[0.3em] text-[#929DA8]">
                  Initializing Telemetry · {Math.round(progress)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  )
}
