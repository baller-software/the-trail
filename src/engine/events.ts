import type { GameState, CurrentEvent, EventSeverity } from './types'
import { EVENT_TEMPLATES } from '../data/events'

/**
 * Roll for a random event this turn.
 * Uses the event probability tables from data/events.ts.
 * Returns a CurrentEvent if one fires, or null if nothing happens.
 *
 * Probability modifiers:
 * - Poor health increases illness chance
 * - Low food increases illness chance
 * - Late months increase weather event chance
 */
export function rollForEvent(
  state: GameState,
  randomValue: number,
): CurrentEvent | null {
  // ~40% chance of no event per turn
  if (randomValue > 0.6) return null

  // Distribute the random value across templates
  let cumulative = 0
  for (const template of EVENT_TEMPLATES) {
    let prob = template.baseProbability

    // Modifier: poor health increases illness
    if (template.type === 'illness') {
      if (state.party.health === 'poor') prob *= 1.5
      if (state.party.health === 'veryPoor') prob *= 2.0
    }

    // Modifier: low food increases illness
    if (template.type === 'illness' && state.supplies.food < 20) {
      prob *= 1.5
    }

    // Modifier: late months increase weather severity
    if (template.type === 'weather' && state.month >= 10) {
      prob *= 1.5
    }

    cumulative += prob
    if (randomValue < cumulative) {
      return {
        type: template.type,
        message: template.messageTemplate,
        severity: template.severity,
      }
    }
  }

  return null
}

/**
 * Apply event consequences to the game state.
 * Returns partial state updates.
 */
export function resolveEvent(
  state: GameState,
  event: CurrentEvent,
  randomValue: number,
): Partial<GameState> {
  const supplies = { ...state.supplies }
  const party = { ...state.party }
  const updates: Partial<GameState> = {}

  switch (event.type) {
    case 'illness':
      applyIllnessEffect(event.severity, party, supplies, randomValue)
      break
    case 'weather':
      applyWeatherEffect(event.severity, supplies, updates)
      break
    case 'equipment':
      applyEquipmentEffect(event.severity, supplies)
      break
    case 'theft':
      applyTheftEffect(event.severity, supplies, randomValue)
      break
    case 'encounter':
      applyEncounterEffect(event.severity, supplies, randomValue)
      break
    case 'lostTrail':
      applyLostTrailEffect(event.severity, updates)
      break
  }

  return { ...updates, supplies, party }
}

function applyIllnessEffect(
  severity: EventSeverity,
  party: GameState['party'],
  supplies: GameState['supplies'],
  randomValue: number,
) {
  if (severity === 'minor') {
    // Use medicine (misc supplies)
    supplies.miscellaneousSupplies = Math.max(
      0,
      supplies.miscellaneousSupplies - 1,
    )
  } else if (severity === 'moderate') {
    supplies.miscellaneousSupplies = Math.max(
      0,
      supplies.miscellaneousSupplies - 2,
    )
    // Health worsens
    const healthOrder = ['good', 'fair', 'poor', 'veryPoor'] as const
    const idx = healthOrder.indexOf(party.health)
    if (idx < healthOrder.length - 1) {
      party.health = healthOrder[idx + 1]
    }
  } else {
    // Severe — possible death
    supplies.miscellaneousSupplies = Math.max(
      0,
      supplies.miscellaneousSupplies - 3,
    )
    party.health = 'veryPoor'
    if (randomValue < 0.3) {
      killRandomMember(party, randomValue)
    }
  }
}

function applyWeatherEffect(
  severity: EventSeverity,
  supplies: GameState['supplies'],
  updates: Partial<GameState>,
) {
  if (severity === 'minor') {
    // Delays — no supply loss, just slower (handled in travel)
  } else if (severity === 'moderate') {
    // Damages supplies
    supplies.food = Math.max(0, supplies.food - 20)
    supplies.miscellaneousSupplies = Math.max(
      0,
      supplies.miscellaneousSupplies - 1,
    )
  } else {
    // Severe — significant supply loss, trapped
    supplies.food = Math.max(0, supplies.food - 40)
    supplies.clothing = Math.max(0, supplies.clothing - 1)
    updates.milesTraveled = undefined // Will be handled by caller
  }
}

function applyEquipmentEffect(
  severity: EventSeverity,
  supplies: GameState['supplies'],
) {
  if (severity === 'minor') {
    supplies.miscellaneousSupplies = Math.max(
      0,
      supplies.miscellaneousSupplies - 1,
    )
  } else {
    supplies.miscellaneousSupplies = Math.max(
      0,
      supplies.miscellaneousSupplies - 2,
    )
    // Moderate/severe equipment failure can damage oxen
    if (severity === 'severe') {
      supplies.oxen = Math.max(0, supplies.oxen - 20)
    }
  }
}

function applyTheftEffect(
  severity: EventSeverity,
  supplies: GameState['supplies'],
  randomValue: number,
) {
  if (severity === 'minor') {
    // Small theft
    supplies.food = Math.max(0, supplies.food - 15)
  } else {
    // Bandits — lose food, ammo, some money
    supplies.food = Math.max(0, supplies.food - 30)
    supplies.ammunition = Math.max(0, supplies.ammunition - 10)
    if (randomValue < 0.5) {
      supplies.money = Math.max(0, supplies.money - 20)
    }
  }
}

function applyEncounterEffect(
  severity: EventSeverity,
  supplies: GameState['supplies'],
  randomValue: number,
) {
  if (severity === 'minor') {
    // Positive encounter — find supplies
    if (randomValue < 0.5) {
      supplies.food += 20
    } else {
      supplies.clothing += 1
    }
  } else {
    // Hostile — lose ammunition defending, possible supply loss
    supplies.ammunition = Math.max(0, supplies.ammunition - 15)
    if (randomValue < 0.3) {
      supplies.oxen = Math.max(0, supplies.oxen - 20)
    }
  }
}

function applyLostTrailEffect(
  severity: EventSeverity,
  updates: Partial<GameState>,
) {
  // Lost trail wastes time (no additional miles this turn is handled by the phase)
  if (severity === 'moderate') {
    // Severely lost — extra delay handled by the reducer
    updates.weather = 'cool' // weather shifts during delay
  }
}

function killRandomMember(party: GameState['party'], randomValue: number) {
  const members: (keyof GameState['party'])[] = [
    'member2Alive',
    'member3Alive',
    'member4Alive',
    'member5Alive',
    'member1Alive',
  ]

  const alive = members.filter((m) => party[m] === true)

  if (alive.length > 0) {
    const victimKey = alive[Math.floor(randomValue * 100) % alive.length]
    ;(party as unknown as Record<string, boolean>)[victimKey] = false
  }
}
