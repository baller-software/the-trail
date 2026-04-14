import { createContext, useReducer, type ReactNode, type Dispatch } from 'react'
import type { GameState } from '../engine/types'
import type { GameAction } from '../engine/actions'
import { gameReducer } from '../engine/reducer'
import { createInitialState } from '../engine/state'

export const GameStateContext = createContext<GameState | null>(null)
export const GameDispatchContext = createContext<Dispatch<GameAction> | null>(
  null,
)

interface GameProviderProps {
  children: ReactNode
  initialState?: GameState
}

export function GameProvider({ children, initialState }: GameProviderProps) {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState ?? createInitialState(),
  )

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  )
}
