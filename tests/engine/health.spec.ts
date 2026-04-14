import { describe, it, expect } from 'vitest'
import {
  updateHealth,
  checkPartyDeath,
  checkGameEndConditions,
} from '../../src/engine/health'
import { createInitialState } from '../../src/engine/state'

describe('updateHealth', () => {
  it('filling rations improve health', () => {
    const result = updateHealth('fair', 'filling', 'warm', 5, false)
    expect(result).toBe('good')
  })

  it('bare bones rations worsen health', () => {
    const result = updateHealth('good', 'bareBones', 'warm', 5, false)
    expect(result).toBe('fair')
  })

  it('cold weather with low clothing worsens health', () => {
    // filling improves 1, cold+low clothing worsens 1 → net 0 from good = good
    // But the logic is: start at idx=0 (good), filling → max(0, -1)=0, cold+low → 0+1=1 → fair
    const result = updateHealth('good', 'filling', 'cold', 1, false)
    expect(result).toBe('fair')
    const result2 = updateHealth('good', 'meager', 'cold', 1, false)
    expect(result2).toBe('fair')
  })

  it('resting improves health', () => {
    const result = updateHealth('poor', 'meager', 'warm', 5, true)
    expect(result).toBe('fair')
  })
})

describe('checkPartyDeath', () => {
  it('no death at good health with high random value', () => {
    const state = createInitialState()
    state.party.health = 'good'
    expect(checkPartyDeath(state, 0.99)).toBe(0)
  })

  it('possible death at very poor health with low random value', () => {
    const state = createInitialState()
    state.party.health = 'veryPoor'
    const result = checkPartyDeath(state, 0.01)
    expect(result).toBeGreaterThan(0)
  })
})

describe('checkGameEndConditions', () => {
  it('game continues with healthy party', () => {
    const state = createInitialState()
    state.supplies.food = 100
    state.supplies.oxen = 200
    const result = checkGameEndConditions(state)
    expect(result.isGameOver).toBe(false)
  })

  it('game over when all dead', () => {
    const state = createInitialState()
    state.party.member1Alive = false
    state.party.member2Alive = false
    state.party.member3Alive = false
    state.party.member4Alive = false
    state.party.member5Alive = false
    const result = checkGameEndConditions(state)
    expect(result.isGameOver).toBe(true)
    expect(result.reason).toBe('allDead')
  })

  it('game over when no oxen', () => {
    const state = createInitialState()
    state.supplies.oxen = 0
    state.supplies.food = 100
    const result = checkGameEndConditions(state)
    expect(result.isGameOver).toBe(true)
    expect(result.reason).toBe('noOxen')
  })

  it('game over when too late in the year', () => {
    const state = createInitialState()
    state.month = 12
    state.day = 20
    state.supplies.food = 100
    state.supplies.oxen = 200
    const result = checkGameEndConditions(state)
    expect(result.isGameOver).toBe(true)
    expect(result.reason).toBe('tooLate')
  })
})
