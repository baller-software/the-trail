import type { Landmark } from '../engine/types'

/**
 * Trail landmarks based on the 1971 original's documented route.
 * Distances are approximate miles from Independence, MO.
 * The original game divided ~2000 miles into ~12 two-week turns.
 */
export const LANDMARKS: readonly Landmark[] = [
  {
    name: 'INDEPENDENCE, MO',
    mileFromStart: 0,
    type: 'landmark',
    description: 'YOUR JOURNEY BEGINS AT INDEPENDENCE, MISSOURI.',
  },
  {
    name: 'KANSAS RIVER CROSSING',
    mileFromStart: 102,
    type: 'river',
    description: 'THE KANSAS RIVER LIES AHEAD.',
    riverDepth: 4,
    ferryPrice: 5,
  },
  {
    name: 'BIG BLUE RIVER CROSSING',
    mileFromStart: 185,
    type: 'river',
    description: 'YOU MUST CROSS THE BIG BLUE RIVER.',
    riverDepth: 3,
    ferryPrice: 5,
  },
  {
    name: 'FORT KEARNEY',
    mileFromStart: 304,
    type: 'fort',
    description: 'YOU HAVE ARRIVED AT FORT KEARNEY.',
  },
  {
    name: 'CHIMNEY ROCK',
    mileFromStart: 554,
    type: 'landmark',
    description: 'YOU CAN SEE CHIMNEY ROCK IN THE DISTANCE.',
  },
  {
    name: 'FORT LARAMIE',
    mileFromStart: 640,
    type: 'fort',
    description: 'YOU HAVE ARRIVED AT FORT LARAMIE.',
  },
  {
    name: 'INDEPENDENCE ROCK',
    mileFromStart: 830,
    type: 'landmark',
    description: 'YOU HAVE REACHED INDEPENDENCE ROCK.',
  },
  {
    name: 'SOUTH PASS',
    mileFromStart: 932,
    type: 'landmark',
    description: 'YOU ARE CROSSING SOUTH PASS THROUGH THE ROCKY MOUNTAINS.',
  },
  {
    name: 'GREEN RIVER CROSSING',
    mileFromStart: 985,
    type: 'river',
    description: 'THE GREEN RIVER BLOCKS YOUR PATH.',
    riverDepth: 6,
    ferryPrice: 8,
  },
  {
    name: 'FORT BRIDGER',
    mileFromStart: 1025,
    type: 'fort',
    description: 'YOU HAVE ARRIVED AT FORT BRIDGER.',
  },
  {
    name: 'SODA SPRINGS',
    mileFromStart: 1160,
    type: 'landmark',
    description: 'YOU HAVE REACHED SODA SPRINGS.',
  },
  {
    name: 'FORT HALL',
    mileFromStart: 1220,
    type: 'fort',
    description: 'YOU HAVE ARRIVED AT FORT HALL.',
  },
  {
    name: 'SNAKE RIVER CROSSING',
    mileFromStart: 1400,
    type: 'river',
    description: 'THE SNAKE RIVER IS WIDE AND DANGEROUS.',
    riverDepth: 8,
    ferryPrice: 10,
  },
  {
    name: 'FORT BOISE',
    mileFromStart: 1500,
    type: 'fort',
    description: 'YOU HAVE ARRIVED AT FORT BOISE.',
  },
  {
    name: 'BLUE MOUNTAINS',
    mileFromStart: 1650,
    type: 'landmark',
    description: 'YOU MUST CROSS THE BLUE MOUNTAINS.',
  },
  {
    name: 'THE DALLES',
    mileFromStart: 1800,
    type: 'river',
    description: 'YOU HAVE REACHED THE DALLES ON THE COLUMBIA RIVER.',
    riverDepth: 10,
    ferryPrice: 12,
  },
  {
    name: 'OREGON CITY, OR',
    mileFromStart: 2040,
    type: 'landmark',
    description:
      'CONGRATULATIONS! YOU HAVE REACHED OREGON CITY AND THE WILLAMETTE VALLEY!',
  },
] as const

export const TOTAL_MILES = 2040
export const FINAL_LANDMARK_INDEX = LANDMARKS.length - 1
