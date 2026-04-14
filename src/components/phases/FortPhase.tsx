import { useState, useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { getStatusLines } from '../StatusDisplay'
import { useGameState } from '../../hooks/useGameState'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { LANDMARKS } from '../../data/landmarks'
import { FORT_TEXT, SETUP_PROMPTS } from '../../data/text'
import { FORT_PRICE_MULTIPLIER } from '../../data/prices'

type FortStep = 'welcome' | 'food' | 'ammo' | 'clothing' | 'misc' | 'done'

const SHOP_STEPS: FortStep[] = ['food', 'ammo', 'clothing', 'misc']

export function FortPhase() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const [step, setStep] = useState<FortStep>('welcome')
  const hasAppended = useRef(false)

  const landmark = LANDMARKS[state.currentLandmarkIndex]

  useEffect(() => {
    if (!hasAppended.current) {
      hasAppended.current = true
      const statusLines = getStatusLines(state)
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: [
          { text: '', brightness: 'medium' },
          { text: `--- ${landmark.name} ---`, brightness: 'bright' },
          { text: landmark.description, brightness: 'medium' },
          { text: '', brightness: 'medium' },
          ...statusLines,
          { text: '', brightness: 'medium' },
          { text: FORT_TEXT.welcome, brightness: 'medium' },
          {
            text: `(PRICES ARE ${FORT_PRICE_MULTIPLIER}X STARTING PRICES)`,
            brightness: 'dim',
          },
          { text: '', brightness: 'medium' },
          { text: FORT_TEXT.buy, brightness: 'medium' },
          ...FORT_TEXT.options.map((t) => ({
            text: t,
            brightness: 'medium' as const,
          })),
        ],
      })
    }
  }, [state, landmark, dispatch])

  const handleWelcome = useCallback(
    (value: string) => {
      if (value === '1') {
        setStep('food')
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: `> ${value}`, brightness: 'bright' },
            { text: '', brightness: 'medium' },
            {
              text: SETUP_PROMPTS.food,
              brightness: 'medium',
            },
            {
              text: `YOU HAVE $${state.supplies.money.toFixed(2)}.`,
              brightness: 'medium',
            },
          ],
        })
      } else if (value === '2') {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: `> ${value}`, brightness: 'bright' },
            { text: '', brightness: 'medium' },
            { text: 'YOU LEAVE THE FORT.', brightness: 'medium' },
          ],
        })
        dispatch({ type: 'LEAVE_FORT' })
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
    [dispatch, state.supplies.money],
  )

  const handleShopInput = useCallback(
    (value: string) => {
      const amount = parseFloat(value)
      if (isNaN(amount) || amount < 0) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: 'PLEASE ENTER A VALID AMOUNT.',
            brightness: 'bright',
          },
        })
        return
      }

      if (amount > state.supplies.money) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: `YOU DO NOT HAVE THAT MUCH. YOU HAVE $${state.supplies.money.toFixed(2)}.`,
            brightness: 'bright',
          },
        })
        return
      }

      dispatch({
        type: 'APPEND_OUTPUT',
        payload: { text: `> $${amount.toFixed(2)}`, brightness: 'bright' },
      })

      const supplyMap: Record<string, string> = {
        food: 'food',
        ammo: 'ammunition',
        clothing: 'clothing',
        misc: 'miscellaneousSupplies',
      }
      const key = supplyMap[step]
      if (key && amount > 0) {
        dispatch({
          type: 'BUY_AT_FORT',
          payload: { [key]: amount },
        })
      }

      // Advance to next step
      const currentIndex = SHOP_STEPS.indexOf(step)
      if (currentIndex < SHOP_STEPS.length - 1) {
        const nextStep = SHOP_STEPS[currentIndex + 1]
        setStep(nextStep)

        const prompts: Record<string, string> = {
          ammo: SETUP_PROMPTS.ammunition,
          clothing: SETUP_PROMPTS.clothing,
          misc: SETUP_PROMPTS.miscellaneousSupplies,
        }
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: '', brightness: 'medium' },
            { text: prompts[nextStep], brightness: 'medium' },
          ],
        })
      } else {
        setStep('done')
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: '', brightness: 'medium' },
            { text: 'YOU LEAVE THE FORT.', brightness: 'medium' },
          ],
        })
        dispatch({ type: 'LEAVE_FORT' })
      }
    },
    [step, state.supplies.money, dispatch],
  )

  if (step === 'welcome') {
    return (
      <TerminalInput
        onSubmit={handleWelcome}
        ariaLabel="Buy supplies or leave"
      />
    )
  }

  if (step === 'done') {
    return null
  }

  return (
    <TerminalInput
      onSubmit={handleShopInput}
      ariaLabel={`Enter amount for ${step}`}
    />
  )
}
