"use client"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export function LightsToggle() {
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
      <AmbientOverlay active={!lightsOn} />
    </>
  )
}

function AmbientOverlay({ active }: { active: boolean }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!active) return null
  if (!isMounted) return null

  const overlayElement = <div id="ambient-overlay" className="ambient-overlay" />

  return createPortal(overlayElement, document.body)
}
