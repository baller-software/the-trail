import type { Landmark } from './types'

export type CrossingMethod = 'ford' | 'caulk' | 'wait' | 'ferry'

export interface CrossingResult {
  success: boolean
  message: string
  foodLost: number
  suppliesLost: number
  oxenLost: number
  memberDied: boolean
}

/**
 * Resolve a river crossing attempt.
 */
export function resolveRiverCrossing(
  method: CrossingMethod,
  landmark: Landmark,
  randomValue: number,
): CrossingResult {
  const depth = landmark.riverDepth ?? 5

  switch (method) {
    case 'ford':
      return resolveFord(depth, randomValue)
    case 'caulk':
      return resolveCaulk(depth, randomValue)
    case 'wait':
      return resolveWait()
    case 'ferry':
      return resolveFerry(landmark)
  }
}

function resolveFord(depth: number, randomValue: number): CrossingResult {
  // Deeper rivers are harder to ford
  const failChance = Math.min(0.8, depth * 0.1)

  if (randomValue < failChance) {
    // Failed ford
    const severe = randomValue < failChance * 0.3
    return {
      success: false,
      message: severe
        ? 'THE RIVER WAS TOO DEEP! SUPPLIES WERE LOST AND A MEMBER OF YOUR PARTY DROWNED.'
        : 'THE RIVER WAS TOO DEEP! SOME SUPPLIES WERE LOST.',
      foodLost: severe ? 40 : 20,
      suppliesLost: severe ? 2 : 1,
      oxenLost: 0,
      memberDied: severe,
    }
  }

  return {
    success: true,
    message: 'YOU FORDED THE RIVER SUCCESSFULLY.',
    foodLost: 0,
    suppliesLost: 0,
    oxenLost: 0,
    memberDied: false,
  }
}

function resolveCaulk(depth: number, randomValue: number): CrossingResult {
  // Caulking is safer than fording for deep rivers
  const failChance = Math.min(0.5, depth * 0.05)

  if (randomValue < failChance) {
    return {
      success: false,
      message: 'THE WAGON TIPPED WHILE FLOATING! SOME SUPPLIES WERE LOST.',
      foodLost: 30,
      suppliesLost: 1,
      oxenLost: 0,
      memberDied: false,
    }
  }

  return {
    success: true,
    message: 'YOU FLOATED ACROSS THE RIVER SUCCESSFULLY.',
    foodLost: 0,
    suppliesLost: 0,
    oxenLost: 0,
    memberDied: false,
  }
}

function resolveWait(): CrossingResult {
  return {
    success: true,
    message: 'YOU WAITED FOR CONDITIONS TO IMPROVE AND CROSSED SAFELY.',
    foodLost: 10, // Food consumed while waiting
    suppliesLost: 0,
    oxenLost: 0,
    memberDied: false,
  }
}

function resolveFerry(landmark: Landmark): CrossingResult {
  return {
    success: true,
    message: `YOU TOOK THE FERRY ACROSS FOR $${landmark.ferryPrice ?? 5}.`,
    foodLost: 0,
    suppliesLost: 0,
    oxenLost: 0,
    memberDied: false,
  }
}
