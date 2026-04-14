import type { GameState, TravelPace, RationLevel, Weather } from './types'
import { LANDMARKS, FINAL_LANDMARK_INDEX } from '../data/landmarks'
import { getAliveCount } from './state'

/** Base miles per turn at steady pace with healthy oxen */
const BASE_MILES_PER_TURN = 70

const PACE_MULTIPLIER: Record<TravelPace, number> = {
  steady: 1.0,
  strenuous: 1.3,
  grueling: 1.6,
}

const FOOD_PER_PERSON_PER_TURN: Record<RationLevel, number> = {
  filling: 5,
  meager: 3,
  bareBones: 1,
}

/** Days per turn — roughly two weeks */
const DAYS_PER_TURN = 14

/**
 * Determine weather based on month and randomness.
 * Later months have harsher weather.
 */
export function determineWeather(month: number, randomValue: number): Weather {
  if (month >= 11) {
    // November+: mostly cold/snowy
    if (randomValue < 0.3) return 'cold'
    if (randomValue < 0.7) return 'snowy'
    return 'cold'
  }
  if (month >= 9) {
    // September-October: cool to cold
    if (randomValue < 0.3) return 'warm'
    if (randomValue < 0.6) return 'cool'
    if (randomValue < 0.8) return 'cold'
    if (randomValue < 0.9) return 'rainy'
    return 'snowy'
  }
  if (month >= 6) {
    // June-August: mostly warm
    if (randomValue < 0.5) return 'warm'
    if (randomValue < 0.8) return 'cool'
    return 'rainy'
  }
  // March-May: cool with some rain
  if (randomValue < 0.3) return 'warm'
  if (randomValue < 0.6) return 'cool'
  return 'rainy'
}

/**
 * Calculate miles traveled this turn.
 * Factors: pace, oxen count, weather.
 */
export function calculateMilesTraveled(
  pace: TravelPace,
  oxen: number,
  weather: Weather,
  randomValue: number,
): number {
  let miles = BASE_MILES_PER_TURN * PACE_MULTIPLIER[pace]

  // Oxen health factor: more oxen = faster travel, 0 oxen = no travel
  if (oxen <= 0) return 0
  const oxenFactor = Math.min(oxen / 200, 1.2) // $200 worth = baseline
  miles *= oxenFactor

  // Weather penalty
  if (weather === 'rainy') miles *= 0.7
  if (weather === 'cold') miles *= 0.6
  if (weather === 'snowy') miles *= 0.4

  // Small random variation (+/- 20%)
  miles *= 0.8 + randomValue * 0.4

  return Math.round(miles)
}

/**
 * Calculate food consumed this turn.
 */
export function calculateFoodConsumed(
  rations: RationLevel,
  aliveCount: number,
): number {
  return FOOD_PER_PERSON_PER_TURN[rations] * aliveCount
}

/**
 * Advance the date by one turn (14 days).
 */
export function advanceDate(
  month: number,
  day: number,
): { month: number; day: number } {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let newDay = day + DAYS_PER_TURN
  let newMonth = month

  while (newDay > daysInMonth[newMonth]) {
    newDay -= daysInMonth[newMonth]
    newMonth++
    if (newMonth > 12) {
      newMonth = 12
      newDay = 31
      break
    }
  }

  return { month: newMonth, day: newDay }
}

/**
 * Check if the party has reached or passed the next landmark.
 */
export function checkLandmarkArrival(
  milesTraveled: number,
  currentLandmarkIndex: number,
): { arrived: boolean; newLandmarkIndex: number } {
  let newIndex = currentLandmarkIndex
  while (
    newIndex < FINAL_LANDMARK_INDEX &&
    milesTraveled >= LANDMARKS[newIndex + 1].mileFromStart
  ) {
    newIndex++
  }
  return {
    arrived: newIndex > currentLandmarkIndex,
    newLandmarkIndex: newIndex,
  }
}

/**
 * Process a full travel turn. Returns partial state updates.
 */
export function processTravelTurn(
  state: GameState,
  randomSeed: number,
): Partial<GameState> {
  const aliveCount = getAliveCount(state)
  // Use different bits of the seed for different rolls
  const weatherRandom = (((randomSeed * 13.37) % 1) + 1) % 1
  const milesRandom = (((randomSeed * 7.91) % 1) + 1) % 1

  const weather = determineWeather(state.month, weatherRandom)
  const milesMade = calculateMilesTraveled(
    state.pace,
    state.supplies.oxen,
    weather,
    milesRandom,
  )
  const foodConsumed = calculateFoodConsumed(state.rations, aliveCount)
  const { month, day } = advanceDate(state.month, state.day)
  const newMiles = state.milesTraveled + milesMade
  const newFood = Math.max(0, state.supplies.food - foodConsumed)

  const { arrived, newLandmarkIndex } = checkLandmarkArrival(
    newMiles,
    state.currentLandmarkIndex,
  )

  return {
    turnNumber: state.turnNumber + 1,
    month,
    day,
    weather,
    milesTraveled: newMiles,
    currentLandmarkIndex: newLandmarkIndex,
    supplies: {
      ...state.supplies,
      food: newFood,
    },
    ...(arrived ? ({ _landmarkArrived: true } as Record<string, unknown>) : {}),
  }
}
