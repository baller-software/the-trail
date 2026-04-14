// --- Text rendering ---

export type TextBrightness = 'bright' | 'medium' | 'dim'

export interface OutputLine {
  text: string
  brightness: TextBrightness
}

// --- Game phases ---

export type GamePhase =
  | 'intro'
  | 'setup'
  | 'traveling'
  | 'event'
  | 'hunting'
  | 'river'
  | 'fort'
  | 'gameOver'

// --- Supplies ---

export interface Supplies {
  money: number
  food: number
  ammunition: number
  clothing: number
  oxen: number
  miscellaneousSupplies: number
}

// --- Party ---

export type HealthStatus = 'good' | 'fair' | 'poor' | 'veryPoor'

export interface Party {
  member1Alive: boolean
  member2Alive: boolean
  member3Alive: boolean
  member4Alive: boolean
  member5Alive: boolean
  health: HealthStatus
}

// --- Travel ---

export type TravelPace = 'steady' | 'strenuous' | 'grueling'
export type RationLevel = 'filling' | 'meager' | 'bareBones'
export type Weather = 'warm' | 'cool' | 'cold' | 'rainy' | 'snowy'

// --- Landmarks ---

export type LandmarkType = 'fort' | 'river' | 'landmark'

export interface Landmark {
  name: string
  mileFromStart: number
  type: LandmarkType
  description: string
  riverDepth?: number
  ferryPrice?: number
}

// --- Events ---

export type EventType =
  | 'illness'
  | 'weather'
  | 'equipment'
  | 'theft'
  | 'encounter'
  | 'lostTrail'

export type EventSeverity = 'minor' | 'moderate' | 'severe'

export interface EventChoice {
  label: string
  value: number
}

export interface CurrentEvent {
  type: EventType
  message: string
  severity: EventSeverity
  choices?: EventChoice[]
}

export interface EventTemplate {
  type: EventType
  baseProbability: number
  messageTemplate: string
  severity: EventSeverity
}

// --- Game Over ---

export type GameOverReason =
  | 'reachedOregon'
  | 'allDead'
  | 'noFood'
  | 'noOxen'
  | 'tooLate'

// --- Game State ---

export interface GameState {
  phase: GamePhase
  turnNumber: number
  month: number
  day: number
  milesTraveled: number
  currentLandmarkIndex: number
  pace: TravelPace
  rations: RationLevel
  weather: Weather
  supplies: Supplies
  party: Party
  currentEvent: CurrentEvent | null
  output: OutputLine[]
  gameOverReason: GameOverReason | null
}
