import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'

describe('App', () => {
  it('renders the landing page by default', () => {
    render(<App />)
    expect(screen.getByText('YOU HAVE DIED OF DYSENTERY')).toBeInTheDocument()
    expect(screen.getByText('[ BOOT SYSTEM ]')).toBeInTheDocument()
  })

  it('transitions to game on BOOT SYSTEM click', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('[ BOOT SYSTEM ]'))

    expect(screen.getByLabelText('Press Enter to continue')).toBeInTheDocument()
  })
})
