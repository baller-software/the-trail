import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from '../../src/components/ErrorBoundary'

function ThrowingComponent(): React.ReactNode {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>SAFE CONTENT</div>
      </ErrorBoundary>,
    )
    expect(screen.getByText('SAFE CONTENT')).toBeInTheDocument()
  })

  it('renders error message on error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    )
    expect(screen.getByText('*** SYSTEM ERROR ***')).toBeInTheDocument()
    vi.restoreAllMocks()
  })

  it('recovers when restart is clicked', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const user = userEvent.setup()

    let shouldThrow = true
    function MaybeThrow() {
      if (shouldThrow) throw new Error('Test error')
      return <div>RECOVERED</div>
    }

    const { rerender } = render(
      <ErrorBoundary>
        <MaybeThrow />
      </ErrorBoundary>,
    )

    expect(screen.getByText('*** SYSTEM ERROR ***')).toBeInTheDocument()

    shouldThrow = false
    await user.click(screen.getByText(/PRESS HERE TO RESTART/))

    rerender(
      <ErrorBoundary>
        <MaybeThrow />
      </ErrorBoundary>,
    )

    expect(screen.getByText('RECOVERED')).toBeInTheDocument()
    vi.restoreAllMocks()
  })
})
