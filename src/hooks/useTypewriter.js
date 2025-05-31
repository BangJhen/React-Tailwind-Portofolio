import { useState, useEffect, useRef } from 'react'

export const useTypewriter = (text, speed = 100, delay = 0, pauseTime = 3000, backspaceSpeed = 25) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true) // true for typing, false for backspacing
  const [isPaused, setIsPaused] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const textRef = useRef(text)

  // Reset everything when text changes
  useEffect(() => {
    if (textRef.current !== text) {
      textRef.current = text
      setDisplayText('')
      setCurrentIndex(0)
      setIsTyping(true)
      setIsPaused(false)
      setHasStarted(false)
    }
  }, [text])

  // Handle initial delay
  useEffect(() => {
    if (!hasStarted && delay > 0) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else if (!hasStarted && delay === 0) {
      setHasStarted(true)
    }
  }, [delay, hasStarted])

  // Handle the main typing/backspacing loop
  useEffect(() => {
    if (!hasStarted) return

    let timer

    if (isPaused) {
      // Pause after typing is complete before starting to backspace
      timer = setTimeout(() => {
        setIsPaused(false)
        setIsTyping(false) // Start backspacing
      }, pauseTime)
    } else if (isTyping) {
      // Typing forward
      if (currentIndex < text.length) {
        timer = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(prev => prev + 1)
        }, speed)
      } else {
        // Finished typing, start pause
        setIsPaused(true)
      }
    } else {
      // Backspacing
      if (currentIndex > 0) {
        timer = setTimeout(() => {
          setCurrentIndex(prev => prev - 1)
          setDisplayText(text.slice(0, currentIndex - 1))
        }, backspaceSpeed)
      } else {
        // Finished backspacing, start typing again
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, backspaceSpeed, pauseTime, hasStarted, isTyping, isPaused])

  return { displayText, isTyping }
}
