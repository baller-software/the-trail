import { useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { useGameState } from '../../hooks/useGameState'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { GAME_OVER_WIN, GAME_OVER_LOSE } from '../../data/text'
import type { OutputLine, GameOverReason } from '../../engine/types'

function getGameOverLines(reason: GameOverReason | null): OutputLine[] {
  const lines: OutputLine[] = [{ text: '', brightness: 'medium' }]

  if (reason === 'reachedOregon') {
    for (const text of GAME_OVER_WIN) {
      lines.push({ text, brightness: 'bright' })
    }
  } else {
    const loseKey = (reason ?? 'allDead') as keyof typeof GAME_OVER_LOSE
    const loseTexts = GAME_OVER_LOSE[loseKey] ?? GAME_OVER_LOSE.allDead
    for (const text of loseTexts) {
      lines.push({ text, brightness: 'bright' })
    }
  }

  lines.push(
    { text: '', brightness: 'medium' },
    { text: '-----------------------------------', brightness: 'dim' },
    { text: '', brightness: 'medium' },
    { text: 'WOULD YOU LIKE TO PLAY AGAIN?', brightness: 'medium' },
    { text: '  1. YES', brightness: 'medium' },
    { text: '  2. NO', brightness: 'medium' },
  )

  return lines
}

export function GameOverPhase() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const hasAppended = useRef(false)

  useEffect(() => {
    if (!hasAppended.current) {
      hasAppended.current = true
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: getGameOverLines(state.gameOverReason),
      })
    }
  }, [state.gameOverReason, dispatch])

  const handleSubmit = useCallback(
    (value: string) => {
      if (value === '1') {
        dispatch({ type: 'NEW_GAME' })
      } else if (value === '2') {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: `> ${value}`, brightness: 'bright' },
            { text: '', brightness: 'medium' },
            {
              text: 'THANK YOU FOR PLAYING THE OREGON TRAIL.',
              brightness: 'medium',
            },
            { text: 'GOODBYE.', brightness: 'bright' },
          ],
        })
      } else {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: 'PLEASE ENTER 1 OR 2.',
            brightness: 'bright',
          },
        })
      }
    },
    [dispatch],
  )

  return <TerminalInput onSubmit={handleSubmit} ariaLabel="Play again?" />
}
