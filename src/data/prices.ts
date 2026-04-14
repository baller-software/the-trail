/**
 * Supply prices and starting budget.
 *
 * Based on the 1975 BASIC source listing (closest documented source
 * to the 1971 original). The original allocated $700 total and let
 * the player distribute it across categories.
 *
 * Prices are per-unit costs at the starting store.
 * Fort prices are marked up ~50% from starting prices.
 */

export const STARTING_BUDGET = 700

export const STARTING_PRICES = {
  oxen: 40, // per pair — need at least 1 pair ($200 for full team recommended)
  food: 0.2, // per pound
  ammunition: 2, // per box (50 rounds)
  clothing: 10, // per set
  miscellaneousSupplies: 5, // per unit (wagon parts, tools, etc.)
} as const

export const FORT_PRICE_MULTIPLIER = 1.5

/** Recommended minimum supplies for a safe journey */
export const RECOMMENDED_MINIMUMS = {
  oxen: 200, // ~5 pairs
  food: 50, // 250 lbs
  ammunition: 20, // 10 boxes
  clothing: 50, // 5 sets
  miscellaneousSupplies: 25, // 5 units
} as const
