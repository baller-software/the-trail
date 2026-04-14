import type { Supplies, TravelPace, RationLevel, OutputLine } from './types'

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'BUY_SUPPLIES'; payload: Partial<Supplies> }
  | { type: 'FINISH_SETUP' }
  | { type: 'TRAVEL'; payload: { randomSeed: number } }
  | { type: 'REST' }
  | { type: 'START_HUNT' }
  | {
      type: 'FINISH_HUNT'
      payload: { elapsedMs: number; correct: boolean }
    }
  | { type: 'SET_PACE'; payload: TravelPace }
  | { type: 'SET_RATIONS'; payload: RationLevel }
  | {
      type: 'CROSS_RIVER'
      payload: {
        method: 'ford' | 'caulk' | 'wait' | 'ferry'
        randomSeed: number
      }
    }
  | { type: 'RESOLVE_EVENT'; payload: { choice?: number; randomSeed: number } }
  | { type: 'BUY_AT_FORT'; payload: Partial<Supplies> }
  | { type: 'LEAVE_FORT' }
  | { type: 'NEW_GAME' }
  | { type: 'APPEND_OUTPUT'; payload: OutputLine | OutputLine[] }
