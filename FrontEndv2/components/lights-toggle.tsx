"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

export function LightsToggle() {
  const [lightsOn, setLightsOn] = useState(true)
  const lastMousePosRef = useRef({ x: 0, y: 0 })

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("lights-on")
    if (stored !== null) {
      setLightsOn(stored === "true")
    }
  }, [])

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem("lights-on", String(lightsOn))
  }, [lightsOn])

  useEffect(() => {
    const trackMousePosition = (e: MouseEvent) => {
      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", trackMousePosition, { passive: true })
    return () => window.removeEventListener("mousemove", trackMousePosition)
  }, [])

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
      <FlashlightOverlay active={!lightsOn} initialPosition={lastMousePosRef.current} />
    </>
  )
}

function FlashlightOverlay({
  active,
  initialPosition,
}: { active: boolean; initialPosition: { x: number; y: number } }) {
  useEffect(() => {
    if (!active) return

    const overlay = document.getElementById("flashlight-overlay")
    if (!overlay) return

    let rafId: number | null = null
    let mouseX = initialPosition.x || (typeof window !== "undefined" ? window.innerWidth / 2 : 0)
    let mouseY = initialPosition.y || (typeof window !== "undefined" ? window.innerHeight / 2 : 0)

    const updatePosition = () => {
      overlay.style.setProperty("--x", `${mouseX}px`)
      overlay.style.setProperty("--y", `${mouseY}px`)
      rafId = null
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (rafId === null) {
        rafId = requestAnimationFrame(updatePosition)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
        if (rafId === null) {
          rafId = requestAnimationFrame(updatePosition)
        }
      }
    }

    // Initialize position
    updatePosition()

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [active, initialPosition])

  if (!active) return null

  return (
    <div
      id="flashlight-overlay"
      className="flashlight-overlay"
      style={
        {
          "--x": initialPosition.x ? `${initialPosition.x}px` : "50vw",
          "--y": initialPosition.y ? `${initialPosition.y}px` : "50vh",
        } as React.CSSProperties
      }
    />
  )
}
