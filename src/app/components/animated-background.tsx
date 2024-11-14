'use client'

import { useEffect, useRef } from 'react'

interface AnimatedBackgroundProps {
  isRainbowMode?: boolean  // We'll implement this feature later
}

export default function AnimatedBackground({ isRainbowMode }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Configuration
    const spacing = 30 // Space between points
    const dotSize = 2
    const amplitude = 20 // Height of the wave
    const frequency = 0.02 // How tight the waves are
    const speed = 0.02 // How fast the waves move

    let time = 0

    const animate = () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create grid of dots
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
          // Calculate wave offset
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + 
            Math.pow(y - canvas.height / 2, 2)
          )
          
          const waveOffset = Math.sin(
            distanceFromCenter * frequency + time
          ) * amplitude

          // Draw dot
          ctx.beginPath()
          ctx.fillStyle = `rgba(255, 255, 255, ${
            0.1 + Math.abs(Math.sin(distanceFromCenter * frequency + time)) * 0.1
          })`
          ctx.arc(
            x + waveOffset,
            y + waveOffset,
            dotSize,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
      }

      time += speed
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isRainbowMode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  )
}