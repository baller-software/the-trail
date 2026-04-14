import type { GameState, HealthStatus, RationLevel, Weather } from './types'
import { getAliveCount } from './state'

const HEALTH_ORDER: HealthStatus[] = ['good', 'fair', 'poor', 'veryPoor']

function healthIndex(health: HealthStatus): number {
  return HEALTH_ORDER.indexOf(health)
}

function healthFromIndex(index: number): HealthStatus {
  return HEALTH_ORDER[Math.max(0, Math.min(index, HEALTH_ORDER.length - 1))]
}

/**
 * Calculate health change based on food, rations, weather, clothing, and rest.
 * Returns the new HealthStatus.
 */
export function updateHealth(
  currentHealth: HealthStatus,
  rations: RationLevel,
  weather: Weather,
  clothing: number,
  isResting: boolean,
  food: number = Infinity,
): HealthStatus {
  let idx = healthIndex(currentHealth)

  // Starvation — no food is immediately dangerous
  if (food <= 0) {
    idx += 2 // rapid health decline
  } else if (rations === 'filling') {
    idx = Math.max(0, idx - 1) // improve
  } else if (rations === 'bareBones') {
    idx++ // worsen
  }

  // Weather effects
  if ((weather === 'cold' || weather === 'snowy') && clothing < 3) {
    idx++ // worsen if insufficient clothing
  }

  // Rest improves health
  if (isResting) {
    idx = Math.max(0, idx - 1)
  }

  return healthFromIndex(idx)
}

/**
 * Determine if a party member dies this turn based on health.
 * Returns the index of the member who dies (1-5), or 0 if none.
 */
export function checkPartyDeath(state: GameState, randomValue: number): number {
  const { health } = state.party

  // Death probability based on health status
  let deathChance = 0
  if (health === 'fair') deathChance = 0.02
  if (health === 'poor') deathChance = 0.05
  if (health === 'veryPoor') deathChance = 0.12

  // No food dramatically increases death chance
  if (state.supplies.food <= 0) deathChance += 0.15

  if (randomValue >= deathChance) return 0

  // Pick a random alive member (not the leader unless they're the last)
  const aliveMembers: number[] = []
  const members = [
    state.party.member1Alive,
    state.party.member2Alive,
    state.party.member3Alive,
    state.party.member4Alive,
    state.party.member5Alive,
  ]

  for (let i = 0; i < members.length; i++) {
    if (members[i]) aliveMembers.push(i + 1)
  }

  if (aliveMembers.length === 0) return 0

  // Prefer non-leader deaths unless leader is alone
  const nonLeader = aliveMembers.filter((m) => m !== 1)
  const candidates = nonLeader.length > 0 ? nonLeader : aliveMembers

  const victimIndex = Math.floor(randomValue * 100) % candidates.length
  return candidates[victimIndex]
}

/**
 * Check if game should end due to starvation or no oxen.
 */
export function checkGameEndConditions(state: GameState): {
  isGameOver: boolean
  reason: 'allDead' | 'noFood' | 'noOxen' | 'tooLate' | null
} {
  const aliveCount = getAliveCount(state)

  if (aliveCount === 0) {
    return { isGameOver: true, reason: 'allDead' }
  }

  if (
    state.supplies.food <= 0 &&
    (state.party.health === 'poor' || state.party.health === 'veryPoor')
  ) {
    return { isGameOver: true, reason: 'noFood' }
  }

  if (state.supplies.oxen <= 0) {
    return { isGameOver: true, reason: 'noOxen' }
  }

  // Too late — December or later
  if (state.month > 12 || (state.month === 12 && state.day > 15)) {
    return { isGameOver: true, reason: 'tooLate' }
  }

  return { isGameOver: false, reason: null }
}
