import { useState, useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { useGameState } from '../../hooks/useGameState'
import { useHuntingTimer } from '../../hooks/useHuntingTimer'
import { HUNTING_WORDS } from '../../data/events'
import { HUNTING_PROMPT } from '../../data/text'
import {
  calculateHuntingResult,
  getHuntingFoodReward,
  getHuntingMessage,
} from '../../engine/hunting'

export function HuntingPhase() {
  const dispatch = useGameDispatch()
  const state = useGameState()
  const timer = useHuntingTimer()
  const [targetWord, setTargetWord] = useState('')
  const [phase, setPhase] = useState<'ready' | 'typing' | 'result'>('ready')
  const hasAppended = useRef(false)

  useEffect(() => {
    if (!hasAppended.current) {
      hasAppended.current = true

      // Check if player has ammunition
      if (state.supplies.ammunition <= 0) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: '', brightness: 'medium' },
            {
              text: 'YOU DO NOT HAVE ANY AMMUNITION TO HUNT WITH.',
              brightness: 'bright',
            },
          ],
        })
        dispatch({
          type: 'FINISH_HUNT',
          payload: { elapsedMs: 0, correct: false },
        })
        return
      }

      const word =
        HUNTING_WORDS[Math.floor(Math.random() * HUNTING_WORDS.length)]
      setTargetWord(word)

      dispatch({
        type: 'APPEND_OUTPUT',
        payload: [
          { text: '', brightness: 'medium' },
          { text: HUNTING_PROMPT, brightness: 'medium' },
          { text: '', brightness: 'medium' },
          { text: `  >>> ${word} <<<`, brightness: 'bright' },
        ],
      })

      setPhase('typing')
      timer.start()
    }
  }, [dispatch, state.supplies.ammunition, timer])

  const handleTyping = useCallback(
    (value: string) => {
      const elapsed = timer.stop()
      const correct = value === targetWord
      const result = calculateHuntingResult(elapsed, correct)
      const food = getHuntingFoodReward(result)
      const message = getHuntingMessage(result, food)

      dispatch({
        type: 'APPEND_OUTPUT',
        payload: [
          { text: `> ${value}`, brightness: 'bright' },
          { text: '', brightness: 'medium' },
          { text: message, brightness: 'medium' },
        ],
      })

      setPhase('result')

      dispatch({
        type: 'FINISH_HUNT',
        payload: { elapsedMs: elapsed, correct },
      })
    },
    [dispatch, timer, targetWord],
  )

  if (phase === 'typing') {
    return (
      <TerminalInput
        onSubmit={handleTyping}
        ariaLabel="Type the word to shoot"
      />
    )
  }

  return null
}
