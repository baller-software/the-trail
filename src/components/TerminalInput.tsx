import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import crtStyles from '../styles/crt-effects.module.css'

interface TerminalInputProps {
  prompt?: string
  onSubmit: (value: string) => void
  disabled?: boolean
  ariaLabel?: string
  allowEmpty?: boolean
}

export function TerminalInput({
  prompt = '> ',
  onSubmit,
  disabled = false,
  ariaLabel = 'Enter your response',
  allowEmpty = false,
}: TerminalInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (allowEmpty || value.trim() !== '')) {
      onSubmit(value.trim())
      setValue('')
    }
  }

  if (disabled) return null

  return (
    <div
      className={crtStyles.glow}
      style={{
        display: 'flex',
        alignItems: 'center',
        color: 'var(--color-bright)',
      }}
    >
      <span aria-hidden="true">{prompt}</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        autoComplete="off"
        spellCheck={false}
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--color-bright)',
          font: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          width: '100%',
          caretColor: 'var(--color-bright)',
          caretShape: 'block',
          padding: 0,
        }}
      />
    </div>
  )
}
