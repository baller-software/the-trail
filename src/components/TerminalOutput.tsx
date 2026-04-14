import { useEffect, useRef } from 'react'
import type { OutputLine } from '../engine/types'
import crtStyles from '../styles/crt-effects.module.css'

const brightnessMap: Record<string, string> = {
  bright: 'var(--color-bright)',
  medium: 'var(--color-medium)',
  dim: 'var(--color-dim)',
}

interface TerminalOutputProps {
  lines: OutputLine[]
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [lines.length])

  return (
    <div role="log" aria-live="polite" className={crtStyles.glow}>
      {lines.map((line, i) => (
        <div key={i} style={{ color: brightnessMap[line.brightness] }}>
          {line.text || '\u00A0'}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  )
}
