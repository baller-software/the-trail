import { useEffect } from 'react'
import { TerminalScreen } from './components/TerminalScreen'
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

  // Skip typewriter on any keypress
  useEffect(() => {
    if (!isAnimating) return
    const handleKey = () => skip()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isAnimating, skip])

  return (
    <TerminalScreen theme={theme} onToggleTheme={toggleTheme}>
      <TerminalOutput lines={visibleLines} />
      <GamePhaseRenderer />
    </TerminalScreen>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameUI />
      </GameProvider>
    </ErrorBoundary>
  )
}

export default App
