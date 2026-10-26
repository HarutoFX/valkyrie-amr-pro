'use client'

import { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { EASE_CURVE, ENGINEERING_FEATURES } from '@/lib/constants'
import TiltCard from './TiltCard'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
}

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CURVE },
  },
}

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section
      id="engineering"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-transparent pointer-events-none"
    >
      {/* Ambient background glow in restrained Gunmetal */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[700px] w-[700px] -translate-x-1/4 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(40,46,53,0.18) 0%, rgba(10,12,15,0.08) 45%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col pointer-events-auto lg:flex-row">
        {/* Content */}
        <div className="flex w-full items-center px-8 py-20 mx-4 sm:px-10 md:px-16 lg:w-[46%] lg:py-0 lg:px-14 lg:ml-16">
          <TiltCard
            maxTilt={6}
            perspective={1200}
            className="w-full max-w-xl"
            cardClassName="p-10 lg:p-14 bg-[#282E35]/85 border border-[#82909C]/20 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.75)]"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {/* Section marker */}
              <motion.div
                variants={featureVariants}
                className="mb-8 flex items-center gap-3.5"
              >
                <span className="h-px w-9 bg-[#82909C]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#C1CAD2]">
                  Trackside Engineering
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div variants={featureVariants}>
                <h2 className="mb-8 text-2xl font-extralight uppercase leading-tight tracking-wider text-[#F4F6F8] sm:text-3xl md:text-4xl lg:text-4xl xl:text-[2.75rem] break-words">
                  Le Mans DNA.
                  <br />
                  <span className="text-[#C1CAD2] font-normal">
                    F1 Architecture.
                  </span>
                </h2>
              </motion.div>

              {/* Engineering Features */}
              <motion.div
                className="space-y-7 lg:space-y-8"
                variants={containerVariants}
              >
                {ENGINEERING_FEATURES.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={featureVariants}
                    className="group flex gap-4"
                  >
                    <div className="relative mt-1 flex h-6 w-[2px] shrink-0 overflow-hidden">
                      <span className="h-full w-full bg-[#82909C] transition-all duration-300 group-hover:bg-[#C1CAD2]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#F4F6F8] transition-colors duration-200 group-hover:text-[#C1CAD2]">
                          {feature.title}
                        </h3>
                        <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#282E35] border border-[#82909C]/30 text-[#C1CAD2]">
                          {feature.tag}
                        </span>
                      </div>

                      <p className="max-w-md text-xs font-light tracking-wide leading-relaxed text-[#929DA8] transition-colors duration-200 group-hover:text-[#F4F6F8]">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </TiltCard>
        </div>

        {/* Spacer for 3D car to be visible on the right */}
        <div className="hidden lg:block lg:w-1/2 lg:min-h-screen" />
      </div>
    </section>
  )
}