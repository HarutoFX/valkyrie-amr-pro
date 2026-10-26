'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { EASE_CURVE, CAR_COLORS, ACCENT_LIVERIES, WHEEL_FINISHES, INTERIOR_THEMES } from '@/lib/constants'
import {
  useConfiguratorStore,
  type ColorOption,
  type AccentOption,
  type WheelOption,
  type InteriorOption,
} from '@/lib/store'
import TiltCard from './TiltCard'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_CURVE } },
}

export default function ConfigureSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeTab, setActiveTab] = useState<'paint' | 'accent' | 'wheels' | 'interior'>('paint')

  const {
    selectedColor,
    selectedAccent,
    selectedWheels,
    selectedInterior,
    setColor,
    setAccent,
    setWheels,
    setInterior,
    setActiveConfigStep,
  } = useConfiguratorStore()

  const [buildSuccess, setBuildSuccess] = useState(false)

  const handleBuildRequest = () => {
    setBuildSuccess(true)
    setTimeout(() => setBuildSuccess(false), 5000)
  }

  const currentColor = CAR_COLORS.find((c) => c.id === selectedColor) || CAR_COLORS[0]
  const currentAccent = ACCENT_LIVERIES.find((a) => a.id === selectedAccent) || ACCENT_LIVERIES[0]
  const currentWheel = WHEEL_FINISHES.find((w) => w.id === selectedWheels) || WHEEL_FINISHES[0]
  const currentInterior = INTERIOR_THEMES.find((i) => i.id === selectedInterior) || INTERIOR_THEMES[0]

  return (
    <section
      id="configure"
      ref={sectionRef}
      className="relative min-h-[160vh] w-full overflow-hidden bg-transparent pointer-events-none"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-end p-6 md:p-10 lg:p-12 pb-12 pointer-events-none">
        {/* Main UI Overlay */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative z-10 flex flex-col lg:flex-row items-end justify-between w-full gap-5 pointer-events-auto"
        >
          {/* Left Side: Bespoke Finishes & Liveries */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:max-w-[560px]"
          >
            <TiltCard
              maxTilt={4}
              perspective={1000}
              cardClassName="p-6 md:p-7 bg-[#282E35]/85 border border-[#82909C]/20 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.75)]"
              onMouseEnter={() => setActiveConfigStep('exterior')}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#C1CAD2]">
                    Q by Aston Martin · Bespoke Commission
                  </p>
                  <h3 className="mt-1 text-xl font-light text-[#F4F6F8] tracking-wide">
                    {activeTab === 'paint' && currentColor.name}
                    {activeTab === 'accent' && currentAccent.name}
                    {activeTab === 'wheels' && currentWheel.name}
                    {activeTab === 'interior' && currentInterior.name}
                  </h3>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#82909C] border border-[#82909C]/25 px-2.5 py-1 rounded-md font-mono bg-[#0A0C0F]/50">
                  {activeTab === 'paint' && '01 // PAINT'}
                  {activeTab === 'accent' && '02 // LIVERY'}
                  {activeTab === 'wheels' && '03 // WHEELS'}
                  {activeTab === 'interior' && '04 // COCKPIT'}
                </span>
              </div>

              {/* Category Navigation Tabs */}
              <div className="flex gap-2 border-b border-[#82909C]/20 pb-2.5 mb-4 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('paint')
                    setActiveConfigStep('exterior')
                  }}
                  className={`text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTab === 'paint'
                      ? 'bg-[#C1CAD2] text-[#0A0C0F]'
                      : 'text-[#82909C] hover:text-[#F4F6F8]'
                  }`}
                >
                  Body Paint
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('accent')
                    setActiveConfigStep('accent')
                  }}
                  className={`text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTab === 'accent'
                      ? 'bg-[#C1CAD2] text-[#0A0C0F]'
                      : 'text-[#82909C] hover:text-[#F4F6F8]'
                  }`}
                >
                  Accent Stripe
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('wheels')
                    setActiveConfigStep('wheels')
                  }}
                  className={`text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTab === 'wheels'
                      ? 'bg-[#C1CAD2] text-[#0A0C0F]'
                      : 'text-[#82909C] hover:text-[#F4F6F8]'
                  }`}
                >
                  Wheels
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('interior')
                    setActiveConfigStep('interior')
                  }}
                  className={`text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTab === 'interior'
                      ? 'bg-[#C1CAD2] text-[#0A0C0F]'
                      : 'text-[#82909C] hover:text-[#F4F6F8]'
                  }`}
                >
                  Cockpit
                </button>
              </div>

              {/* Tab 1: Body Paint Colors */}
              {activeTab === 'paint' && (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 overflow-x-auto py-2.5 px-1 scrollbar-none">
                    {CAR_COLORS.map((color) => {
                      const isSelected = selectedColor === color.id
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setColor(color.id as ColorOption)}
                          title={color.name}
                          aria-label={`Select ${color.name}`}
                          className={`group relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full p-1 transition-all duration-200 hover:scale-105 focus:outline-none ${
                            isSelected
                              ? 'ring-2 ring-[#C1CAD2] shadow-[0_0_14px_rgba(193,202,210,0.35)]'
                              : 'ring-1 ring-white/10 hover:ring-[#82909C]/40'
                          }`}
                        >
                          <span
                            className="h-full w-full rounded-full border border-white/20 shadow-inner"
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-[11px] text-[#929DA8] font-light leading-relaxed">
                    {currentColor.description}
                  </p>
                </div>
              )}

              {/* Tab 2: Accent Livery */}
              {activeTab === 'accent' && (
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    {ACCENT_LIVERIES.map((accent) => {
                      const isSelected = selectedAccent === accent.id
                      return (
                        <button
                          key={accent.id}
                          type="button"
                          onClick={() => setAccent(accent.id as AccentOption)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                            isSelected
                              ? 'border-[#C1CAD2] bg-[#282E35] text-[#F4F6F8]'
                              : 'border-[#82909C]/20 bg-black/20 text-[#82909C] hover:border-[#82909C]/40 hover:text-[#F4F6F8]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: accent.hex }}
                          />
                          <span className="text-[11px] font-medium tracking-wider">
                            {accent.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-[10px] text-[#929DA8] tracking-wide">
                    Applied along front splitter strakes, LMP1 shark fin, and rear wing endplates.
                  </p>
                </div>
              )}

              {/* Tab 3: Wheels */}
              {activeTab === 'wheels' && (
                <div className="grid grid-cols-2 gap-2">
                  {WHEEL_FINISHES.map((wheel) => {
                    const isSelected = selectedWheels === wheel.id
                    return (
                      <button
                        key={wheel.id}
                        type="button"
                        onClick={() => setWheels(wheel.id as WheelOption)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-[#C1CAD2] bg-[#282E35] text-[#F4F6F8]'
                            : 'border-[#82909C]/20 bg-black/20 text-[#82909C] hover:border-[#82909C]/40 hover:text-[#F4F6F8]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-inner"
                          style={{ backgroundColor: wheel.hex }}
                        />
                        <span className="text-[11px] font-medium tracking-wider">
                          {wheel.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Tab 4: Cockpit */}
              {activeTab === 'interior' && (
                <div className="flex flex-col gap-2">
                  {INTERIOR_THEMES.map((theme) => {
                    const isSelected = selectedInterior === theme.id
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setInterior(theme.id as InteriorOption)}
                        className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-[#C1CAD2] bg-[#282E35] text-[#F4F6F8]'
                            : 'border-[#82909C]/20 bg-black/20 text-[#82909C] hover:border-[#82909C]/40 hover:text-[#F4F6F8]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: theme.accent }}
                          />
                          <span className="text-xs font-light tracking-wide">
                            {theme.name}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </TiltCard>
          </motion.div>

          {/* Right Side: Allocation Summary & CTA */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-3.5"
          >
            <TiltCard
              maxTilt={4}
              perspective={1000}
              cardClassName="p-6 bg-[#282E35]/85 border border-[#82909C]/20 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.75)]"
              onMouseEnter={() => setActiveConfigStep('none')}
            >
              <div className="flex justify-between items-start mb-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C1CAD2]">
                    Chassis Specification
                  </p>
                  <p className="mt-1 text-base font-light text-[#F4F6F8]">Valkyrie AMR Pro</p>
                  <p className="text-[9.5px] text-[#929DA8] tracking-widest uppercase">
                    1 of 40 Worldwide
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-light text-[#F4F6F8]">$3,500,000</p>
                  <p className="text-[8.5px] text-[#C1CAD2] uppercase tracking-widest font-semibold">
                    Base Allocation
                  </p>
                </div>
              </div>

              {/* Specs Summary Pill */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[#0A0C0F]/60 border border-[#82909C]/25 mb-5">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#929DA8] block">Powertrain</span>
                  <span className="text-[11px] font-medium text-[#F4F6F8]">6.5L V12 · 1,000+ BHP</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#929DA8] block">Downforce</span>
                  <span className="text-[11px] font-medium text-[#C1CAD2]">2,660 KG Peak</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBuildRequest}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#C1CAD2] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-[#0A0C0F] transition-all hover:bg-[#F4F6F8]"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Inquire Allocation
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </button>

              <AnimatePresence>
                {buildSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-2.5 rounded-lg border border-[#82909C]/40 bg-[#282E35] p-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C1CAD2] animate-ping" />
                      <p className="text-[9.5px] uppercase tracking-widest text-[#F4F6F8] font-semibold">
                        Bespoke Commission Dossier Dispatched
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}