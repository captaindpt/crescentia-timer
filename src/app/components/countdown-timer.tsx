'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'

const TIMER_STYLES = {
    fontSize: 'text-[17vw]',  // Adjust this single value to change text size
    fontFamily: "font-['GT_America_Mono_Ultra_Light']",
    spacing: 'tracking-widest',
    color: 'text-white',
  } as const

const INITIAL_TIME = 3600 // 60 minutes in seconds

export default function CountdownTimer({ onTimeUp, onReset }: { onTimeUp: () => void, onReset: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, '') // Strip non-digits
    
    // Take only the last 4 digits if longer
    const digits = input.slice(-4).padStart(4, '0')
    
    // Parse minutes and seconds
    const minutes = parseInt(digits.slice(0, 2), 10)
    const seconds = parseInt(digits.slice(2), 10)
    
    // Update time if valid
    if (seconds <= 59) {
      setTimeLeft((Math.min(minutes, 99) * 60) + seconds)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow left/right arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') return
    
    // Prevent default behavior for non-numeric keys
    if (!/^\d$/.test(e.key) && !['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(e.key)) {
      e.preventDefault()
    }
  }

  const formatTimeInput = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    setMounted(true)
    setTimeLeft(INITIAL_TIME)
  }, [])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(intervalRef.current!)
          setIsRunning(false)
          // Move the isTimeUp state update to a separate useEffect
          return 0
        }
        return time - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      onTimeUp() // Just call onTimeUp, remove setIsTimeUp
    }
  }, [timeLeft, isRunning, onTimeUp])
  const handleCancel = () => {
  setIsRunning(false)
  setTimeLeft(INITIAL_TIME)
  onReset() // Just call onReset, remove setIsTimeUp
  if (intervalRef.current) {
    clearInterval(intervalRef.current)
  }
}    
  
  const handleStart = () => setIsRunning(true)

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center" suppressHydrationWarning>
      <div className="space-y-8">
      {!isRunning ? (
          <input
            ref={inputRef}
            type="text"
            value={formatTimeInput(timeLeft)}
            onChange={handleTimeInput}
            onKeyDown={handleKeyDown}
            className={`text-center ${TIMER_STYLES.fontSize} ${TIMER_STYLES.fontFamily} ${TIMER_STYLES.spacing} ${TIMER_STYLES.color} bg-transparent w-full focus:outline-none`}
            maxLength={5}
            pattern="\d*"
          />
        ) : (
          <div className={`text-center ${TIMER_STYLES.fontSize} ${TIMER_STYLES.fontFamily} ${TIMER_STYLES.spacing} ${TIMER_STYLES.color}`}>
            {formatTimeInput(timeLeft)}
          </div>
        )}
        {!isRunning ? (
          <Button
            className="mx-auto flex h-16 items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-black hover:bg-white/90"
            onClick={handleStart}
          >
            Start
          </Button>
        ) : (
          <Button
            className="mx-auto flex h-16 items-center justify-center rounded-full bg-red-500 px-8 text-lg font-semibold text-white hover:bg-red-600"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}