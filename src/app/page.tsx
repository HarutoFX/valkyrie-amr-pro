import Navbar from '@/components/layout/Navbar'
import HeroContent from '@/components/ui/HeroContent'
import SpecsBar from '@/components/ui/SpecsBar'
import DynamicHeroScene from '@/components/canvas/DynamicHeroScene'
import PerformanceSection from '@/components/ui/PerformanceSection'
import TechnologySection from '@/components/ui/TechnologySection'
import ConfigureSection from '@/components/ui/ConfigureSection'
import FinalCtaSection from '@/components/ui/FinalCtaSection'

export default function Home() {
  return (
    <>
      {/* ── Fixed 3D Canvas Layer ── */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        {/* Cohesive Night-Circuit Carbon Black Atmosphere */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 55% 40%, rgba(40, 46, 53, 0.25) 0%, #0A0C0F 70%, #060709 100%)',
          }}
        />
        <DynamicHeroScene />

        {/* Global Noise Overlay */}
        <div
          className="absolute inset-0 z-10 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10">
        <section
          id="overview"
          className="relative w-full min-h-[100dvh] flex flex-col justify-end pointer-events-none"
          aria-label="Aston Martin Valkyrie AMR Pro 3D Showcase"
        >
          {/* Hero Content */}
          <div className="w-full flex-grow flex items-stretch">
            <div className="pointer-events-auto w-full">
              <HeroContent />
            </div>
          </div>

          {/* Specs Bar */}
          <div className="pointer-events-auto">
            <SpecsBar />
          </div>
        </section>

        <PerformanceSection />
        <TechnologySection />
        <ConfigureSection />
        <FinalCtaSection />
      </main>
    </>
  )
}