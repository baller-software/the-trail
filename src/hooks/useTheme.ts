import { useState, useEffect, useCallback } from 'react'

export type Theme = 'green' | 'amber'

const STORAGE_KEY = 'oregon-trail-theme'

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'amber') return 'amber'
  } catch {
    // localStorage unavailable
  }
  return 'green'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage unavailable
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'green' ? 'amber' : 'green'))
  }, [])

  return { theme, toggleTheme }
}
