import type { GameState, OutputLine } from './types'
import type { GameAction } from './actions'
import { createInitialState, getAliveCount } from './state'
import {
  calculateMilesTraveled,
  calculateFoodConsumed,
  advanceDate,
  checkLandmarkArrival,
  determineWeather,
} from './travel'
import { updateHealth, checkPartyDeath, checkGameEndConditions } from './health'
import { LANDMARKS, FINAL_LANDMARK_INDEX } from '../data/landmarks'
import { rollForEvent, resolveEvent } from './events'
import {
  calculateHuntingResult,
  getHuntingFoodReward,
  getAmmunitionCost,
} from './hunting'
import { resolveRiverCrossing } from './river'

function appendOutput(
  state: GameState,
  lines: OutputLine | OutputLine[],
): GameState {
  const newLines = Array.isArray(lines) ? lines : [lines]
  return { ...state, output: [...state.output, ...newLines] }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, phase: 'setup' }

    case 'BUY_SUPPLIES': {
      const updates = action.payload
      const newSupplies = { ...state.supplies }
      let totalCost = 0

      if (updates.oxen !== undefined) {
        newSupplies.oxen += updates.oxen
        totalCost += updates.oxen
      }
      if (updates.food !== undefined) {
        newSupplies.food += updates.food
        totalCost += updates.food
      }
      if (updates.ammunition !== undefined) {
        newSupplies.ammunition += updates.ammunition
        totalCost += updates.ammunition
      }
      if (updates.clothing !== undefined) {
        newSupplies.clothing += updates.clothing
        totalCost += updates.clothing
      }
      if (updates.miscellaneousSupplies !== undefined) {
        newSupplies.miscellaneousSupplies += updates.miscellaneousSupplies
        totalCost += updates.miscellaneousSupplies
      }

      newSupplies.money = state.supplies.money - totalCost

      return { ...state, supplies: newSupplies }
    }

    case 'FINISH_SETUP':
      return { ...state, phase: 'traveling' }

    case 'TRAVEL': {
      const seed = action.payload.randomSeed
      const weatherRandom = (((seed * 13.37) % 1) + 1) % 1
      const milesRandom = (((seed * 7.91) % 1) + 1) % 1
      const deathRandom = (((seed * 3.14) % 1) + 1) % 1

      const aliveCount = getAliveCount(state)
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

      const newHealth = updateHealth(
        state.party.health,
        state.rations,
        weather,
        state.supplies.clothing,
        false,
        newFood,
      )

      let newParty = { ...state.party, health: newHealth }

      // Check for party member death
      const deathVictim = checkPartyDeath(
        {
          ...state,
          party: newParty,
          supplies: { ...state.supplies, food: newFood },
        },
        deathRandom,
      )
      if (deathVictim > 0) {
        const key = `member${deathVictim}Alive` as keyof typeof newParty
        newParty = { ...newParty, [key]: false }
      }

      const { arrived, newLandmarkIndex } = checkLandmarkArrival(
        newMiles,
        state.currentLandmarkIndex,
      )

      // Check if reached Oregon
      if (newLandmarkIndex >= FINAL_LANDMARK_INDEX) {
        return {
          ...state,
          turnNumber: state.turnNumber + 1,
          month,
          day,
          weather,
          milesTraveled: newMiles,
          currentLandmarkIndex: newLandmarkIndex,
          supplies: { ...state.supplies, food: newFood },
          party: newParty,
          phase: 'gameOver',
          gameOverReason: 'reachedOregon',
        }
      }

      let updatedState: GameState = {
        ...state,
        turnNumber: state.turnNumber + 1,
        month,
        day,
        weather,
        milesTraveled: newMiles,
        currentLandmarkIndex: newLandmarkIndex,
        supplies: { ...state.supplies, food: newFood },
        party: newParty,
      }

      // Check game end conditions
      const endCheck = checkGameEndConditions(updatedState)
      if (endCheck.isGameOver) {
        return {
          ...updatedState,
          phase: 'gameOver',
          gameOverReason: endCheck.reason,
        }
      }

      // Roll for random event
      const eventRandom = (((seed * 5.23) % 1) + 1) % 1
      const event = rollForEvent(updatedState, eventRandom)
      if (event) {
        return {
          ...updatedState,
          phase: 'event',
          currentEvent: event,
        }
      }

      // Determine next phase based on landmark arrival
      if (arrived) {
        const landmark = LANDMARKS[newLandmarkIndex]
        if (landmark.type === 'river') {
          updatedState = { ...updatedState, phase: 'river' }
        } else if (landmark.type === 'fort') {
          updatedState = { ...updatedState, phase: 'fort' }
        }
      }

      return updatedState
    }

    case 'REST': {
      const aliveCount = getAliveCount(state)
      const foodConsumed = calculateFoodConsumed(state.rations, aliveCount)
      const newFood = Math.max(0, state.supplies.food - foodConsumed)
      const { month, day } = advanceDate(state.month, state.day)
      const newHealth = updateHealth(
        state.party.health,
        state.rations,
        state.weather,
        state.supplies.clothing,
        true,
        newFood,
      )

      return {
        ...state,
        turnNumber: state.turnNumber + 1,
        month,
        day,
        party: { ...state.party, health: newHealth },
        supplies: { ...state.supplies, food: newFood },
      }
    }

    case 'START_HUNT':
      return { ...state, phase: 'hunting' }

    case 'FINISH_HUNT': {
      const { elapsedMs, correct } = action.payload
      const result = calculateHuntingResult(elapsedMs, correct)
      const foodGained = getHuntingFoodReward(result)
      const ammoCost = getAmmunitionCost()

      return {
        ...state,
        phase: 'traveling',
        supplies: {
          ...state.supplies,
          food: state.supplies.food + foodGained,
          ammunition: Math.max(0, state.supplies.ammunition - ammoCost),
        },
      }
    }

    case 'SET_PACE':
      return { ...state, pace: action.payload }

    case 'SET_RATIONS':
      return { ...state, rations: action.payload }

    case 'CROSS_RIVER': {
      const landmark = LANDMARKS[state.currentLandmarkIndex]
      const crossingResult = resolveRiverCrossing(
        action.payload.method,
        landmark,
        action.payload.randomSeed,
      )

      const riverSupplies = { ...state.supplies }
      riverSupplies.food = Math.max(
        0,
        riverSupplies.food - crossingResult.foodLost,
      )
      riverSupplies.miscellaneousSupplies = Math.max(
        0,
        riverSupplies.miscellaneousSupplies - crossingResult.suppliesLost,
      )
      riverSupplies.oxen = Math.max(
        0,
        riverSupplies.oxen - crossingResult.oxenLost,
      )

      if (action.payload.method === 'ferry') {
        riverSupplies.money = Math.max(
          0,
          riverSupplies.money - (landmark.ferryPrice ?? 5),
        )
      }

      let riverParty = { ...state.party }
      if (crossingResult.memberDied) {
        const members: (keyof typeof riverParty)[] = [
          'member2Alive',
          'member3Alive',
          'member4Alive',
          'member5Alive',
          'member1Alive',
        ]
        const alive = members.filter((m) => riverParty[m] === true)
        if (alive.length > 0) {
          const victim =
            alive[Math.floor(action.payload.randomSeed * 100) % alive.length]
          riverParty = { ...riverParty, [victim]: false }
        }
      }

      let riverState: GameState = {
        ...state,
        phase: 'traveling',
        supplies: riverSupplies,
        party: riverParty,
      }

      const endCheck = checkGameEndConditions(riverState)
      if (endCheck.isGameOver) {
        riverState = {
          ...riverState,
          phase: 'gameOver',
          gameOverReason: endCheck.reason,
        }
      }

      return riverState
    }

    case 'RESOLVE_EVENT': {
      if (!state.currentEvent) {
        return { ...state, phase: 'traveling', currentEvent: null }
      }

      const eventUpdates = resolveEvent(
        state,
        state.currentEvent,
        action.payload.randomSeed,
      )

      let eventState: GameState = {
        ...state,
        ...eventUpdates,
        supplies: eventUpdates.supplies ?? state.supplies,
        party: eventUpdates.party ?? state.party,
        phase: 'traveling',
        currentEvent: null,
      }

      const eventEndCheck = checkGameEndConditions(eventState)
      if (eventEndCheck.isGameOver) {
        eventState = {
          ...eventState,
          phase: 'gameOver',
          gameOverReason: eventEndCheck.reason,
        }
      }

      return eventState
    }

    case 'BUY_AT_FORT': {
      const updates = action.payload
      const newSupplies = { ...state.supplies }
      let totalCost = 0

      if (updates.food !== undefined) {
        newSupplies.food += updates.food
        totalCost += updates.food
      }
      if (updates.ammunition !== undefined) {
        newSupplies.ammunition += updates.ammunition
        totalCost += updates.ammunition
      }
      if (updates.clothing !== undefined) {
        newSupplies.clothing += updates.clothing
        totalCost += updates.clothing
      }
      if (updates.miscellaneousSupplies !== undefined) {
        newSupplies.miscellaneousSupplies += updates.miscellaneousSupplies
        totalCost += updates.miscellaneousSupplies
      }

      newSupplies.money = state.supplies.money - totalCost

      return { ...state, supplies: newSupplies }
    }

    case 'LEAVE_FORT':
      return { ...state, phase: 'traveling' }

    case 'NEW_GAME':
      return createInitialState()

    case 'APPEND_OUTPUT':
      return appendOutput(state, action.payload)

    default: {
      const _exhaustive: never = action
      return _exhaustive
    }
  }
}
