import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameProvider } from '../../../src/context/GameContext'
import { GameOverPhase } from '../../../src/components/phases/GameOverPhase'
import { TerminalOutput } from '../../../src/components/TerminalOutput'
import { createInitialState } from '../../../src/engine/state'
import { useGameState } from '../../../src/hooks/useGameState'

function GameOverWithOutput() {
  const state = useGameState()
  return (
    <>
      <TerminalOutput lines={state.output} />
      <GameOverPhase />
    </>
  )
}

describe('GameOverPhase', () => {
  it('displays win message when reached Oregon', () => {
    const state = {
      ...createInitialState(),
      phase: 'gameOver' as const,
      gameOverReason: 'reachedOregon' as const,
    }

    render(
      <GameProvider initialState={state}>
        <GameOverWithOutput />
      </GameProvider>,
    )

    expect(screen.getByText('*** CONGRATULATIONS! ***')).toBeInTheDocument()
    expect(
      screen.getByText('WOULD YOU LIKE TO PLAY AGAIN?'),
    ).toBeInTheDocument()
  })

  it('displays loss message when all dead', () => {
    const state = {
      ...createInitialState(),
      phase: 'gameOver' as const,
      gameOverReason: 'allDead' as const,
    }

    render(
      <GameProvider initialState={state}>
        <GameOverWithOutput />
      </GameProvider>,
    )

    expect(
      screen.getByText('*** YOUR ENTIRE PARTY HAS PERISHED ***'),
    ).toBeInTheDocument()
  })

  it('resets game when player chooses to play again', async () => {
    const user = userEvent.setup()

    let currentPhase = 'gameOver'

    function PhaseTracker() {
      const state = useGameState()
      currentPhase = state.phase
      return (
        <>
          <TerminalOutput lines={state.output} />
          <GameOverPhase />
        </>
      )
    }

    const state = {
      ...createInitialState(),
      phase: 'gameOver' as const,
      gameOverReason: 'reachedOregon' as const,
    }

    render(
      <GameProvider initialState={state}>
        <PhaseTracker />
      </GameProvider>,
    )

    const input = screen.getByLabelText('Play again?')
    await user.type(input, '1{enter}')

    expect(currentPhase).toBe('intro')
  })
})
