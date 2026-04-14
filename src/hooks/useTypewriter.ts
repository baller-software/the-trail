import { useState, useEffect, useCallback, useRef } from 'react'
import type { OutputLine } from '../engine/types'

const CHAR_DELAY_MS = 35

/**
 * Typewriter effect hook.
 * Reveals lines character-by-character, skippable on any keypress.
 * Respects prefers-reduced-motion by showing text instantly.
 */
export function useTypewriter(allLines: OutputLine[], enabled = true) {
  const [revealedCount, setRevealedCount] = useState(0)
  const [partialText, setPartialText] = useState('')
  const animatingRef = useRef(false)

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const shouldAnimate = enabled && !prefersReducedMotion

  // When new lines arrive, the gap between revealedCount and allLines.length
  // defines what needs to be animated
  const hasUnrevealed = revealedCount < allLines.length
  const isAnimating = shouldAnimate && hasUnrevealed

  useEffect(() => {
    if (!shouldAnimate) {
      // Instantly reveal all lines
      setRevealedCount(allLines.length)
      setPartialText('')
      return
    }
  }, [allLines.length, shouldAnimate])

  useEffect(() => {
    if (!shouldAnimate || revealedCount >= allLines.length) {
      animatingRef.current = false
      setPartialText('')
      return
    }

    animatingRef.current = true
    const currentLine = allLines[revealedCount]

    // Skip empty lines instantly
    if (currentLine.text === '') {
      setRevealedCount((c) => c + 1)
      return
    }

    if (partialText.length < currentLine.text.length) {
      const timer = setTimeout(() => {
        setPartialText(currentLine.text.slice(0, partialText.length + 1))
      }, CHAR_DELAY_MS)
      return () => clearTimeout(timer)
    }

    // Line complete — advance
    setRevealedCount((c) => c + 1)
    setPartialText('')
  }, [shouldAnimate, revealedCount, partialText, allLines])

  const skip = useCallback(() => {
    if (revealedCount < allLines.length) {
      setRevealedCount(allLines.length)
      setPartialText('')
      animatingRef.current = false
    }
  }, [revealedCount, allLines.length])

  // Build visible lines
  const visibleLines: OutputLine[] = allLines.slice(0, revealedCount)
  if (shouldAnimate && revealedCount < allLines.length && partialText) {
    visibleLines.push({
      text: partialText,
      brightness: allLines[revealedCount].brightness,
    })
  }

  return {
    visibleLines: shouldAnimate ? visibleLines : allLines,
    isAnimating,
    skip,
  }
}
