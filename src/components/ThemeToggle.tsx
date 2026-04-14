import type { Theme } from '../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const label =
    theme === 'green'
      ? 'Switch to amber phosphor theme'
      : 'Switch to green phosphor theme'
  const display = theme === 'green' ? '[AMBER]' : '[GREEN]'

  return (
    <button
      onClick={onToggle}
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--color-dim)',
        font: 'inherit',
        fontSize: 'inherit',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      {display}
    </button>
  )
}
