import { useContext } from 'react'
import { GameDispatchContext } from '../context/GameContext'
import type { GameAction } from '../engine/actions'
import type { Dispatch } from 'react'

export function useGameDispatch(): Dispatch<GameAction> {
  const dispatch = useContext(GameDispatchContext)
  if (dispatch === null) {
    throw new Error('useGameDispatch must be used within a GameProvider')
  }
  return dispatch
}
