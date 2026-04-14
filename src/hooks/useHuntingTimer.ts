import { useState, useCallback, useRef } from 'react'

interface HuntingTimerState {
  isActive: boolean
  startTime: number | null
}

export function useHuntingTimer() {
  const [timerState, setTimerState] = useState<HuntingTimerState>({
    isActive: false,
    startTime: null,
  })
  const startTimeRef = useRef<number | null>(null)

  const start = useCallback(() => {
    const now = performance.now()
    startTimeRef.current = now
    setTimerState({ isActive: true, startTime: now })
  }, [])

  const stop = useCallback((): number => {
    if (startTimeRef.current === null) return 0
    const elapsed = performance.now() - startTimeRef.current
    startTimeRef.current = null
    setTimerState({ isActive: false, startTime: null })
    return elapsed
  }, [])

  return {
    isActive: timerState.isActive,
    start,
    stop,
  }
}
