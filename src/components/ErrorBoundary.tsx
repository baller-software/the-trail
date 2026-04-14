import { Component, type ReactNode, type ErrorInfo } from 'react'
import crtStyles from '../styles/crt-effects.module.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Game error:', error, errorInfo)
  }

  handleRestart = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className={crtStyles.glow}
          style={{ color: 'var(--color-bright)', padding: '2em' }}
        >
          <div>*** SYSTEM ERROR ***</div>
          <div>&nbsp;</div>
          <div>AN UNEXPECTED ERROR HAS OCCURRED.</div>
          <div>&nbsp;</div>
          <div>
            <button
              onClick={this.handleRestart}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-bright)',
                font: 'inherit',
                fontSize: 'inherit',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'none',
              }}
            >
              {'> '}PRESS HERE TO RESTART
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
