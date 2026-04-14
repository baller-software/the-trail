import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import crtStyles from '../styles/crt-effects.module.css'
import layoutStyles from '../styles/game-layout.module.css'

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
    <div className={layoutStyles.promptArea}>
      <div className={`${layoutStyles.promptText} ${crtStyles.glow}`}>
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
          className={layoutStyles.promptInput}
        />
        <span className={crtStyles.blinkingCursor} />
      </div>
    </div>
  )
}
