import type { GameState } from './types'

export function createInitialState(): GameState {
  return {
    phase: 'intro',
    turnNumber: 0,
    month: 3, // March 1848
    day: 1,
    milesTraveled: 0,
    currentLandmarkIndex: 0,
    pace: 'steady',
    rations: 'filling',
    weather: 'cool',
    supplies: {
      money: 700,
      food: 0,
      ammunition: 0,
      clothing: 0,
      oxen: 0,
      miscellaneousSupplies: 0,
    },
    party: {
      member1Alive: true,
      member2Alive: true,
      member3Alive: true,
      member4Alive: true,
      member5Alive: true,
      health: 'good',
    },
    currentEvent: null,
    output: [],
    gameOverReason: null,
  }
}

export function getAliveCount(state: GameState): number {
  const p = state.party
  return [
    p.member1Alive,
    p.member2Alive,
    p.member3Alive,
    p.member4Alive,
    p.member5Alive,
  ].filter(Boolean).length
}
