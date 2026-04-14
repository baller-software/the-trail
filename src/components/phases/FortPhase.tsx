import { useState, useCallback, useEffect, useRef } from 'react'
import { TerminalInput } from '../TerminalInput'
import { StatusDisplay } from '../StatusDisplay'
import { useGameState } from '../../hooks/useGameState'
import { useGameDispatch } from '../../hooks/useGameDispatch'
import { LANDMARKS } from '../../data/landmarks'
import { FORT_PRICE_MULTIPLIER, STARTING_PRICES } from '../../data/prices'
import layoutStyles from '../../styles/game-layout.module.css'
import crtStyles from '../../styles/crt-effects.module.css'

type FortStep = 'welcome' | 'food' | 'ammo' | 'clothing' | 'misc' | 'done'

const SHOP_STEPS: FortStep[] = ['food', 'ammo', 'clothing', 'misc']

const FORT_ITEMS = [
  {
    id: '01',
    name: 'FOOD',
    unit: 'PER POUND',
    price: STARTING_PRICES.food * FORT_PRICE_MULTIPLIER,
    key: 'food',
  },
  {
    id: '02',
    name: 'AMMUNITION',
    unit: 'BOXES OF 50',
    price: STARTING_PRICES.ammunition * FORT_PRICE_MULTIPLIER,
    key: 'ammo',
  },
  {
    id: '03',
    name: 'CLOTHING',
    unit: 'SET OF WEAR',
    price: STARTING_PRICES.clothing * FORT_PRICE_MULTIPLIER,
    key: 'clothing',
  },
  {
    id: '04',
    name: 'MISC_SPARES',
    unit: 'AXLES, WHEELS, TONGUES',
    price: STARTING_PRICES.miscellaneousSupplies * FORT_PRICE_MULTIPLIER,
    key: 'misc',
  },
]

const PROMPTS: Record<string, string> = {
  food: 'HOW MUCH DO YOU WANT TO SPEND ON FOOD?',
  ammo: 'HOW MUCH DO YOU WANT TO SPEND ON AMMUNITION?',
  clothing: 'HOW MUCH DO YOU WANT TO SPEND ON CLOTHING?',
  misc: 'HOW MUCH DO YOU WANT TO SPEND ON MISCELLANEOUS SUPPLIES?',
}

export function FortPhase() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const [step, setStep] = useState<FortStep>('welcome')
  const [purchases, setPurchases] = useState<Record<string, number>>({})
  const [error, setError] = useState('')
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
        ],
      })
    }
  }, [landmark, dispatch])

  const handleWelcome = useCallback(
    (value: string) => {
      if (value === '1') {
        setStep('food')
      } else if (value === '2') {
        dispatch({
          type: 'APPEND_OUTPUT',
          payload: [
            { text: `> ${value}`, brightness: 'bright' },
            { text: 'YOU LEAVE THE FORT.', brightness: 'medium' },
          ],
        })
        dispatch({ type: 'LEAVE_FORT' })
      } else {
        setError('PLEASE ENTER 1 OR 2.')
      }
    },
    [dispatch],
  )

  const handleShopInput = useCallback(
    (value: string) => {
      const amount = parseFloat(value)
      setError('')

      if (isNaN(amount) || amount < 0) {
        setError('PLEASE ENTER A VALID AMOUNT.')
        return
      }

      if (amount > state.supplies.money) {
        setError(
          `YOU DO NOT HAVE THAT MUCH. YOU HAVE $${state.supplies.money.toFixed(2)}.`,
        )
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

      setPurchases((prev) => ({ ...prev, [step]: amount }))

      const currentIndex = SHOP_STEPS.indexOf(step)
      if (currentIndex < SHOP_STEPS.length - 1) {
        setStep(SHOP_STEPS[currentIndex + 1])
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

  return (
    <>
      {/* Location header */}
      <div className={layoutStyles.locationHeader}>
        <div>
          <div className={layoutStyles.locationSub}>
            LOC://FORT_TRADING_POST
          </div>
          <h1 className={`${layoutStyles.locationName} ${crtStyles.glow}`}>
            {landmark.name.replace(/ /g, '_')}
          </h1>
        </div>
        <div className={layoutStyles.locationMeta}>
          <p>PRICES: {FORT_PRICE_MULTIPLIER}X MARKUP</p>
          <p>FUNDS: ${Math.max(0, state.supplies.money).toFixed(2)}</p>
        </div>
      </div>

      {step === 'welcome' ? (
        <>
          <StatusDisplay />
          <div className={layoutStyles.panel}>
            <div className={layoutStyles.panelTitle}>
              STORE_CLERK_COMMUNIQUE:
            </div>
            <p className={layoutStyles.panelText}>
              &quot;YOU CAN BUY SUPPLIES AT THIS FORT. DO YOU WANT TO BUY
              SUPPLIES?&quot;
            </p>
          </div>
          <div className={layoutStyles.panel} style={{ marginTop: '1rem' }}>
            <span>{'  '}1. YES</span>
            <br />
            <span>{'  '}2. NO</span>
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
          <TerminalInput
            onSubmit={handleWelcome}
            ariaLabel="Buy supplies or leave"
          />
        </>
      ) : step !== 'done' ? (
        <>
          <div className={layoutStyles.dataTable}>
            <div className={layoutStyles.dataTableHeader}>
              <div>ID</div>
              <div>DESCRIPTION</div>
              <div>UNIT_PRICE</div>
              <div style={{ textAlign: 'right' }}>PURCHASED</div>
            </div>
            {FORT_ITEMS.map((item) => {
              const purchased = purchases[item.key]
              const isCurrent = item.key === step
              return (
                <div
                  key={item.key}
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
                  <div className={layoutStyles.dataTableId}>{item.id}</div>
                  <div>
                    <div className={layoutStyles.dataTableName}>
                      {item.name}
                    </div>
                    <div className={layoutStyles.dataTableSub}>{item.unit}</div>
                  </div>
                  <div className={layoutStyles.dataTablePrice}>
                    ${item.price.toFixed(2)}
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
              onSubmit={handleShopInput}
              ariaLabel={`Enter amount for ${step}`}
            />
          </div>
        </>
      ) : null}
    </>
  )
}
