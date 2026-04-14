import { describe, it, expect } from 'vitest'
import { gameReducer } from '../../src/engine/reducer'
import { createInitialState } from '../../src/engine/state'

describe('gameReducer', () => {
  it('transitions from intro to setup on START_GAME', () => {
    const state = createInitialState()
    const next = gameReducer(state, { type: 'START_GAME' })
    expect(next.phase).toBe('setup')
  })

  it('handles BUY_SUPPLIES correctly', () => {
    const state = {
      ...createInitialState(),
      phase: 'setup' as const,
      supplies: {
        money: 500,
        food: 0,
        ammunition: 0,
        clothing: 0,
        oxen: 0,
        miscellaneousSupplies: 0,
      },
    }

    const next = gameReducer(state, {
      type: 'BUY_SUPPLIES',
      payload: { oxen: 200, food: 100 },
    })

    expect(next.supplies.oxen).toBe(200)
    expect(next.supplies.food).toBe(100)
    expect(next.supplies.money).toBe(200) // 500 - 200 - 100
  })

  it('transitions from setup to traveling on FINISH_SETUP', () => {
    const state = { ...createInitialState(), phase: 'setup' as const }
    const next = gameReducer(state, { type: 'FINISH_SETUP' })
    expect(next.phase).toBe('traveling')
  })

  it('updates pace on SET_PACE', () => {
    const state = createInitialState()
    const next = gameReducer(state, {
      type: 'SET_PACE',
      payload: 'grueling',
    })
    expect(next.pace).toBe('grueling')
  })

  it('updates rations on SET_RATIONS', () => {
    const state = createInitialState()
    const next = gameReducer(state, {
      type: 'SET_RATIONS',
      payload: 'bareBones',
    })
    expect(next.rations).toBe('bareBones')
  })

  it('resets state on NEW_GAME', () => {
    const state = {
      ...createInitialState(),
      phase: 'gameOver' as const,
      turnNumber: 10,
      milesTraveled: 1500,
    }
    const next = gameReducer(state, { type: 'NEW_GAME' })
    expect(next.phase).toBe('intro')
    expect(next.turnNumber).toBe(0)
    expect(next.milesTraveled).toBe(0)
  })

  it('appends single output line', () => {
    const state = createInitialState()
    const next = gameReducer(state, {
      type: 'APPEND_OUTPUT',
      payload: { text: 'TEST', brightness: 'medium' },
    })
    expect(next.output).toHaveLength(1)
    expect(next.output[0].text).toBe('TEST')
  })

  it('appends multiple output lines', () => {
    const state = createInitialState()
    const next = gameReducer(state, {
      type: 'APPEND_OUTPUT',
      payload: [
        { text: 'LINE 1', brightness: 'bright' },
        { text: 'LINE 2', brightness: 'dim' },
      ],
    })
    expect(next.output).toHaveLength(2)
  })

  it('handles BUY_AT_FORT correctly', () => {
    const state = {
      ...createInitialState(),
      phase: 'fort' as const,
      supplies: {
        money: 200,
        food: 50,
        ammunition: 20,
        clothing: 5,
        oxen: 4,
        miscellaneousSupplies: 3,
      },
    }

    const next = gameReducer(state, {
      type: 'BUY_AT_FORT',
      payload: { food: 30 },
    })

    expect(next.supplies.food).toBe(80)
    expect(next.supplies.money).toBe(170)
  })

  it('transitions to traveling on LEAVE_FORT', () => {
    const state = { ...createInitialState(), phase: 'fort' as const }
    const next = gameReducer(state, { type: 'LEAVE_FORT' })
    expect(next.phase).toBe('traveling')
  })
})
