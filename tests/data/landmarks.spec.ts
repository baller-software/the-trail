import { describe, it, expect } from 'vitest'
import {
  LANDMARKS,
  TOTAL_MILES,
  FINAL_LANDMARK_INDEX,
} from '../../src/data/landmarks'

describe('landmarks', () => {
  it('starts at Independence, MO', () => {
    expect(LANDMARKS[0].name).toBe('INDEPENDENCE, MO')
    expect(LANDMARKS[0].mileFromStart).toBe(0)
  })

  it('ends at Oregon City, OR', () => {
    const last = LANDMARKS[LANDMARKS.length - 1]
    expect(last.name).toBe('OREGON CITY, OR')
    expect(last.mileFromStart).toBe(TOTAL_MILES)
  })

  it('landmarks are ordered by distance', () => {
    for (let i = 1; i < LANDMARKS.length; i++) {
      expect(LANDMARKS[i].mileFromStart).toBeGreaterThan(
        LANDMARKS[i - 1].mileFromStart,
      )
    }
  })

  it('river landmarks have depth and ferry price', () => {
    const rivers = LANDMARKS.filter((l) => l.type === 'river')
    expect(rivers.length).toBeGreaterThan(0)
    for (const river of rivers) {
      expect(river.riverDepth).toBeDefined()
      expect(river.riverDepth).toBeGreaterThan(0)
      expect(river.ferryPrice).toBeDefined()
      expect(river.ferryPrice).toBeGreaterThan(0)
    }
  })

  it('has forts along the trail', () => {
    const forts = LANDMARKS.filter((l) => l.type === 'fort')
    expect(forts.length).toBeGreaterThanOrEqual(4)
  })

  it('FINAL_LANDMARK_INDEX points to the last landmark', () => {
    expect(FINAL_LANDMARK_INDEX).toBe(LANDMARKS.length - 1)
  })

  it('all landmarks have descriptions', () => {
    for (const landmark of LANDMARKS) {
      expect(landmark.description).toBeTruthy()
    }
  })
})
