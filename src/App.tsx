import { useState, useEffect, useCallback } from 'react'
import { LandingPage } from './components/LandingPage'
import { GameLayout } from './components/GameLayout'
import { TerminalOutput } from './components/TerminalOutput'
import { ErrorBoundary } from './components/ErrorBoundary'
import { GamePhaseRenderer } from './components/GamePhaseRenderer'
import { GameProvider } from './context/GameContext'
import { useGameState } from './hooks/useGameState'
import { useTheme } from './hooks/useTheme'
import { useTypewriter } from './hooks/useTypewriter'

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

  return (
    <GameLayout theme={theme} onToggleTheme={toggleTheme}>
      <TerminalOutput lines={visibleLines} />
      <GamePhaseRenderer />
    </GameLayout>
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
