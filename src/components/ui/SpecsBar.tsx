'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CAR_SPECS } from '@/lib/constants'
import TiltCard from './TiltCard'

const ease = [0.16, 1, 0.3, 1] as const

export default function SpecsBar() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1.0,
        duration: 0.7,
        ease,
      }}
      className="
        absolute bottom-6 left-0 right-0 z-20
        pointer-events-auto
      "
    >
      <div className="mx-auto max-w-fit px-4 sm:px-8">
        <TiltCard
          maxTilt={4}
          perspective={1400}
          className="w-fit mx-auto"
          cardClassName="px-4 py-2.5 rounded-xl bg-[#282E35]/85 border border-[#82909C]/25 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
        >
          <div className="
            flex items-center
            overflow-x-auto
            scrollbar-none
            gap-1
          ">
            {CAR_SPECS.slice(0, 5).map((spec, index) => (
              <div
                key={spec.label}
                className="flex min-w-fit items-stretch"
              >
                <div className="
                  flex flex-col items-center
                  px-4 py-1
                  sm:px-6
                ">
                  <span className="
                    whitespace-nowrap
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#929DA8]
                    font-medium
                  ">
                    {spec.label}
                  </span>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span
                      className={cn(
                        'font-light tracking-wider leading-none',
                        spec.label.toLowerCase() === 'engine'
                          ? 'text-xs sm:text-sm text-[#F4F6F8]'
                          : 'text-xl sm:text-2xl text-[#F4F6F8]'
                      )}
                    >
                      {spec.value}
                    </span>

                    {spec.unit && (
                      <span className="text-[10px] font-medium tracking-widest text-[#C1CAD2]">
                        {spec.unit}
                      </span>
                    )}
                  </div>
                </div>

                {index < 4 && (
                  <div className="
                    my-1 self-stretch
                    w-px
                    bg-[#82909C]/20
                  " />
                )}
              </div>
            ))}
          </div>
        </TiltCard>
      </div>
    </motion.div>
  )
}