import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameProvider } from '../../../src/context/GameContext'
import { SetupPhase } from '../../../src/components/phases/SetupPhase'
import { TerminalOutput } from '../../../src/components/TerminalOutput'
import { createInitialState } from '../../../src/engine/state'
import { useGameState } from '../../../src/hooks/useGameState'

function SetupWithOutput() {
  const state = useGameState()
  return (
    <>
      <TerminalOutput lines={state.output} />
      <SetupPhase />
    </>
  )
}

describe('SetupPhase', () => {
  const setupState = {
    ...createInitialState(),
    phase: 'setup' as const,
  }

  it('shows oxen purchasing prompt first', () => {
    render(
      <GameProvider initialState={setupState}>
        <SetupWithOutput />
      </GameProvider>,
    )
    expect(
      screen.getByText(/HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM/),
    ).toBeInTheDocument()
  })

  it('rejects oxen purchase below $200', async () => {
    const user = userEvent.setup()
    render(
      <GameProvider initialState={setupState}>
        <SetupWithOutput />
      </GameProvider>,
    )

    const input = screen.getByLabelText('Enter amount for oxen')
    await user.type(input, '100{enter}')

    expect(
      screen.getByText('YOU MUST SPEND AT LEAST $200 ON OXEN.'),
    ).toBeInTheDocument()
  })

  it('advances to food prompt after valid oxen purchase', async () => {
    const user = userEvent.setup()
    render(
      <GameProvider initialState={setupState}>
        <SetupWithOutput />
      </GameProvider>,
    )

    const input = screen.getByLabelText('Enter amount for oxen')
    await user.type(input, '200{enter}')

    expect(
      screen.getByText(/HOW MUCH DO YOU WANT TO SPEND ON FOOD/),
    ).toBeInTheDocument()
  })

  it('rejects purchases exceeding remaining budget', async () => {
    const user = userEvent.setup()
    render(
      <GameProvider initialState={setupState}>
        <SetupWithOutput />
      </GameProvider>,
    )

    const input = screen.getByLabelText('Enter amount for oxen')
    await user.type(input, '800{enter}')

    expect(screen.getByText(/YOU DO NOT HAVE THAT MUCH/)).toBeInTheDocument()
  })
})
