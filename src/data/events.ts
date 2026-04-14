import type { EventTemplate } from '../engine/types'

/**
 * Event probability tables based on the 1975 BASIC source listing.
 *
 * The original used a simple random number check each turn to determine
 * which (if any) event occurred. Probabilities here are per-turn base
 * chances. Some are modified by game state (e.g., illness increases
 * with poor health/rations).
 */

export const EVENT_TEMPLATES: readonly EventTemplate[] = [
  // Illness events
  {
    type: 'illness',
    baseProbability: 0.12,
    messageTemplate: 'WILD ILLNESS STRIKES YOUR PARTY.',
    severity: 'minor',
  },
  {
    type: 'illness',
    baseProbability: 0.06,
    messageTemplate: 'A MEMBER OF YOUR PARTY HAS TYPHOID.',
    severity: 'moderate',
  },
  {
    type: 'illness',
    baseProbability: 0.04,
    messageTemplate: 'A MEMBER OF YOUR PARTY HAS CHOLERA.',
    severity: 'severe',
  },
  {
    type: 'illness',
    baseProbability: 0.03,
    messageTemplate: 'A MEMBER OF YOUR PARTY HAS DYSENTERY.',
    severity: 'severe',
  },
  {
    type: 'illness',
    baseProbability: 0.05,
    messageTemplate: 'A MEMBER OF YOUR PARTY HAS MEASLES.',
    severity: 'moderate',
  },

  // Weather events
  {
    type: 'weather',
    baseProbability: 0.08,
    messageTemplate: 'HEAVY RAINS SLOW YOUR PROGRESS.',
    severity: 'minor',
  },
  {
    type: 'weather',
    baseProbability: 0.04,
    messageTemplate: 'A SEVERE HAILSTORM DAMAGES YOUR SUPPLIES.',
    severity: 'moderate',
  },
  {
    type: 'weather',
    baseProbability: 0.03,
    // Probability increases in late months (modifier applied in engine)
    messageTemplate: 'A BLIZZARD TRAPS YOUR PARTY.',
    severity: 'severe',
  },

  // Equipment events
  {
    type: 'equipment',
    baseProbability: 0.08,
    messageTemplate: 'A WAGON WHEEL BREAKS.',
    severity: 'minor',
  },
  {
    type: 'equipment',
    baseProbability: 0.05,
    messageTemplate: 'A WAGON AXLE BREAKS.',
    severity: 'moderate',
  },
  {
    type: 'equipment',
    baseProbability: 0.04,
    messageTemplate: 'YOUR WAGON TONGUE BREAKS.',
    severity: 'moderate',
  },

  // Theft events
  {
    type: 'theft',
    baseProbability: 0.04,
    messageTemplate: 'THIEVES RAIDED YOUR CAMP DURING THE NIGHT.',
    severity: 'minor',
  },
  {
    type: 'theft',
    baseProbability: 0.02,
    messageTemplate: 'BANDITS ATTACK YOUR WAGON TRAIN.',
    severity: 'moderate',
  },

  // Encounter events
  {
    type: 'encounter',
    baseProbability: 0.06,
    messageTemplate: 'YOU FIND AN ABANDONED WAGON ON THE TRAIL.',
    severity: 'minor',
  },
  {
    type: 'encounter',
    baseProbability: 0.05,
    messageTemplate: 'FRIENDLY INDIANS HELP YOU FIND YOUR WAY.',
    severity: 'minor',
  },
  {
    type: 'encounter',
    baseProbability: 0.03,
    messageTemplate: 'HOSTILE RIDERS ARE APPROACHING.',
    severity: 'moderate',
  },

  // Lost trail
  {
    type: 'lostTrail',
    baseProbability: 0.06,
    messageTemplate: 'YOU HAVE LOST THE TRAIL.',
    severity: 'minor',
  },
  {
    type: 'lostTrail',
    baseProbability: 0.03,
    messageTemplate: 'YOU ARE HOPELESSLY LOST IN THE WILDERNESS.',
    severity: 'moderate',
  },
] as const

/**
 * Hunting words — the player must type one of these quickly.
 * The original used "BANG" but also "BLAM", "POW" per some sources.
 */
export const HUNTING_WORDS = ['BANG', 'BLAM', 'POW', 'WHAM', 'BOOM'] as const

/**
 * Hunting timing thresholds (milliseconds).
 * Food reward brackets based on typing speed.
 */
export const HUNTING_THRESHOLDS = {
  excellent: 1000, // < 1 second
  good: 2000, // 1-2 seconds
  fair: 4000, // 2-4 seconds
  // > 4 seconds = poor
} as const

export const HUNTING_FOOD_REWARDS = {
  excellent: 100, // lbs of food
  good: 60,
  fair: 30,
  poor: 10,
  miss: 0,
} as const

export const AMMUNITION_PER_HUNT = 10
