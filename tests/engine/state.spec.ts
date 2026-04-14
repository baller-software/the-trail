import { describe, it, expect } from 'vitest'
import { createInitialState, getAliveCount } from '../../src/engine/state'

describe('createInitialState', () => {
  it('creates a valid initial state', () => {
    const state = createInitialState()

    expect(state.phase).toBe('intro')
    expect(state.turnNumber).toBe(0)
    expect(state.month).toBe(3)
    expect(state.day).toBe(1)
    expect(state.milesTraveled).toBe(0)
    expect(state.currentLandmarkIndex).toBe(0)
    expect(state.pace).toBe('steady')
    expect(state.rations).toBe('filling')
    expect(state.currentEvent).toBeNull()
    expect(state.gameOverReason).toBeNull()
    expect(state.output).toEqual([])
  })

  it('starts with all party members alive', () => {
    const state = createInitialState()

    expect(state.party.member1Alive).toBe(true)
    expect(state.party.member2Alive).toBe(true)
    expect(state.party.member3Alive).toBe(true)
    expect(state.party.member4Alive).toBe(true)
    expect(state.party.member5Alive).toBe(true)
    expect(state.party.health).toBe('good')
  })

  it('starts with zero supplies', () => {
    const state = createInitialState()

    expect(state.supplies.money).toBe(0)
    expect(state.supplies.food).toBe(0)
    expect(state.supplies.ammunition).toBe(0)
    expect(state.supplies.clothing).toBe(0)
    expect(state.supplies.oxen).toBe(0)
    expect(state.supplies.miscellaneousSupplies).toBe(0)
  })
})

describe('getAliveCount', () => {
  it('returns 5 when all members are alive', () => {
    const state = createInitialState()
    expect(getAliveCount(state)).toBe(5)
  })

  it('returns correct count when some members are dead', () => {
    const state = createInitialState()
    state.party.member2Alive = false
    state.party.member4Alive = false
    expect(getAliveCount(state)).toBe(3)
  })

  it('returns 0 when all members are dead', () => {
    const state = createInitialState()
    state.party.member1Alive = false
    state.party.member2Alive = false
    state.party.member3Alive = false
    state.party.member4Alive = false
    state.party.member5Alive = false
    expect(getAliveCount(state)).toBe(0)
  })
})
