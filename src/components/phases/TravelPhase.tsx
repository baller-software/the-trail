import { useState, useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { getStatusLines } from '../StatusDisplay'
import { useGameState } from '../../hooks/useGameState'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { LANDMARKS } from '../../data/landmarks'
import { TRAVEL_OPTIONS, PACE_OPTIONS, RATION_OPTIONS } from '../../data/text'
import type { TravelPace, RationLevel } from '../../engine/types'

type TravelMode = 'main' | 'pace' | 'rations'

const PACE_MAP: Record<string, TravelPace> = {
  '1': 'steady',
  '2': 'strenuous',
  '3': 'grueling',
}

const RATION_MAP: Record<string, RationLevel> = {
  '1': 'filling',
  '2': 'meager',
  '3': 'bareBones',
}

export function TravelPhase() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const [mode, setMode] = useState<TravelMode>('main')
  const hasShownStatus = useRef(false)

  useEffect(() => {
    if (!hasShownStatus.current) {
      hasShownStatus.current = true

      const lines = getStatusLines(state)

      // Check if we just arrived at a landmark
      const currentLandmark = LANDMARKS[state.currentLandmarkIndex]
      if (state.turnNumber > 0 && currentLandmark.type === 'landmark') {
        lines.unshift(
          { text: '', brightness: 'medium' },
          { text: currentLandmark.description, brightness: 'bright' },
          { text: '', brightness: 'medium' },
        )
      }

      lines.push(
        { text: '', brightness: 'medium' },
        { text: 'DO YOU WANT TO:', brightness: 'medium' },
        ...TRAVEL_OPTIONS.map((t) => ({
          text: t,
          brightness: 'medium' as const,
        })),
        { text: '  4. CHANGE PACE', brightness: 'medium' },
        { text: '  5. CHANGE RATIONS', brightness: 'medium' },
      )

      dispatch({ type: 'APPEND_OUTPUT', payload: lines })
    }
  }, [state, dispatch])

  const handleMainInput = useCallback(
    (value: string) => {
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: { text: `> ${value}`, brightness: 'bright' },
      })

      switch (value) {
        case '1': {
          // Continue on trail
          hasShownStatus.current = false
          dispatch({
            type: 'TRAVEL',
            payload: { randomSeed: Math.random() },
          })
          break
        }
        case '2': {
          // Rest
          hasShownStatus.current = false
          dispatch({ type: 'REST' })
          dispatch({
            type: 'APPEND_OUTPUT',
            payload: [
              { text: '', brightness: 'medium' },
              {
                text: 'YOU REST FOR TWO WEEKS.',
                brightness: 'medium',
              },
            ],
          })
          break
        }
        case '3': {
          // Go hunting
          dispatch({ type: 'START_HUNT' })
          break
        }
        case '4': {
          // Change pace
          setMode('pace')
          dispatch({
            type: 'APPEND_OUTPUT',
            payload: [
              { text: '', brightness: 'medium' },
              { text: 'SET YOUR TRAVEL PACE:', brightness: 'medium' },
              ...PACE_OPTIONS.map((t) => ({
                text: t,
                brightness: 'medium' as const,
              })),
            ],
          })
          break
        }
        case '5': {
          // Change rations
          setMode('rations')
          dispatch({
            type: 'APPEND_OUTPUT',
            payload: [
              { text: '', brightness: 'medium' },
              { text: 'SET YOUR RATION LEVEL:', brightness: 'medium' },
              ...RATION_OPTIONS.map((t) => ({
                text: t,
                brightness: 'medium' as const,
              })),
            ],
          })
          break
        }
        default:
          dispatch({
            type: 'APPEND_OUTPUT',
            payload: {
              text: 'PLEASE ENTER 1, 2, 3, 4, OR 5.',
              brightness: 'bright',
            },
          })
      }
    },
    [dispatch],
  )

  const handlePaceInput = useCallback(
    (value: string) => {
      const pace = PACE_MAP[value]
      if (!pace) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: 'PLEASE ENTER 1, 2, OR 3.',
            brightness: 'bright',
          },
        })
        return
      }
      dispatch({ type: 'SET_PACE', payload: pace })
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: {
          text: `PACE SET TO ${pace.toUpperCase()}.`,
          brightness: 'medium',
        },
      })
      setMode('main')
      hasShownStatus.current = false
    },
    [dispatch],
  )

  const handleRationsInput = useCallback(
    (value: string) => {
      const rations = RATION_MAP[value]
      if (!rations) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: 'PLEASE ENTER 1, 2, OR 3.',
            brightness: 'bright',
          },
        })
        return
      }
      dispatch({ type: 'SET_RATIONS', payload: rations })
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: {
          text: `RATIONS SET TO ${rations.toUpperCase().replace('BAREBONES', 'BARE BONES')}.`,
          brightness: 'medium',
        },
      })
      setMode('main')
      hasShownStatus.current = false
    },
    [dispatch],
  )

  const handler =
    mode === 'pace'
      ? handlePaceInput
      : mode === 'rations'
        ? handleRationsInput
        : handleMainInput

  return <TerminalInput onSubmit={handler} ariaLabel="Enter your choice" />
}
