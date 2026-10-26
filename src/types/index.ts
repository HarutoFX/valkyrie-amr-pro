// ─── Global Type Definitions for Aston Martin Valkyrie AMR Pro ───────────────

export interface CarSpec {
  label: string
  value: string
  unit?: string
  description?: string
}

export interface CarColor {
  id: string
  name: string
  hex: string
  accentHex?: string
  metallic?: boolean
  matte?: boolean
  description?: string
}

export interface WheelFinish {
  id: string
  name: string
  hex: string
  roughness: number
  metalness: number
}

export interface NavItem {
  label: string
  href: string
}

export type ThemeMode = 'dark' | 'light'