'use client'

import CountdownTimer from './components/countdown-timer'
import AnimatedBackground from './components/animated-background'
import { useState } from 'react'

export default function Home() {
  const [isTimeUp, setIsTimeUp] = useState(false)

  return (
    <main>
      <AnimatedBackground isRainbowMode={isTimeUp} />
      <CountdownTimer onTimeUp={() => setIsTimeUp(true)} onReset={() => setIsTimeUp(false)} />
    </main>
  )
}