import { describe, it, expect } from 'vitest'
import {
  determineWeather,
  calculateMilesTraveled,
  calculateFoodConsumed,
  advanceDate,
  checkLandmarkArrival,
} from '../../src/engine/travel'

describe('determineWeather', () => {
  it('returns warm weather in summer months', () => {
    expect(determineWeather(7, 0.1)).toBe('warm')
  })

  it('returns cold or snowy in November+', () => {
    const weather = determineWeather(11, 0.5)
    expect(['cold', 'snowy']).toContain(weather)
  })

  it('can return rainy in spring', () => {
    expect(determineWeather(4, 0.9)).toBe('rainy')
  })
})

describe('calculateMilesTraveled', () => {
  it('returns 0 with no oxen', () => {
    expect(calculateMilesTraveled('steady', 0, 'warm', 0.5)).toBe(0)
  })

  it('grueling pace covers more miles than steady', () => {
    const steady = calculateMilesTraveled('steady', 200, 'warm', 0.5)
    const grueling = calculateMilesTraveled('grueling', 200, 'warm', 0.5)
    expect(grueling).toBeGreaterThan(steady)
  })

  it('snow reduces miles traveled', () => {
    const warm = calculateMilesTraveled('steady', 200, 'warm', 0.5)
    const snowy = calculateMilesTraveled('steady', 200, 'snowy', 0.5)
    expect(snowy).toBeLessThan(warm)
  })

  it('returns positive miles with adequate oxen', () => {
    const miles = calculateMilesTraveled('steady', 200, 'warm', 0.5)
    expect(miles).toBeGreaterThan(0)
  })
})

describe('calculateFoodConsumed', () => {
  it('filling rations consume more food', () => {
    const filling = calculateFoodConsumed('filling', 5)
    const meager = calculateFoodConsumed('meager', 5)
    expect(filling).toBeGreaterThan(meager)
  })

  it('more alive members consume more food', () => {
    const five = calculateFoodConsumed('filling', 5)
    const three = calculateFoodConsumed('filling', 3)
    expect(five).toBeGreaterThan(three)
  })

  it('bare bones consumes the least', () => {
    const bareBones = calculateFoodConsumed('bareBones', 5)
    const meager = calculateFoodConsumed('meager', 5)
    expect(bareBones).toBeLessThan(meager)
  })
})

describe('advanceDate', () => {
  it('advances by approximately 14 days', () => {
    const { month, day } = advanceDate(3, 1)
    expect(month).toBe(3)
    expect(day).toBe(15)
  })

  it('rolls over to next month correctly', () => {
    const { month, day } = advanceDate(3, 25)
    expect(month).toBe(4)
    expect(day).toBeGreaterThan(0)
  })

  it('caps at December 31', () => {
    const { month, day } = advanceDate(12, 25)
    expect(month).toBe(12)
    expect(day).toBe(31)
  })
})

describe('checkLandmarkArrival', () => {
  it('detects arrival at next landmark', () => {
    const result = checkLandmarkArrival(110, 0)
    expect(result.arrived).toBe(true)
    expect(result.newLandmarkIndex).toBeGreaterThan(0)
  })

  it('returns false when not at a landmark', () => {
    const result = checkLandmarkArrival(50, 0)
    expect(result.arrived).toBe(false)
    expect(result.newLandmarkIndex).toBe(0)
  })

  it('can skip landmarks if miles jump past multiple', () => {
    const result = checkLandmarkArrival(700, 0)
    expect(result.newLandmarkIndex).toBeGreaterThan(1)
  })
})
