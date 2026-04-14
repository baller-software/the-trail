import { useState, useEffect, useCallback } from 'react'
import { LandingPage } from './components/LandingPage'
import { GameLayout } from './components/GameLayout'
import { TerminalOutput } from './components/TerminalOutput'
import { TerminalInput } from './components/TerminalInput'
import { ErrorBoundary } from './components/ErrorBoundary'
import { GamePhaseRenderer } from './components/GamePhaseRenderer'
import { GameProvider } from './context/GameContext'
import { useGameState } from './hooks/useGameState'
import { useTheme } from './hooks/useTheme'
import { useTypewriter } from './hooks/useTypewriter'
import styles from './styles/game-layout.module.css'

function GameUI() {
  const state = useGameState()
  const { theme, toggleTheme } = useTheme()
  const { visibleLines, isAnimating, skip } = useTypewriter(state.output)

  useEffect(() => {
    if (!isAnimating) return
    const handleKey = () => skip()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isAnimating, skip])

  const narrativeContent = (
    <>
      <div className={styles.narrativeScroll}>
        <TerminalOutput lines={visibleLines} />
      </div>
      <TerminalInput onSubmit={() => {}} disabled ariaLabel="Narrative log" />
    </>
  )

  return (
    <GameLayout
      theme={theme}
      onToggleTheme={toggleTheme}
      narrative={narrativeContent}
      dashboard={<GamePhaseRenderer />}
    />
  )
}

function App() {
  const [screen, setScreen] = useState<'landing' | 'game'>('landing')
  const { theme, toggleTheme } = useTheme()

  const handleStart = useCallback(() => {
    setScreen('game')
  }, [])

  if (screen === 'landing') {
    return (
      <LandingPage
        onStart={handleStart}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    )
  }

  return (
    <ErrorBoundary>
      <GameProvider>
        <GameUI />
      </GameProvider>
    </ErrorBoundary>
  )
}

export default App
