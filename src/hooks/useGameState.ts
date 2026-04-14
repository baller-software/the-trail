import { useContext } from 'react'
import { GameStateContext } from '../context/GameContext'
import type { GameState } from '../engine/types'

export function useGameState(): GameState {
  const state = useContext(GameStateContext)
  if (state === null) {
    throw new Error('useGameState must be used within a GameProvider')
  }
  return state
}
