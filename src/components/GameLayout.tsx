import type { ReactNode } from 'react'
import type { Theme } from '../hooks/useTheme'
import { useGameState } from '../hooks/useGameState'
import { LANDMARKS } from '../data/landmarks'
import styles from '../styles/game-layout.module.css'
import crtStyles from '../styles/crt-effects.module.css'

const MONTH_NAMES = [
  '',
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

const PHASE_NAV: Record<string, string> = {
  intro: 'TERMINAL',
  setup: 'TRADE',
  traveling: 'MAP',
  event: 'TERMINAL',
  hunting: 'HUNT',
  river: 'MAP',
  fort: 'TRADE',
  gameOver: 'TERMINAL',
}

interface GameLayoutProps {
  theme: Theme
  onToggleTheme: () => void
  children: ReactNode
}

export function GameLayout({
  theme,
  onToggleTheme,
  children,
}: GameLayoutProps) {
  const state = useGameState()
  const currentLandmark = LANDMARKS[state.currentLandmarkIndex]
  const activeNav = PHASE_NAV[state.phase] ?? 'TERMINAL'

  const navItems = ['MAP', 'INVENTORY', 'HUNT', 'TRADE', 'REST']

  return (
    <>
      <div className={crtStyles.crtOverlay} />

      <header className={styles.header}>
        <div className={`${styles.headerLogo} ${crtStyles.glow}`}>
          OREGON_TRAIL_OS_V1.0
        </div>
        <nav className={styles.headerNav}>
          {navItems.map((item) => (
            <span
              key={item}
              className={
                item === activeNav
                  ? styles.headerNavItemActive
                  : styles.headerNavItem
              }
            >
              {item}
            </span>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            className={styles.headerMeta}
            onClick={onToggleTheme}
            style={{
              background: 'none',
              border: '1px solid var(--color-dim)',
              color: 'var(--color-dim)',
              fontFamily: 'inherit',
              padding: '0.2rem 0.5rem',
              cursor: 'pointer',
            }}
          >
            {theme === 'green' ? 'AMBER' : 'GREEN'}
          </button>
          <span className={styles.headerMeta}>
            {MONTH_NAMES[state.month]} {state.day}, 1848
          </span>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div style={{ opacity: 0.6 }}>(C) 1971 MECC — SIMULATION_ACTIVE</div>
        <div className={styles.footerLinks}>
          <span className={styles.footerActive}>TURN: {state.turnNumber}</span>
          <span>MILES: {state.milesTraveled}</span>
          <span>{currentLandmark.name}</span>
        </div>
      </footer>
    </>
  )
}
