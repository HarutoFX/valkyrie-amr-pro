'use client'

import { motion } from 'framer-motion'
import { EASE_CURVE, PERFORMANCE_STATS } from '@/lib/constants'
import TiltCard from './TiltCard'

interface StatProps {
  value: string
  unit: string
  label: string
  detail?: string
  delay: number
}

function Stat({ value, unit, label, detail, delay }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col gap-1"
    >
      <div className="text-3xl font-light tracking-wide text-[#F4F6F8] md:text-4xl">
        {value}{' '}
        <span className="text-sm font-normal tracking-widest text-[#C1CAD2]">{unit}</span>
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F4F6F8]">
        {label}
      </div>
      {detail && (
        <div className="text-[9px] uppercase tracking-[0.14em] text-[#929DA8]">
          {detail}
        </div>
      )}
    </motion.div>
  )
}

export default function PerformanceSection() {
  const stats = PERFORMANCE_STATS.slice(1)

  return (
    <section
      id="performance"
      className="
        relative flex min-h-screen w-full
        items-center overflow-hidden
        bg-transparent
        pt-32 pb-20
        pointer-events-none
        lg:pt-0 lg:pb-0
      "
    >
      <motion.div
        className="
          relative z-10
          flex w-full
          flex-col-reverse
          items-center
          pointer-events-auto
          lg:flex-row
        "
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: EASE_CURVE }}
      >
        {/* Smoky Glass Performance Panel with 3D Tilt */}
        <TiltCard
          maxTilt={6}
          perspective={1200}
          className="w-full mx-4 lg:w-[46%] lg:ml-16"
          cardClassName="flex w-full flex-col justify-center px-8 py-12 lg:py-16 lg:px-14 bg-[#282E35]/85 border border-[#82909C]/20 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.75)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_CURVE }}
          >
            {/* Section marker */}
            <div className="mb-6 flex items-center gap-3.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#C1CAD2]">
                Powertrain Architecture
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 36 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_CURVE }}
                className="h-px bg-[#82909C]"
              />
            </div>

            <h2
              className="
                mb-8
                text-3xl font-extralight
                uppercase
                leading-tight
                tracking-wider
                text-[#F4F6F8]
                sm:text-4xl
                md:text-5xl
                lg:text-[3.25rem]
                break-words
              "
            >
              Unrestrained
              <br />
              <span className="text-[#C1CAD2] font-normal">Cosworth V12.</span>
            </h2>
          </motion.div>

          {/* Headline Stat: 1,000+ BHP */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_CURVE }}
            className="mb-8"
          >
            <div className="
              text-[4rem]
              font-extralight
              leading-none
              tracking-tight
              text-[#F4F6F8]
              sm:text-[5rem]
              md:text-[6rem]
              lg:text-[6.8rem]
            ">
              {PERFORMANCE_STATS[0].value}

              <span className="
                ml-3
                text-xl
                font-light
                tracking-[0.2em]
                text-[#C1CAD2]
                sm:text-2xl
                md:text-3xl
                lg:text-4xl
              ">
                {PERFORMANCE_STATS[0].unit}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5">
              <p className="
                text-[10px] font-medium
                uppercase
                tracking-[0.25em]
                text-[#929DA8]
                md:text-xs
              ">
                6.5L Naturally Aspirated 65° V12 · Zero Hybrid Ballast
              </p>
            </div>
          </motion.div>

          {/* Supporting specs */}
          <div className="mt-2 flex flex-wrap gap-8 md:gap-14 border-t border-[#82909C]/20 pt-7">
            {stats.map((stat, i) => (
              <Stat
                key={stat.label}
                value={stat.value}
                unit={stat.unit}
                label={stat.label}
                detail={stat.detail}
                delay={0.2 + i * 0.1}
              />
            ))}
          </div>
        </TiltCard>

        {/* Spacer for 3D car to be visible on the right */}
        <div className="hidden lg:block lg:w-7/12" />
      </motion.div>
    </section>
  )
}