import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../../src/components/ThemeToggle'

describe('ThemeToggle', () => {
  it('shows amber option when green theme is active', () => {
    render(<ThemeToggle theme="green" onToggle={vi.fn()} />)
    expect(screen.getByText('[AMBER]')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Switch to amber phosphor theme'),
    ).toBeInTheDocument()
  })

  it('shows green option when amber theme is active', () => {
    render(<ThemeToggle theme="amber" onToggle={vi.fn()} />)
    expect(screen.getByText('[GREEN]')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Switch to green phosphor theme'),
    ).toBeInTheDocument()
  })

  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<ThemeToggle theme="green" onToggle={onToggle} />)

    await user.click(screen.getByLabelText('Switch to amber phosphor theme'))
    expect(onToggle).toHaveBeenCalledOnce()
  })
})
