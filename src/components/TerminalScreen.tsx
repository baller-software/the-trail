import type { ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'
import type { Theme } from '../hooks/useTheme'
import terminalStyles from '../styles/terminal.module.css'
import crtStyles from '../styles/crt-effects.module.css'

interface TerminalScreenProps {
  theme: Theme
  onToggleTheme: () => void
  children: ReactNode
}

export function TerminalScreen({
  theme,
  onToggleTheme,
  children,
}: TerminalScreenProps) {
  return (
    <div className={terminalStyles.wrapper}>
      <div
        className={`${terminalStyles.terminal} ${crtStyles.scanlines} ${crtStyles.vignette}`}
      >
        <div className={terminalStyles.outputArea}>{children}</div>
      </div>
      <div className={terminalStyles.bezel}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </div>
  )
}
