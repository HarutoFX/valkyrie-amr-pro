'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_CURVE } from '@/lib/constants'
import SplitText from './SplitText'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_CURVE,
    },
  },
}

function scrollToPerformance() {
  document.getElementById('performance')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        relative z-10
        flex h-full max-w-xl lg:max-w-2xl flex-col
        items-start justify-end
        px-6 pb-24
        md:px-12 md:pb-20
        lg:px-16
      "
    >
      {/* Model & Heritage Badge */}
      <motion.div variants={itemVariants}>
        <span
          className={cn(
            'mb-4 inline-flex items-center gap-2.5',
            'rounded-full px-3.5 py-1.5',
            'border border-[#82909C]/30',
            'bg-[#282E35]/80 backdrop-blur-md',
            'text-[9px] font-semibold tracking-[0.25em]',
            'uppercase text-[#C1CAD2]'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C1CAD2] animate-pulse" />
          ASTON MARTIN · STRICTLY LIMITED TO 40 CHASSIS
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
        }}
        className="
          mb-4
          font-light
          tracking-wider
          leading-[1.05]
          text-[clamp(2.5rem,5.5vw,4.85rem)]
          text-[#F4F6F8]
          select-none
        "
        aria-label="The Rules Don't Apply"
      >
        <span className="block text-[#F4F6F8] uppercase font-extralight tracking-widest">
          <SplitText
            text="The Rules"
            baseDelay={0.12}
            charDelay={0.06}
          />
        </span>

        <span className="block uppercase font-bold tracking-tight text-[#C1CAD2]">
          <SplitText
            text="Don't Apply."
            isAccent
            baseDelay={0.7}
            charDelay={0.065}
          />
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="
          mb-6
          max-w-lg
          text-xs
          leading-relaxed
          text-[#929DA8]
          md:text-sm
          font-light
        "
      >
        Free from road regulations and racing restrictions. Engineered with a
        6.5-litre naturally aspirated Cosworth V12 revving to 11,100 RPM and
        generating over 2,660 kg of Le Mans-grade aerodynamic downforce.
      </motion.p>

      {/* Primary Action Button */}
      <motion.div variants={itemVariants} className="w-full flex items-center gap-3">
        <motion.button
          type="button"
          onClick={scrollToPerformance}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'inline-flex items-center justify-center',
            'cursor-pointer',
            'rounded-xl px-6 py-3',
            'bg-[#C1CAD2]',
            'text-xs font-bold uppercase tracking-[0.2em] text-[#0A0C0F]',
            'transition-all duration-200',
            'hover:bg-[#F4F6F8]',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-[#C1CAD2]'
          )}
        >
          Explore Telemetry
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex items-center gap-3 text-[#929DA8]"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            h-6 w-px
            bg-gradient-to-b
            from-transparent
            via-[#C1CAD2]
            to-transparent
          "
        />

        <span className="text-[9px] uppercase tracking-[0.25em] text-[#929DA8]">
          Scroll to Enter Circuit
        </span>
      </motion.div>
    </motion.div>
  )
}