import { useState, useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { STARTING_BUDGET } from '../../data/prices'
import { SETUP_PROMPTS } from '../../data/text'

type SetupStep = 'oxen' | 'food' | 'ammunition' | 'clothing' | 'misc' | 'done'

const STEPS: SetupStep[] = ['oxen', 'food', 'ammunition', 'clothing', 'misc']

function getPromptForStep(step: SetupStep, remaining: number): string {
  const prompts: Record<string, string> = {
    oxen: SETUP_PROMPTS.oxen,
    food: SETUP_PROMPTS.food,
    ammunition: SETUP_PROMPTS.ammunition,
    clothing: SETUP_PROMPTS.clothing,
    misc: SETUP_PROMPTS.miscellaneousSupplies,
  }
  return `${prompts[step]}\nYOU HAVE $${remaining.toFixed(2)} LEFT.`
}

export function SetupPhase() {
  const dispatch = useGameDispatch()
  const [step, setStep] = useState<SetupStep>('oxen')
  const [spent, setSpent] = useState(0)
  const hasAppended = useRef(false)

  const remaining = STARTING_BUDGET - spent

  useEffect(() => {
    if (!hasAppended.current) {
      hasAppended.current = true
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: [
          { text: '', brightness: 'medium' },
          {
            text: `AFTER PAYING FOR YOUR WAGON YOU NOW HAVE $${STARTING_BUDGET.toFixed(2)}.`,
            brightness: 'medium',
          },
          { text: '', brightness: 'medium' },
          {
            text: getPromptForStep('oxen', STARTING_BUDGET),
            brightness: 'medium',
          },
        ],
      })
    }
  }, [dispatch])

  const handleSubmit = useCallback(
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

      if (amount > remaining) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: `YOU DO NOT HAVE THAT MUCH. YOU HAVE $${remaining.toFixed(2)} LEFT.`,
            brightness: 'bright',
          },
        })
        return
      }

      if (step === 'oxen' && amount < 200) {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: {
            text: 'YOU MUST SPEND AT LEAST $200 ON OXEN.',
            brightness: 'bright',
          },
        })
        return
      }

      // Echo the input
      dispatch({
        type: 'APPEND_OUTPUT',
        payload: { text: `> $${amount.toFixed(2)}`, brightness: 'bright' },
      })

      // Apply the purchase
      const supplyKey = step === 'misc' ? 'miscellaneousSupplies' : step
      dispatch({
        type: 'BUY_SUPPLIES',
        payload: { [supplyKey]: amount },
      })

      const newSpent = spent + amount
      setSpent(newSpent)

      // Advance to next step
      const currentIndex = STEPS.indexOf(step)
      if (currentIndex < STEPS.length - 1) {
        const nextStep = STEPS[currentIndex + 1]
        setStep(nextStep)
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: '', brightness: 'medium' },
            {
              text: getPromptForStep(nextStep, STARTING_BUDGET - newSpent),
              brightness: 'medium',
            },
          ],
        })
      } else {
        // All purchases complete — show summary and start game
        setStep('done')
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: '', brightness: 'medium' },
            { text: '-----------------------------------', brightness: 'dim' },
            {
              text: `MONEY LEFT: $${(STARTING_BUDGET - newSpent).toFixed(2)}`,
              brightness: 'medium',
            },
            { text: '-----------------------------------', brightness: 'dim' },
            { text: '', brightness: 'medium' },
            { text: 'YOUR JOURNEY BEGINS!', brightness: 'bright' },
            {
              text: 'PRESS ENTER TO SET OUT ON THE TRAIL.',
              brightness: 'medium',
            },
          ],
        })
      }
    },
    [step, remaining, spent, dispatch],
  )

  const handleFinish = useCallback(() => {
    dispatch({ type: 'FINISH_SETUP' })
  }, [dispatch])

  if (step === 'done') {
    return (
      <TerminalInput
        prompt="? "
        onSubmit={handleFinish}
        allowEmpty
        ariaLabel="Press Enter to begin the journey"
      />
    )
  }

  return (
    <TerminalInput
      onSubmit={handleSubmit}
      ariaLabel={`Enter amount for ${step}`}
    />
  )
}
