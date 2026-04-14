import { useGameState } from '../hooks/useGameState'
import { IntroPhase } from './phases/IntroPhase'
import { SetupPhase } from './phases/SetupPhase'
import { TravelPhase } from './phases/TravelPhase'
import { EventPhase } from './phases/EventPhase'
import { HuntingPhase } from './phases/HuntingPhase'
import { RiverPhase } from './phases/RiverPhase'
import { FortPhase } from './phases/FortPhase'
import { GameOverPhase } from './phases/GameOverPhase'

export function GamePhaseRenderer() {
  const state = useGameState()

  switch (state.phase) {
    case 'intro':
      return <IntroPhase />
    case 'setup':
      return <SetupPhase />
    case 'traveling':
      return <TravelPhase />
    case 'event':
      return <EventPhase />
    case 'hunting':
      return <HuntingPhase />
    case 'river':
      return <RiverPhase />
    case 'fort':
      return <FortPhase />
    case 'gameOver':
      return <GameOverPhase />
    default: {
      const _exhaustive: never = state.phase
      return _exhaustive
    }
  }
}
