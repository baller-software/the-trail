import { useGameState } from '../hooks/useGameState'
import { LANDMARKS } from '../data/landmarks'
import { getAliveCount } from '../engine/state'
import layoutStyles from '../styles/game-layout.module.css'
import crtStyles from '../styles/crt-effects.module.css'

const MONTH_NAMES = [
  '',
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]

export function StatusDisplay() {
  const state = useGameState()
  const nextLandmark =
    state.currentLandmarkIndex < LANDMARKS.length - 1
      ? LANDMARKS[state.currentLandmarkIndex + 1]
      : null
  const milesToNext = nextLandmark
    ? nextLandmark.mileFromStart - state.milesTraveled
    : 0

  return (
    <div className={layoutStyles.statusGrid}>
      <div className={layoutStyles.statusPanel}>
        <div className={layoutStyles.statusPanelTitle}>PARTY_STATUS</div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>HEALTH:</span>
          <span className={layoutStyles.statusValue}>
            {state.party.health.toUpperCase().replace('VERYPOOR', 'VERY POOR')}
          </span>
        </div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>MEMBERS:</span>
          <span className={layoutStyles.statusValue}>
            {getAliveCount(state)} ALIVE
          </span>
        </div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>PACE:</span>
          <span className={layoutStyles.statusValue}>
            {state.pace.toUpperCase()}
          </span>
        </div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>RATIONS:</span>
          <span className={layoutStyles.statusValue}>
            {state.rations.toUpperCase().replace('BAREBONES', 'BARE BONES')}
          </span>
        </div>
      </div>

      <div className={layoutStyles.statusPanel}>
        <div className={layoutStyles.statusPanelTitle}>WEATHER_DATA</div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>CONDITIONS:</span>
          <span className={layoutStyles.statusValue}>
            {state.weather.toUpperCase()}
          </span>
        </div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>DATE:</span>
          <span className={layoutStyles.statusValue}>
            {MONTH_NAMES[state.month]} {state.day}
          </span>
        </div>
      </div>

      <div className={layoutStyles.statusPanel}>
        <div className={layoutStyles.statusPanelTitle}>SUPPLIES</div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>FOOD:</span>
          <span className={layoutStyles.statusValue}>
            {state.supplies.food} LBS
          </span>
        </div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>AMMO:</span>
          <span className={layoutStyles.statusValue}>
            {state.supplies.ammunition}
          </span>
        </div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>CLOTHING:</span>
          <span className={layoutStyles.statusValue}>
            {state.supplies.clothing} SETS
          </span>
        </div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>MISC:</span>
          <span className={layoutStyles.statusValue}>
            {state.supplies.miscellaneousSupplies}
          </span>
        </div>
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>MONEY:</span>
          <span className={layoutStyles.statusValue}>
            ${Math.max(0, state.supplies.money).toFixed(2)}
          </span>
        </div>
      </div>

      <div className={layoutStyles.statusPanel}>
        <div className={layoutStyles.statusPanelTitle}>NAVIGATION</div>
        {nextLandmark && (
          <div className={layoutStyles.statusRow}>
            <span className={layoutStyles.statusLabel}>NEXT:</span>
            <span className={layoutStyles.statusValue}>
              {nextLandmark.name}
            </span>
          </div>
        )}
        {nextLandmark && (
          <div className={layoutStyles.statusRow}>
            <span className={layoutStyles.statusLabel}>DISTANCE:</span>
            <span className={layoutStyles.statusValue}>
              {milesToNext} MILES
            </span>
          </div>
        )}
        <div className={layoutStyles.statusRow}>
          <span className={layoutStyles.statusLabel}>TRAVELED:</span>
          <span className={`${layoutStyles.statusValue} ${crtStyles.glow}`}>
            {state.milesTraveled} MILES
          </span>
        </div>
      </div>
    </div>
  )
}
