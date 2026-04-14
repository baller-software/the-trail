import { useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { useGameState } from '../../hooks/useGameState'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { LANDMARKS } from '../../data/landmarks'
import { RIVER_OPTIONS } from '../../data/text'
import type { CrossingMethod } from '../../engine/river'
import { resolveRiverCrossing } from '../../engine/river'

const METHOD_MAP: Record<string, CrossingMethod> = {
  '1': 'ford',
  '2': 'caulk',
  '3': 'wait',
  '4': 'ferry',
}

export function RiverPhase() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const hasAppended = useRef(false)

  const landmark = LANDMARKS[state.currentLandmarkIndex]

  useEffect(() => {
    if (!hasAppended.current) {
      hasAppended.current = true
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: [
          { text: '', brightness: 'medium' },
          { text: `--- ${landmark.name} ---`, brightness: 'bright' },
          { text: landmark.description, brightness: 'medium' },
          {
            text: `THE RIVER IS ${landmark.riverDepth ?? 5} FEET DEEP HERE.`,
            brightness: 'medium',
          },
          { text: '', brightness: 'medium' },
          { text: 'DO YOU WANT TO:', brightness: 'medium' },
          ...RIVER_OPTIONS.map((t) => ({
            text:
              t +
              (t.includes('FERRY') ? ` ($${landmark.ferryPrice ?? 5})` : ''),
            brightness: 'medium' as const,
          })),
        ],
      })
    }
  }, [landmark, dispatch])

  const handleSubmit = useCallback(
    (value: string) => {
      const method = METHOD_MAP[value]
      if (!method) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: 'PLEASE ENTER 1, 2, 3, OR 4.',
            brightness: 'bright',
          },
        })
        return
      }

      // Check if player can afford ferry
      if (
        method === 'ferry' &&
        state.supplies.money < (landmark.ferryPrice ?? 5)
      ) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: 'YOU DO NOT HAVE ENOUGH MONEY FOR THE FERRY.',
            brightness: 'bright',
          },
        })
        return
      }

      const seed = Math.random()
      const result = resolveRiverCrossing(method, landmark, seed)

      dispatch({
        type: 'APPEND_OUTPUT',
        payload: [
          { text: `> ${value}`, brightness: 'bright' },
          { text: '', brightness: 'medium' },
          {
            text: result.message,
            brightness: result.success ? 'medium' : 'bright',
          },
        ],
      })

      dispatch({
        type: 'CROSS_RIVER',
        payload: { method, randomSeed: seed },
      })
    },
    [dispatch, state.supplies.money, landmark],
  )

  return (
    <TerminalInput
      onSubmit={handleSubmit}
      ariaLabel="Choose how to cross the river"
    />
  )
}
