import { useState, useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { STARTING_BUDGET, STARTING_PRICES } from '../../data/prices'
import layoutStyles from '../../styles/game-layout.module.css'
import crtStyles from '../../styles/crt-effects.module.css'

type SetupStep = 'oxen' | 'food' | 'ammunition' | 'clothing' | 'misc' | 'done'

const STEPS: SetupStep[] = ['oxen', 'food', 'ammunition', 'clothing', 'misc']

const STEP_CONFIG: Record<
  string,
  { name: string; unit: string; price: string; supplyKey: string }
> = {
  oxen: {
    name: 'OXEN',
    unit: 'PER YOKE',
    price: `$${STARTING_PRICES.oxen.toFixed(2)} / YOKE`,
    supplyKey: 'oxen',
  },
  food: {
    name: 'FOOD',
    unit: 'PER POUND',
    price: `$${STARTING_PRICES.food.toFixed(2)} / LB`,
    supplyKey: 'food',
  },
  ammunition: {
    name: 'AMMUNITION',
    unit: 'BOXES OF 50',
    price: `$${STARTING_PRICES.ammunition.toFixed(2)} / BOX`,
    supplyKey: 'ammunition',
  },
  clothing: {
    name: 'CLOTHING',
    unit: 'SET OF WEAR',
    price: `$${STARTING_PRICES.clothing.toFixed(2)} / SET`,
    supplyKey: 'clothing',
  },
  misc: {
    name: 'MISC_SPARES',
    unit: 'AXLES, WHEELS, TONGUES',
    price: `$${STARTING_PRICES.miscellaneousSupplies.toFixed(2)} / UNIT`,
    supplyKey: 'miscellaneousSupplies',
  },
}

const PROMPTS: Record<string, string> = {
  oxen: 'HOW MUCH DO YOU WANT TO SPEND ON OXEN?',
  food: 'HOW MUCH DO YOU WANT TO SPEND ON FOOD?',
  ammunition: 'HOW MUCH DO YOU WANT TO SPEND ON AMMUNITION?',
  clothing: 'HOW MUCH DO YOU WANT TO SPEND ON CLOTHING?',
  misc: 'HOW MUCH DO YOU WANT TO SPEND ON MISCELLANEOUS SUPPLIES?',
}

export function SetupPhase() {
  const dispatch = useGameDispatch()
  const [step, setStep] = useState<SetupStep>('oxen')
  const [spent, setSpent] = useState(0)
  const [purchases, setPurchases] = useState<Record<string, number>>({})
  const [error, setError] = useState('')
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
        ],
      })
    }
  }, [dispatch])

  const handleSubmit = useCallback(
    (value: string) => {
      const amount = parseFloat(value)
      setError('')

      if (isNaN(amount) || amount < 0) {
        setError('PLEASE ENTER A VALID AMOUNT.')
        return
      }

      if (amount > remaining) {
        setError(
          `YOU DO NOT HAVE THAT MUCH. YOU HAVE $${remaining.toFixed(2)} LEFT.`,
        )
        return
      }

      if (step === 'oxen' && amount < 200) {
        setError('YOU MUST SPEND AT LEAST $200 ON OXEN.')
        return
      }

      dispatch({
        type: 'APPEND_OUTPUT',
        payload: { text: `> $${amount.toFixed(2)}`, brightness: 'bright' },
      })

      const supplyKey = step === 'misc' ? 'miscellaneousSupplies' : step
      dispatch({
        type: 'BUY_SUPPLIES',
        payload: { [supplyKey]: amount },
      })

      const newSpent = spent + amount
      setSpent(newSpent)
      setPurchases((prev) => ({ ...prev, [step]: amount }))

      const currentIndex = STEPS.indexOf(step)
      if (currentIndex < STEPS.length - 1) {
        setStep(STEPS[currentIndex + 1])
      } else {
        setStep('done')
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: '', brightness: 'medium' },
            {
              text: `MONEY LEFT: $${(STARTING_BUDGET - newSpent).toFixed(2)}`,
              brightness: 'medium',
            },
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
    <>
      {/* Location header */}
      <div className={layoutStyles.locationHeader}>
        <div>
          <div className={layoutStyles.locationSub}>LOC://GENERAL_STORE</div>
          <h1 className={`${layoutStyles.locationName} ${crtStyles.glow}`}>
            INDEPENDENCE_MO
          </h1>
        </div>
        <div className={layoutStyles.locationMeta}>
          <p>REF_ID: 1971-MECC-ST01</p>
          <p>BUDGET: ${STARTING_BUDGET.toFixed(2)}</p>
        </div>
      </div>

      <div className={layoutStyles.contentGrid}>
        {/* Left panel — clerk + budget */}
        <div>
          <div className={layoutStyles.panel}>
            <div className={layoutStyles.panelTitle}>
              STORE_CLERK_COMMUNIQUE:
            </div>
            <p className={layoutStyles.panelText}>
              &quot;HELLO THERE! SO YOU&apos;RE GOING TO OREGON? I CAN FIX YOU
              UP WITH WHAT YOU NEED.&quot;
            </p>
            <div className={layoutStyles.capitalDisplay}>
              <div className={layoutStyles.capitalRow}>
                <span className={layoutStyles.capitalLabel}>
                  STARTING_CAPITAL:
                </span>
                <span
                  className={`${layoutStyles.capitalValue} ${crtStyles.glow}`}
                >
                  ${STARTING_BUDGET.toFixed(2)}
                </span>
              </div>
              <div className={layoutStyles.capitalRow}>
                <span className={layoutStyles.capitalLabel}>REMAINING:</span>
                <span
                  className={`${layoutStyles.capitalValue} ${crtStyles.glow}`}
                >
                  ${remaining.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — inventory table */}
        <div>
          <div className={layoutStyles.dataTable}>
            <div className={layoutStyles.dataTableHeader}>
              <div>ID</div>
              <div>DESCRIPTION</div>
              <div>UNIT_PRICE</div>
              <div style={{ textAlign: 'right' }}>PURCHASED</div>
            </div>
            {STEPS.map((s, i) => {
              const config = STEP_CONFIG[s]
              const purchased = purchases[s]
              const isCurrent = s === step
              return (
                <div
                  key={s}
                  className={layoutStyles.dataTableRow}
                  style={
                    isCurrent
                      ? {
                          backgroundColor:
                            'color-mix(in srgb, var(--color-bright) 5%, transparent)',
                        }
                      : undefined
                  }
                >
                  <div className={layoutStyles.dataTableId}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div className={layoutStyles.dataTableName}>
                      {config.name}
                    </div>
                    <div className={layoutStyles.dataTableSub}>
                      {config.unit}
                    </div>
                  </div>
                  <div className={layoutStyles.dataTablePrice}>
                    {config.price}
                  </div>
                  <div className={layoutStyles.dataTableValue}>
                    {purchased !== undefined
                      ? `[ $${purchased.toFixed(2)} ]`
                      : isCurrent
                        ? '[ ... ]'
                        : '[ — ]'}
                  </div>
                </div>
              )
            })}
          </div>

          {error && (
            <div
              className={crtStyles.brightGlow}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                borderLeft: '4px solid var(--color-bright)',
              }}
            >
              *** {error}
            </div>
          )}

          <div style={{ marginTop: '0.5rem' }}>
            <div
              style={{
                padding: '1rem 0 0.5rem',
                color: 'var(--color-medium)',
                fontSize: '1.1rem',
              }}
              className={crtStyles.glow}
            >
              {PROMPTS[step]}
            </div>
            <TerminalInput
              onSubmit={handleSubmit}
              ariaLabel={`Enter amount for ${step}`}
            />
          </div>
        </div>
      </div>
    </>
  )
}
