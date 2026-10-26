'use client'

import { motion, type Variants } from 'framer-motion'
import { NAV_ITEMS, EASE_CURVE, SITE_NAME } from '@/lib/constants'
import { scrollToSection } from '@/lib/utils'

const textVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CURVE },
  },
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export default function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="
        relative flex min-h-screen w-full
        flex-col
        bg-transparent
        pointer-events-none
      "
    >
      {/* CTA Overlay */}
      <div className="
        relative flex
        min-h-screen flex-grow
        w-full items-center justify-center
        overflow-hidden
        pointer-events-auto
      ">
        {/* Content */}
        <motion.div
          className="
            relative z-20
            mt-20
            flex flex-col
            items-center justify-center
            px-4 pb-20
            text-center
          "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={textVariants}
            className="mb-6 flex flex-col items-center"
          >
            <div className="
              mb-5 h-12 w-[1.5px]
              bg-gradient-to-b
              from-transparent
              via-[#82909C]
              to-[#C1CAD2]
            " />

            <span className="
              text-[9.5px] font-bold
              uppercase
              tracking-[0.4em]
              text-[#C1CAD2]
            ">
              Beyond Regulations · Beyond Limits
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={textVariants}
            className="
              mb-6 max-w-4xl
              text-4xl font-extralight
              uppercase
              tracking-widest
              text-[#F4F6F8]
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            The Ultimate
            <br />
            <span className="text-[#C1CAD2] font-normal">
              Track Weapon.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={textVariants}
            className="
              mb-12 max-w-2xl
              text-xs font-light
              uppercase
              tracking-[0.2em]
              text-[#929DA8]
              md:text-sm
              leading-relaxed
            "
          >
            1,000+ BHP · 11,100 RPM V12 · 2,660 KG DOWNFORCE · 3:20 LE MANS LAP TIME
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={textVariants}
            className="
              z-50 flex w-full
              flex-col items-stretch
              gap-4
              sm:w-auto sm:flex-row
              sm:items-center
              sm:gap-5
            "
          >
            <motion.button
              type="button"
              onClick={() => scrollToSection('#configure')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                group relative
                flex w-full
                justify-center
                overflow-hidden
                rounded-xl
                bg-[#C1CAD2]
                px-8 py-4
                text-xs font-bold
                uppercase tracking-[0.22em] text-[#0A0C0F]
                transition-all duration-200
                hover:bg-[#F4F6F8]
                focus-visible:outline-none
                focus-visible:ring-1
                focus-visible:ring-[#C1CAD2]
                sm:w-auto
              "
            >
              <span className="relative z-10 flex items-center gap-3">
                COMMISSION YOUR ALLOCATION
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => scrollToSection('#overview')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                group relative
                flex w-full
                justify-center
                overflow-hidden
                rounded-xl
                border border-[#82909C]/30
                bg-white/[0.03]
                px-8 py-4
                text-xs font-medium
                uppercase tracking-[0.2em] text-[#F4F6F8]
                transition-all duration-200
                hover:border-[#C1CAD2]/60
                hover:bg-[#282E35]
                focus-visible:outline-none
                focus-visible:ring-1
                focus-visible:ring-[#C1CAD2]/40
                sm:w-auto
              "
            >
              <span className="relative z-10 flex items-center gap-3">
                RETURN TO CIRCUIT
                <span className="text-sm transition-transform duration-200 group-hover:-translate-y-1">
                  ↑
                </span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="
        relative z-30 w-full
        border-t border-[#82909C]/20
        bg-[#0A0C0F]
        px-8 py-10
        md:px-14
        pointer-events-auto
      ">
        <div className="
          mx-auto flex
          max-w-7xl
          flex-col items-center
          justify-between gap-6
          md:flex-row md:items-start
        ">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-light tracking-[0.2em] text-[#F4F6F8] uppercase">
              {SITE_NAME}
            </h3>
            <p className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.25em] text-[#C1CAD2]">
              Q by Aston Martin · Bespoke Division
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="
                  rounded-lg px-3.5 py-1.5
                  text-[10px] font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[#82909C]
                  transition-colors
                  hover:text-[#F4F6F8]
                  hover:bg-white/5
                  focus-visible:outline-none
                  focus-visible:ring-1
                  focus-visible:ring-[#C1CAD2]/40
                "
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="
          mx-auto mt-10
          max-w-7xl
          border-t border-white/5
          pt-6
          text-center
          md:flex md:items-center
          md:justify-between
          md:text-left
        ">
          <p className="text-[9.5px] uppercase tracking-widest text-[#929DA8]">
            © {new Date().getFullYear()} Aston Martin Lagonda Global Holdings plc. Official Track Experience.
          </p>

          <p className="mt-3 text-[9.5px] uppercase tracking-widest text-[#82909C] font-medium md:mt-0">
            Engineered for pure speed.
          </p>
        </div>
      </footer>
    </section>
  )
}