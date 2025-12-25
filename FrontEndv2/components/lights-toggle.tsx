"use client"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export function LightsToggle({ tuneValue = 100 }: { tuneValue?: number }) {
  const [lightsOn, setLightsOn] = useState(true)

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem("lights-on", String(lightsOn))
  }, [lightsOn])

  const toggleLights = () => {
    setLightsOn((prev) => !prev)
  }

  return (
    <>
      <div className="light-switch-plate">
        <span className="light-switch-label">LIGHTS</span>
        <button
          onClick={toggleLights}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              toggleLights()
            }
          }}
          className="light-switch-container"
          aria-label={lightsOn ? "Turn lights off" : "Turn lights on"}
          aria-pressed={!lightsOn}
        >
          {/* Rocker switch that moves up/down */}
          <div className={`light-switch-rocker ${lightsOn ? "rocker-up" : "rocker-down"}`}>
            <div className="rocker-top" />
            <div className="rocker-bottom" />
          </div>
        </button>
        {/* LED indicator at bottom of plate */}
        <div className={`light-switch-led ${!lightsOn ? "led-active" : "led-inactive"}`} />
      </div>
      <AmbientOverlay active={!lightsOn} tuneValue={tuneValue} />
    </>
  )
}

function AmbientOverlay({ active, tuneValue = 100 }: { active: boolean; tuneValue?: number }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!active) return null
  if (!isMounted) return null

  // tuneValue 0 (noisy) → intensity 1.0 (strongest)
  // tuneValue 100 (locked) → intensity 0.5 (calmer)
  const intensity = 1 - (tuneValue / 100) * 0.5

  const overlayElement = (
    <div
      id="ambient-overlay"
      className="ambient-overlay"
      style={{
        opacity: intensity,
      }}
    />
  )

  return createPortal(overlayElement, document.body)
}
