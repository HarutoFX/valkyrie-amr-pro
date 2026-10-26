import { create } from 'zustand'

export type ColorOption =
  | 'satin_carbon'
  | 'liquid_titanium'
  | 'gunmetal_metallic'
  | 'hyper_red'
  | 'mariana_blue'
  | 'solaris_yellow'

export type AccentOption =
  | 'silver_leaf'
  | 'gunmetal_accent'
  | 'pure_white'
  | 'stealth_black'

export type WheelOption =
  | 'dark_titanium'
  | 'platinum_silver'
  | 'gloss_black'
  | 'satin_gold'

export type InteriorOption =
  | 'alcantara_silver'
  | 'alcantara_black'
  | 'alcantara_red'

export type ConfigStep = 'exterior' | 'accent' | 'wheels' | 'interior' | 'none'
export type EnvironmentOption = 'studio' | 'silverstone' | 'lemans'

interface ConfiguratorState {
  selectedColor: ColorOption
  selectedAccent: AccentOption
  selectedWheels: WheelOption
  selectedInterior: InteriorOption
  activeConfigStep: ConfigStep
  selectedEnvironment: EnvironmentOption
  lastInteractionTime: number

  setColor: (color: ColorOption) => void
  setAccent: (accent: AccentOption) => void
  setWheels: (wheels: WheelOption) => void
  setInterior: (interior: InteriorOption) => void
  setActiveConfigStep: (step: ConfigStep) => void
  setEnvironment: (env: EnvironmentOption) => void
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  selectedColor: 'satin_carbon',
  selectedAccent: 'silver_leaf',
  selectedWheels: 'dark_titanium',
  selectedInterior: 'alcantara_silver',
  activeConfigStep: 'none',
  selectedEnvironment: 'studio',
  lastInteractionTime: 0,

  setColor: (color) =>
    set({ selectedColor: color, lastInteractionTime: Date.now() }),
  setAccent: (accent) =>
    set({ selectedAccent: accent, lastInteractionTime: Date.now() }),
  setWheels: (wheels) =>
    set({ selectedWheels: wheels, lastInteractionTime: Date.now() }),
  setInterior: (interior) =>
    set({ selectedInterior: interior, lastInteractionTime: Date.now() }),
  setActiveConfigStep: (step) => set({ activeConfigStep: step }),
  setEnvironment: (env) => set({ selectedEnvironment: env }),
}))
