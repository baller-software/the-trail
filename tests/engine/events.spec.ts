import { describe, it, expect } from 'vitest'
import { rollForEvent, resolveEvent } from '../../src/engine/events'
import { createInitialState } from '../../src/engine/state'

describe('rollForEvent', () => {
  it('returns null for high random values (no event)', () => {
    const state = createInitialState()
    state.supplies.food = 100
    expect(rollForEvent(state, 0.95)).toBeNull()
  })

  it('returns an event for low random values', () => {
    const state = createInitialState()
    state.supplies.food = 100
    const event = rollForEvent(state, 0.05)
    expect(event).not.toBeNull()
    expect(event?.type).toBeDefined()
    expect(event?.message).toBeDefined()
  })

  it('increases illness chance when health is poor', () => {
    const healthyState = {
      ...createInitialState(),
      supplies: { ...createInitialState().supplies, food: 100 },
    }
    healthyState.party.health = 'good'

    const sickState = {
      ...createInitialState(),
      supplies: { ...createInitialState().supplies, food: 100 },
    }
    sickState.party.health = 'veryPoor'

    // With the same seed, sick party should get events that healthy party might not
    let sickEvents = 0
    let healthyEvents = 0
    for (let i = 0; i < 100; i++) {
      const seed = i / 100
      if (rollForEvent(sickState, seed) !== null) sickEvents++
      if (rollForEvent(healthyState, seed) !== null) healthyEvents++
    }
    expect(sickEvents).toBeGreaterThanOrEqual(healthyEvents)
  })
})

describe('resolveEvent', () => {
  it('resolves illness events by reducing misc supplies', () => {
    const state = createInitialState()
    state.supplies.miscellaneousSupplies = 5
    const event = {
      type: 'illness' as const,
      message: 'TEST',
      severity: 'minor' as const,
    }
    const updates = resolveEvent(state, event, 0.5)
    expect(updates.supplies!.miscellaneousSupplies).toBeLessThan(5)
  })

  it('resolves theft events by reducing food', () => {
    const state = createInitialState()
    state.supplies.food = 100
    const event = {
      type: 'theft' as const,
      message: 'TEST',
      severity: 'minor' as const,
    }
    const updates = resolveEvent(state, event, 0.5)
    expect(updates.supplies!.food).toBeLessThan(100)
  })

  it('positive encounters can add supplies', () => {
    const state = createInitialState()
    state.supplies.food = 50
    const event = {
      type: 'encounter' as const,
      message: 'TEST',
      severity: 'minor' as const,
    }
    const updates = resolveEvent(state, event, 0.3) // randomValue < 0.5 → food
    expect(updates.supplies!.food).toBeGreaterThan(50)
  })
})
