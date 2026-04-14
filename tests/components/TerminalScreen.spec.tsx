import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TerminalScreen } from '../../src/components/TerminalScreen'

describe('TerminalScreen', () => {
  it('renders children inside the terminal frame', () => {
    render(
      <TerminalScreen theme="green" onToggleTheme={vi.fn()}>
        <div>TEST CONTENT</div>
      </TerminalScreen>,
    )
    expect(screen.getByText('TEST CONTENT')).toBeInTheDocument()
  })

  it('renders the theme toggle', () => {
    render(
      <TerminalScreen theme="green" onToggleTheme={vi.fn()}>
        <div>CONTENT</div>
      </TerminalScreen>,
    )
    expect(
      screen.getByLabelText('Switch to amber phosphor theme'),
    ).toBeInTheDocument()
  })
})
