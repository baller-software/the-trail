import { describe, it, expect } from 'vitest'
import { resolveRiverCrossing } from '../../src/engine/river'
import type { Landmark } from '../../src/engine/types'

const testRiver: Landmark = {
  name: 'TEST RIVER',
  mileFromStart: 100,
  type: 'river',
  description: 'A TEST RIVER',
  riverDepth: 5,
  ferryPrice: 8,
}

describe('resolveRiverCrossing', () => {
  it('ford can succeed with favorable roll', () => {
    const result = resolveRiverCrossing('ford', testRiver, 0.95)
    expect(result.success).toBe(true)
    expect(result.foodLost).toBe(0)
  })

  it('ford can fail with unfavorable roll', () => {
    const result = resolveRiverCrossing('ford', testRiver, 0.1)
    expect(result.success).toBe(false)
    expect(result.foodLost).toBeGreaterThan(0)
  })

  it('caulk is safer than ford', () => {
    // At the same random value, caulk should succeed where ford fails
    const fordResult = resolveRiverCrossing('ford', testRiver, 0.3)
    const caulkResult = resolveRiverCrossing('caulk', testRiver, 0.3)
    // Not deterministic, but caulk has lower fail chance
    expect(caulkResult.foodLost).toBeLessThanOrEqual(fordResult.foodLost)
  })

  it('wait always succeeds but costs food', () => {
    const result = resolveRiverCrossing('wait', testRiver, 0.1)
    expect(result.success).toBe(true)
    expect(result.foodLost).toBeGreaterThan(0)
  })

  it('ferry always succeeds with no supply loss', () => {
    const result = resolveRiverCrossing('ferry', testRiver, 0.1)
    expect(result.success).toBe(true)
    expect(result.foodLost).toBe(0)
    expect(result.message).toContain('$8')
  })

  it('deeper rivers are harder to ford', () => {
    const deepRiver = { ...testRiver, riverDepth: 10 }
    // Deep rivers should fail ford more often
    let deepFails = 0
    let shallowFails = 0
    for (let i = 0; i < 100; i++) {
      const seed = i / 100
      if (!resolveRiverCrossing('ford', deepRiver, seed).success) deepFails++
      if (!resolveRiverCrossing('ford', testRiver, seed).success) shallowFails++
    }
    expect(deepFails).toBeGreaterThanOrEqual(shallowFails)
  })
})
