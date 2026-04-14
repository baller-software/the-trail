import { useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { useGameState } from '../../hooks/useGameState'
import { useGameDispatch } from '../../hooks/useGameDispatch'

export function EventPhase() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const hasAppended = useRef(false)

  useEffect(() => {
    if (!hasAppended.current && state.currentEvent) {
      hasAppended.current = true
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: [
          { text: '', brightness: 'medium' },
          {
            text: `*** ${state.currentEvent.message} ***`,
            brightness: 'bright',
          },
          { text: '', brightness: 'medium' },
          { text: 'PRESS ENTER TO CONTINUE.', brightness: 'medium' },
        ],
      })
    }
  }, [state.currentEvent, dispatch])

  const handleSubmit = useCallback(() => {
    dispatch({
      type: 'RESOLVE_EVENT',
      payload: { randomSeed: Math.random() },
    })
  }, [dispatch])

  return (
    <TerminalInput
      prompt="? "
      onSubmit={handleSubmit}
      allowEmpty
      ariaLabel="Press Enter to continue"
    />
  )
}
