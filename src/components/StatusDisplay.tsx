import type { GameState } from '../engine/types'
import { LANDMARKS } from '../data/landmarks'
import { getAliveCount } from '../engine/state'
import type { OutputLine } from '../engine/types'

const MONTH_NAMES = [
  '',
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]

export function getStatusLines(state: GameState): OutputLine[] {
  const nextLandmark =
    state.currentLandmarkIndex < LANDMARKS.length - 1
      ? LANDMARKS[state.currentLandmarkIndex + 1]
      : null

  const milesToNext = nextLandmark
    ? nextLandmark.mileFromStart - state.milesTraveled
    : 0

  const currentLandmark = LANDMARKS[state.currentLandmarkIndex]

  return [
    {
      text: '-----------------------------------',
      brightness: 'dim' as const,
    },
    {
      text: `DATE: ${MONTH_NAMES[state.month]} ${state.day}, 1848`,
      brightness: 'medium' as const,
    },
    {
      text: `WEATHER: ${state.weather.toUpperCase()}`,
      brightness: 'medium' as const,
    },
    {
      text: `HEALTH:  ${state.party.health.toUpperCase().replace('VERYPOOR', 'VERY POOR')}`,
      brightness: 'medium' as const,
    },
    {
      text: `PACE:    ${state.pace.toUpperCase()}`,
      brightness: 'medium' as const,
    },
    {
      text: `RATIONS: ${state.rations.toUpperCase().replace('BAREBONES', 'BARE BONES')}`,
      brightness: 'medium' as const,
    },
    {
      text: '-----------------------------------',
      brightness: 'dim' as const,
    },
    {
      text: `FOOD:          ${state.supplies.food} LBS`,
      brightness: 'medium' as const,
    },
    {
      text: `AMMUNITION:    ${state.supplies.ammunition}`,
      brightness: 'medium' as const,
    },
    {
      text: `CLOTHING:      ${state.supplies.clothing} SETS`,
      brightness: 'medium' as const,
    },
    {
      text: `MISC SUPPLIES: ${state.supplies.miscellaneousSupplies}`,
      brightness: 'medium' as const,
    },
    {
      text: `MONEY:         $${state.supplies.money.toFixed(2)}`,
      brightness: 'medium' as const,
    },
    {
      text: `PARTY:         ${getAliveCount(state)} ALIVE`,
      brightness: 'medium' as const,
    },
    {
      text: '-----------------------------------',
      brightness: 'dim' as const,
    },
    {
      text: `LAST STOP: ${currentLandmark.name}`,
      brightness: 'medium' as const,
    },
    ...(nextLandmark
      ? [
          {
            text: `NEXT LANDMARK: ${nextLandmark.name} (${milesToNext} MILES)`,
            brightness: 'medium' as const,
          },
        ]
      : []),
    {
      text: `MILES TRAVELED: ${state.milesTraveled}`,
      brightness: 'medium' as const,
    },
    {
      text: '-----------------------------------',
      brightness: 'dim' as const,
    },
  ]
}
