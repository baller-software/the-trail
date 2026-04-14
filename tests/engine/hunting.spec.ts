import { describe, it, expect } from 'vitest'
import {
  calculateHuntingResult,
  getHuntingFoodReward,
  getHuntingMessage,
} from '../../src/engine/hunting'

describe('calculateHuntingResult', () => {
  it('returns miss when incorrect word', () => {
    expect(calculateHuntingResult(500, false)).toBe('miss')
  })

  it('returns excellent for fast typing', () => {
    expect(calculateHuntingResult(800, true)).toBe('excellent')
  })

  it('returns good for moderate typing', () => {
    expect(calculateHuntingResult(1500, true)).toBe('good')
  })

  it('returns fair for slow typing', () => {
    expect(calculateHuntingResult(3000, true)).toBe('fair')
  })

  it('returns poor for very slow typing', () => {
    expect(calculateHuntingResult(5000, true)).toBe('poor')
  })
})

describe('getHuntingFoodReward', () => {
  it('excellent gives the most food', () => {
    const excellent = getHuntingFoodReward('excellent')
    const good = getHuntingFoodReward('good')
    expect(excellent).toBeGreaterThan(good)
  })

  it('miss gives no food', () => {
    expect(getHuntingFoodReward('miss')).toBe(0)
  })
})

describe('getHuntingMessage', () => {
  it('returns appropriate message for each result', () => {
    expect(getHuntingMessage('excellent', 100)).toContain('EXCELLENT')
    expect(getHuntingMessage('miss', 0)).toContain('MISSED')
  })
})
