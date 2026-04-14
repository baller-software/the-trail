import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameProvider } from '../../../src/context/GameContext'
import { IntroPhase } from '../../../src/components/phases/IntroPhase'
import { TerminalOutput } from '../../../src/components/TerminalOutput'
import { createInitialState } from '../../../src/engine/state'
import { useGameState } from '../../../src/hooks/useGameState'

function IntroWithOutput() {
  const state = useGameState()
  return (
    <>
      <TerminalOutput lines={state.output} />
      <IntroPhase />
    </>
  )
}

describe('IntroPhase', () => {
  it('displays the intro text', () => {
    render(
      <GameProvider>
        <IntroWithOutput />
      </GameProvider>,
    )
    expect(screen.getByText('*** THE OREGON TRAIL ***')).toBeInTheDocument()
    expect(
      screen.getByText(/THIS PROGRAM SIMULATES A TRIP/),
    ).toBeInTheDocument()
    expect(screen.getByText('PRESS ENTER TO CONTINUE.')).toBeInTheDocument()
  })

  it('transitions to setup phase on Enter', async () => {
    const user = userEvent.setup()
    const initialState = createInitialState()

    let currentPhase = initialState.phase

    function PhaseTracker() {
      const state = useGameState()
      currentPhase = state.phase
      return (
        <>
          <TerminalOutput lines={state.output} />
          <IntroPhase />
        </>
      )
    }

    render(
      <GameProvider>
        <PhaseTracker />
      </GameProvider>,
    )

    expect(currentPhase).toBe('intro')

    const input = screen.getByLabelText('Press Enter to continue')
    await user.type(input, '{enter}')

    expect(currentPhase).toBe('setup')
  })
})
