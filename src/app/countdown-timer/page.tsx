'use client'

import CountdownTimer from '@/app/components/countdown-timer'
import AnimatedBackground from '@/app/components/animated-background'
import { useState } from 'react'

export default function CountdownTimerPage() {
  const [isTimeUp, setIsTimeUp] = useState(false)

  const handleTimeUp = () => {
    setIsTimeUp(true)
  }

  const handleReset = () => {
    setIsTimeUp(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <AnimatedBackground isRainbowMode={isTimeUp} />
      <CountdownTimer 
        onTimeUp={handleTimeUp} 
        onReset={handleReset}
      />
    </main>
  )
}