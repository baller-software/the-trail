import {
  HUNTING_THRESHOLDS,
  HUNTING_FOOD_REWARDS,
  AMMUNITION_PER_HUNT,
} from '../data/events'

export type HuntingResult = 'excellent' | 'good' | 'fair' | 'poor' | 'miss'

/**
 * Calculate hunting result based on typing speed and accuracy.
 */
export function calculateHuntingResult(
  elapsedMs: number,
  correct: boolean,
): HuntingResult {
  if (!correct) return 'miss'

  if (elapsedMs < HUNTING_THRESHOLDS.excellent) return 'excellent'
  if (elapsedMs < HUNTING_THRESHOLDS.good) return 'good'
  if (elapsedMs < HUNTING_THRESHOLDS.fair) return 'fair'
  return 'poor'
}

/**
 * Get food reward for a hunting result.
 */
export function getHuntingFoodReward(result: HuntingResult): number {
  return HUNTING_FOOD_REWARDS[result]
}

/**
 * Get ammunition consumed per hunt.
 */
export function getAmmunitionCost(): number {
  return AMMUNITION_PER_HUNT
}

/**
 * Get a descriptive message for the hunting result.
 */
export function getHuntingMessage(result: HuntingResult, food: number): string {
  switch (result) {
    case 'excellent':
      return `EXCELLENT SHOT! YOU GOT ${food} POUNDS OF FOOD.`
    case 'good':
      return `GOOD SHOT! YOU GOT ${food} POUNDS OF FOOD.`
    case 'fair':
      return `FAIR SHOT. YOU GOT ${food} POUNDS OF FOOD.`
    case 'poor':
      return `POOR SHOT. YOU ONLY GOT ${food} POUNDS OF FOOD.`
    case 'miss':
      return 'YOU MISSED! NO FOOD THIS TIME.'
  }
}
