'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn, scrollToSection } from '@/lib/utils'
import { NAV_ITEMS, SITE_NAME } from '@/lib/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [isVisible, setIsVisible] = useState(true)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = latest - previous

    // Keep visible near page top
    if (latest < 60) {
      setIsVisible(true)
      return
    }

    // Scroll down -> hide; Scroll up -> show
    if (diff > 8 && latest > 120) {
      setIsVisible(false)
    } else if (diff < -8) {
      setIsVisible(true)
    }
  })

  const prevScrollRestoration = useRef<ScrollRestoration>('auto')

  useEffect(() => {
    if ('scrollRestoration' in history) {
      prevScrollRestoration.current = history.scrollRestoration
      history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      const activeEntry = visibleEntries[0]

      if (activeEntry?.target.id) {
        if (window.scrollY < 50 && activeEntry.target.id !== 'overview') {
          return
        }
        setActiveSection(activeEntry.target.id)
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: [0, 0.1, 0.25, 0.5],
    })

    NAV_ITEMS.forEach((item) => {
      const id = item.href.replace(/^.*#/, '')
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
      if ('scrollRestoration' in history) {
        history.scrollRestoration = prevScrollRestoration.current
      }
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault()
    const id = href.replace(/^.*#/, '')
    setIsOpen(false)
    setActiveSection(id)
    scrollToSection(href)
  }

  const handleConfigureClick = () => {
    setIsOpen(false)
    scrollToSection('#configure')
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: isVisible || isOpen ? 0 : -100,
        opacity: isVisible || isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-4 py-2.5 sm:px-6 sm:py-3',
        !isVisible && !isOpen && 'pointer-events-none'
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl flex items-center justify-between',
          'rounded-xl px-4 py-2 sm:px-5',
          'transition-all duration-300',
          'bg-[#282E35]/85 backdrop-blur-2xl',
          'border border-[#82909C]/20',
          'shadow-[0_8px_32px_rgba(0,0,0,0.7)]'
        )}
      >
        {/* Aston Martin Wings Logo */}
        <Link
          href="#overview"
          onClick={(event) => handleNavClick(event, '#overview')}
          className="flex items-center gap-3 group"
          aria-label={`${SITE_NAME} — Return to top`}
        >
          <div className="w-11 h-7 relative shrink-0">
            <Image
              src="/aston-martin-logo.svg"
              alt="Aston Martin Wings Emblem"
              fill
              className="object-contain drop-shadow-[0_0_8px_rgba(193,202,210,0.25)] transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[#F4F6F8] font-medium tracking-[0.2em] text-xs uppercase">
              ASTON MARTIN
            </span>
            <span className="text-[#C1CAD2] text-[8.5px] tracking-[0.25em] font-semibold uppercase">
              VALKYRIE <span className="text-[#82909C]">AMR PRO</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (Overview, Performance, Engineering, Configurator) */}
        <ul className="hidden md:flex items-center gap-1 relative">
          <LayoutGroup>
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace(/^.*#/, '')
              const isActive = activeSection === sectionId

              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={cn(
                      'px-3.5 py-1.5 text-xs uppercase tracking-[0.16em] rounded-lg',
                      'transition-all duration-200',
                      'relative z-10 font-medium',
                      'focus-visible:outline-none',
                      'focus-visible:ring-1',
                      'focus-visible:ring-[#C1CAD2]',
                      isActive
                        ? 'text-[#F4F6F8]'
                        : 'text-[#82909C] hover:text-[#F4F6F8]'
                    )}
                  >
                    {item.label}
                  </Link>

                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-[#282E35] border border-[#C1CAD2]/40 rounded-lg z-0"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              )
            })}
          </LayoutGroup>
        </ul>

        {/* Desktop Commission CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            type="button"
            onClick={handleConfigureClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] rounded-lg',
              'bg-[#C1CAD2] text-[#0A0C0F]',
              'hover:bg-[#F4F6F8]',
              'transition-all duration-200',
              'focus-visible:outline-none',
              'focus-visible:ring-1',
              'focus-visible:ring-[#C1CAD2]'
            )}
          >
            Commission
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          id="mobile-menu-toggle"
          className={cn(
            'md:hidden text-[#82909C] hover:text-[#F4F6F8]',
            'focus-visible:outline-none',
            'focus-visible:ring-1',
            'focus-visible:ring-[#C1CAD2]',
            'rounded-lg p-1.5'
          )}
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'mt-2 mx-auto max-w-7xl rounded-xl',
              'bg-[#282E35]/95 backdrop-blur-xl',
              'border border-[#82909C]/25',
              'p-4 shadow-2xl'
            )}
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace(/^.*#/, '')
                const isActive = activeSection === sectionId

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.href)}
                      className={cn(
                        'block px-4 py-2.5 rounded-lg text-xs uppercase tracking-[0.18em]',
                        'transition-all',
                        isActive
                          ? 'text-[#F4F6F8] bg-[#282E35] font-semibold border border-[#C1CAD2]/40'
                          : 'text-[#82909C] hover:text-[#F4F6F8]'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}

              <li className="mt-3">
                <button
                  type="button"
                  onClick={handleConfigureClick}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#C1CAD2] text-[#0A0C0F] text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#F4F6F8] transition-colors"
                >
                  Commission Allocation
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}