import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TerminalInput } from '../../src/components/TerminalInput'

describe('TerminalInput', () => {
  it('renders the input with prompt', () => {
    render(<TerminalInput onSubmit={vi.fn()} />)
    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByLabelText('Enter your response')).toBeInTheDocument()
  })

  it('calls onSubmit with value on Enter', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<TerminalInput onSubmit={onSubmit} />)

    const input = screen.getByLabelText('Enter your response')
    await user.type(input, 'hello{enter}')

    expect(onSubmit).toHaveBeenCalledWith('HELLO')
  })

  it('converts input to uppercase', async () => {
    const user = userEvent.setup()
    render(<TerminalInput onSubmit={vi.fn()} />)

    const input = screen.getByLabelText('Enter your response')
    await user.type(input, 'test')

    expect(input).toHaveValue('TEST')
  })

  it('does not call onSubmit on empty input', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<TerminalInput onSubmit={onSubmit} />)

    const input = screen.getByLabelText('Enter your response')
    await user.type(input, '{enter}')

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('does not render when disabled', () => {
    render(<TerminalInput onSubmit={vi.fn()} disabled />)
    expect(
      screen.queryByLabelText('Enter your response'),
    ).not.toBeInTheDocument()
  })
})
