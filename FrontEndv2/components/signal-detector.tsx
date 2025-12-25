"use client"

import { useEffect, useRef, useState } from "react"

interface SignalDetectorProps {
  onTuneChange?: (value: number) => void
}

export function SignalDetector({ onTuneChange }: SignalDetectorProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tuneValue, setTuneValue] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const animationFrameRef = useRef<number>()
  const phaseRef = useRef(0)
  const pulsePhaseRef = useRef(0)
  const globalPhaseDriftRef = useRef(0)
  const globalFreqJitterRef = useRef(0)
  const driftVelocityRef = useRef(0)
  const jitterVelocityRef = useRef(0)
  const bendPhaseRef = useRef(0)
  const statusFadeRef = useRef(0) // 0 = searching, 1 = locked

  const CYCLES_ACROSS_WIDTH = 3 // Number of full sine cycles across screen width
  const MIN_PULSE_BPM = 0 // Pulse BPM when locked (no pulse)
  const MAX_PULSE_BPM = 90 // Pulse BPM at maximum noise (faster heartbeat)
  const PULSE_FADE_THRESHOLD = 90 // Slider value where pulse starts fading to zero
  const PULSE_STRENGTH = 1 // How much the noise layer pulses (0-1)
  const NOISE_INTENSITY_MAX = 12 // Maximum noise amplitude in pixels
  const NOISE_SPIKE_PROBABILITY = 0.5 // Chance of stronger noise spikes
  const NOISE_SPIKE_STRENGTH = 4 // Multiplier for noise spikes
  const FREQUENCY_WOBBLE_MAX = 0 // Subtle frequency drift (was 0.3)
  const AMPLITUDE_WOBBLE_MAX = 0 // Subtle amplitude variation (was 0.4)
  const PHASE_CHAOS_MAX = 0.2 // Gentle phase distortion (was 0.5)

  const BEND_CYCLES = 8 // How many bow cycles across the width (1-2 for smooth bowing)
  const BEND_SPEED = 0.16 // How fast the bend evolves over time
  const BEND_SCALE = 50 // Maximum bend amplitude in pixels

  const LOCK_THRESHOLD = 90

  useEffect(() => {
    setIsLocked(tuneValue >= LOCK_THRESHOLD)
    onTuneChange?.(tuneValue)
  }, [tuneValue, onTuneChange])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const draw = () => {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.fillStyle = "oklch(0.15 0 0)"
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = "oklch(0.25 0 0)"
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = 0; x <= width; x += width / 8) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += height / 4) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      const noiseLevel = (100 - tuneValue) / 100 // 0 = locked, 1 = full noise
      const noiseAmount = noiseLevel * NOISE_INTENSITY_MAX

      const targetFade = tuneValue >= LOCK_THRESHOLD ? 1 : 0
      statusFadeRef.current += (targetFade - statusFadeRef.current) * 0.08 // Smooth lerp

      // Pulse envelope factor
      const pulseEnvelopeFactor =
        tuneValue < PULSE_FADE_THRESHOLD
          ? 1.0
          : Math.max(0, 1 - (tuneValue - PULSE_FADE_THRESHOLD) / (100 - PULSE_FADE_THRESHOLD))

      // Pulse BPM scales from MAX at high noise to MIN at low noise
      const pulseBpm = MIN_PULSE_BPM + noiseLevel * (MAX_PULSE_BPM - MIN_PULSE_BPM)
      const pulseRate = (pulseBpm / 60) * 0.1 // Convert BPM to animation rate

      // Pulse envelope (0 to 1) with eased curve
      const rawPulse = Math.max(0, Math.sin(pulsePhaseRef.current))
      const easedPulse = rawPulse * rawPulse // Quadratic easing for sharper pulse
      const pulseEnvelope = easedPulse * pulseEnvelopeFactor

      // Noise pulse multiplier affects only noise layer, not carrier
      const noisePulseMultiplier = 1 + pulseEnvelope * PULSE_STRENGTH * noiseLevel

      const amplitude = height / 3
      const centerY = height / 2
      const baseFrequency = (Math.PI * 2 * CYCLES_ACROSS_WIDTH) / width

      const instability = noiseLevel // 1 = chaotic, 0 = stable

      // Global phase drift (entire wave slides left/right)
      if (!prefersReducedMotion) {
        // Random walk for phase drift
        driftVelocityRef.current += (Math.random() - 0.5) * 0.02 * instability
        driftVelocityRef.current *= 0.95 // Damping
        globalPhaseDriftRef.current += driftVelocityRef.current * PHASE_CHAOS_MAX * instability

        // Random walk for frequency jitter (clamped to prevent noticeable speed changes)
        jitterVelocityRef.current += (Math.random() - 0.5) * 0.0005 * instability // Reduced from 0.001
        jitterVelocityRef.current *= 0.92 // Stronger damping
        globalFreqJitterRef.current += jitterVelocityRef.current
        globalFreqJitterRef.current *= 0.95 // Faster drift back to center
        // Clamp frequency jitter to very small range to avoid tempo swings
        globalFreqJitterRef.current = Math.max(-0.02, Math.min(0.02, globalFreqJitterRef.current))

        // Advance bend phase
        bendPhaseRef.current += BEND_SPEED
      }

      // Apply global frequency jitter (breathing cycle spacing)
      const globalFrequencyWobble = globalFreqJitterRef.current * FREQUENCY_WOBBLE_MAX * instability

      // Glow layer
      if (noiseLevel > 0.1) {
        const glowIntensity = noiseLevel * 0.3 * (1 + pulseEnvelope * 0.5)
        ctx.strokeStyle = `oklch(0.55 0.25 25 / ${glowIntensity * pulseEnvelopeFactor})`
        ctx.lineWidth = 6
        ctx.filter = "blur(3px)"
        ctx.beginPath()

        for (let x = 0; x < width; x++) {
          const localFrequency = baseFrequency * (1 + globalFrequencyWobble)
          const localAmplitude = amplitude * (1 + AMPLITUDE_WOBBLE_MAX * instability)

          const baseY =
            Math.sin(x * localFrequency + phaseRef.current * 0.02 + globalPhaseDriftRef.current) * localAmplitude

          const highFreqNoise = (Math.random() - 0.5) * NOISE_INTENSITY_MAX * noisePulseMultiplier * noiseLevel
          const spike =
            Math.random() < NOISE_SPIKE_PROBABILITY
              ? (Math.random() - 0.5) * NOISE_INTENSITY_MAX * NOISE_SPIKE_STRENGTH * noisePulseMultiplier * noiseLevel
              : 0

          const y = centerY + baseY + (prefersReducedMotion ? 0 : highFreqNoise + spike)

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
        ctx.filter = "none"
      }

      // Main waveform
      ctx.strokeStyle = "oklch(0.55 0.25 25)"
      ctx.lineWidth = 2.5
      ctx.beginPath()

      for (let x = 0; x < width; x++) {
        const localFrequency = baseFrequency * (1 + globalFrequencyWobble)
        const localAmplitude = amplitude * (1 + AMPLITUDE_WOBBLE_MAX * instability)

        const bendComponent =
          Math.sin(((2 * Math.PI * x) / width) * BEND_CYCLES + bendPhaseRef.current) *
          (BEND_SCALE * instability * PHASE_CHAOS_MAX)

        const baseY =
          Math.sin(x * localFrequency + phaseRef.current * 0.02 + globalPhaseDriftRef.current) * localAmplitude

        // High-frequency noise on top
        let noise = 0
        if (!prefersReducedMotion && noiseLevel > 0.01) {
          const highFreqNoise = (Math.random() - 0.5) * NOISE_INTENSITY_MAX * noisePulseMultiplier * noiseLevel
          const spike =
            Math.random() < NOISE_SPIKE_PROBABILITY
              ? (Math.random() - 0.5) * NOISE_INTENSITY_MAX * NOISE_SPIKE_STRENGTH * noisePulseMultiplier * noiseLevel
              : 0
          noise = highFreqNoise + spike
        }

        const y = centerY + bendComponent + baseY + noise

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()

      const statusText = statusFadeRef.current > 0.5 ? "SIGNAL LOCKED" : "SEARCHING..."
      const statusOpacity =
        tuneValue >= LOCK_THRESHOLD
          ? 0.5 + statusFadeRef.current * 0.4 // Brighter when locked (0.5-0.9)
          : 0.25 + (1 - statusFadeRef.current) * 0.15 // Dimmer when searching (0.25-0.4)

      ctx.font = "700 9px ui-monospace, monospace"
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.letterSpacing = "1.5px"

      // Text glow
      ctx.shadowColor = "oklch(0.55 0.25 25)"
      ctx.shadowBlur = 4
      ctx.fillStyle = `oklch(0.55 0.25 25 / ${statusOpacity})`
      ctx.fillText(statusText, 8, 8)

      // Reset shadow
      ctx.shadowBlur = 0

      if (!prefersReducedMotion) {
        phaseRef.current += 2
        pulsePhaseRef.current += pulseRate
      }

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [
    tuneValue,
    CYCLES_ACROSS_WIDTH,
    MIN_PULSE_BPM,
    MAX_PULSE_BPM,
    PULSE_FADE_THRESHOLD,
    PULSE_STRENGTH,
    NOISE_INTENSITY_MAX,
    NOISE_SPIKE_PROBABILITY,
    NOISE_SPIKE_STRENGTH,
    FREQUENCY_WOBBLE_MAX,
    AMPLITUDE_WOBBLE_MAX,
    PHASE_CHAOS_MAX,
    BEND_CYCLES,
    BEND_SPEED,
    BEND_SCALE,
  ])

  return (
    <div className="signal-detector border-0">
      {/* Display screen with hardware bezel and glass overlays */}
      <div className="relative mb-2">
        {/* Bezel container - dark frame with inset shadow */}
        <div className="relative p-3 bg-black border-2 border-border rounded-lg shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
          {/* Canvas */}
          <canvas ref={canvasRef} width={280} height={80} className="w-full h-auto relative z-10" />

          {/* Glass overlay - diagonal sheen and vignette */}
          <div className="absolute inset-3 pointer-events-none z-20 rounded overflow-hidden">
            {/* Diagonal gradient sheen */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: "linear-gradient(135deg, transparent 0%, oklch(1 0 0 / 0.15) 45%, transparent 100%)",
              }}
            />
            {/* Subtle vignette */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(ellipse at center, transparent 40%, oklch(0 0 0 / 0.4) 100%)",
              }}
            />
          </div>

          {/* State-based screen tint overlay */}
          <div
            className={`absolute inset-3 pointer-events-none z-30 rounded transition-opacity duration-500 ${
              isLocked ? "screen-tint-locked" : "screen-tint-noisy"
            }`}
          />
        </div>
      </div>

      {/* Label above slider */}
      <label
        htmlFor="fine-tune"
        className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono px-0 my-0 text-left mx-12"
      >
        Fine Tune
      </label>

      {/* Slider and status indicator on same row */}
      <div className="flex items-center gap-24">
        <input
          id="fine-tune"
          type="range"
          min="0"
          max="100"
          value={tuneValue}
          onChange={(e) => setTuneValue(Number(e.target.value))}
          className="max-w-[160px] h-1 bg-muted-foreground/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full w-full"
        />
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 text-[rgba(255,74,74,1)] ${
              isLocked ? "bg-accent shadow-[0_0_8px_currentColor]" : "bg-muted-foreground/30"
            }`}
          />
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono whitespace-nowrap">
            {isLocked ? "LOCKED" : "NOISY"}
          </span>
        </div>
      </div>

      {/* Device label */}
      <div className="mt-2 pt-2 border-t border-border text-center">
        <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-mono text-left">
          TE-OSC-1 // Signal Detector
        </span>
      </div>
    </div>
  )
}
