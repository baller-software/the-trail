import { useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { INTRO_TEXT } from '../../data/text'
import type { OutputLine } from '../../engine/types'

const introLines: OutputLine[] = [
  { text: '*** THE OREGON TRAIL ***', brightness: 'bright' },
  { text: '', brightness: 'medium' },
  ...INTRO_TEXT.map((text) => ({
    text,
    brightness: 'medium' as const,
  })),
  { text: '', brightness: 'medium' },
  { text: 'PRESS ENTER TO CONTINUE.', brightness: 'bright' },
]

export function IntroPhase() {
  const dispatch = useGameDispatch()
  const hasAppended = useRef(false)

  useEffect(() => {
    if (!hasAppended.current) {
      hasAppended.current = true
      dispatch({ type: 'APPEND_OUTPUT', payload: introLines })
    }
  }, [dispatch])

  const handleSubmit = useCallback(() => {
    dispatch({ type: 'START_GAME' })
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
