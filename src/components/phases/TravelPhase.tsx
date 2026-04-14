import { useState, useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { StatusDisplay } from '../StatusDisplay'
import { useGameState } from '../../hooks/useGameState'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { LANDMARKS } from '../../data/landmarks'
import { PACE_OPTIONS, RATION_OPTIONS } from '../../data/text'
import type { TravelPace, RationLevel } from '../../engine/types'
import layoutStyles from '../../styles/game-layout.module.css'
import crtStyles from '../../styles/crt-effects.module.css'

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
  const hasShownLandmark = useRef(false)

  const currentLandmark = LANDMARKS[state.currentLandmarkIndex]

  useEffect(() => {
    if (
      !hasShownLandmark.current &&
      state.turnNumber > 0 &&
      currentLandmark.type === 'landmark' &&
      state.currentLandmarkIndex > 0
    ) {
      hasShownLandmark.current = true
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: [
          { text: '', brightness: 'medium' },
          { text: currentLandmark.description, brightness: 'bright' },
          { text: '', brightness: 'medium' },
        ],
      })
    }
  }, [state.turnNumber, currentLandmark, state.currentLandmarkIndex, dispatch])

  const handleMainInput = useCallback(
    (value: string) => {
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: { text: `> ${value}`, brightness: 'bright' },
      })

      switch (value) {
        case '1': {
          hasShownLandmark.current = false
          dispatch({
            type: 'TRAVEL',
            payload: { randomSeed: Math.random() },
          })
          break
        }
        case '2': {
          hasShownLandmark.current = false
          dispatch({ type: 'REST' })
          dispatch({
            type: 'APPEND_OUTPUT',
            payload: [
              { text: '', brightness: 'medium' },
              { text: 'YOU REST FOR TWO WEEKS.', brightness: 'medium' },
            ],
          })
          break
        }
        case '3': {
          dispatch({ type: 'START_HUNT' })
          break
        }
        case '4': {
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
    },
    [dispatch],
  )

  const handler =
    mode === 'pace'
      ? handlePaceInput
      : mode === 'rations'
        ? handleRationsInput
        : handleMainInput

  return (
    <>
      {/* Location header */}
      <div className={layoutStyles.locationHeader}>
        <div>
          <div className={layoutStyles.locationSub}>
            LOC://{currentLandmark.name.replace(/ /g, '_')}
          </div>
          <h1 className={`${layoutStyles.locationName} ${crtStyles.glow}`}>
            {currentLandmark.name}
          </h1>
        </div>
        <div className={layoutStyles.locationMeta}>
          <p>TURN: {state.turnNumber}</p>
          <p>WEATHER: {state.weather.toUpperCase()}</p>
        </div>
      </div>

      <StatusDisplay />

      {mode === 'main' && (
        <div className={layoutStyles.panel} style={{ marginBottom: '1rem' }}>
          <div className={layoutStyles.panelTitle}>AVAILABLE_ACTIONS:</div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            <span>{'  '}1. CONTINUE ON THE TRAIL</span>
            <span>{'  '}2. STOP AND REST</span>
            <span>{'  '}3. GO HUNTING</span>
            <span>{'  '}4. CHANGE PACE</span>
            <span>{'  '}5. CHANGE RATIONS</span>
          </div>
        </div>
      )}

      <TerminalInput onSubmit={handler} ariaLabel="Enter your choice" />
    </>
  )
}
