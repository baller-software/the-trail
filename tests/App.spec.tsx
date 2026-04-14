import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App', () => {
  it('renders the intro phase with input prompt', () => {
    render(<App />)
    // The typewriter effect delays text, but the input is shown immediately
    expect(screen.getByLabelText('Press Enter to continue')).toBeInTheDocument()
  })

  it('renders the theme toggle', () => {
    render(<App />)
    expect(
      screen.getByLabelText('Switch to amber phosphor theme'),
    ).toBeInTheDocument()
  })
})
