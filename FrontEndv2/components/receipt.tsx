"use client"

import { useEffect, useState } from "react"

export function Receipt() {
  const [printProgress, setPrintProgress] = useState(0)
  const [currentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setPrintProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 3.33 // 100% / 30 frames ≈ 3 seconds
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const maxHeight = 160
  const currentHeight = (printProgress / 100) * maxHeight

  return (
    <div
      className="relative overflow-hidden bg-white shadow-2xl font-mono text-sm transition-all duration-100 ease-linear"
      style={{
        width: "160px",
        height: `${currentHeight}px`,
        borderRadius: "0 0 4px 4px",
      }}
    >
      <div className="p-2 space-y-0 opacity-100 py-0 px-7">
        <div className="text-center text-[10px] font-bold tracking-wide text-black">ALEX.BUILDS</div>
        <div className="text-center text-[7px] font-medium tracking-widest text-gray-600">OFFICIAL RECEIPT</div>
        <div className="border-t border-dashed border-gray-400 my-0.5" />
        <div className="text-[8px] text-gray-800 font-medium">DATE: {formatDate(currentDate)}</div>
        <div className="text-[8px] text-gray-800 font-medium">TIME: {formatTime(currentDate)}</div>
        <div className="border-t border-dashed border-gray-400 my-0.5" />
        <a
          href="mailto:aohernandezfonseca@outlook.com"
          className="block text-[8px] text-blue-600 hover:text-blue-800 hover:underline"
        >
          EMAIL:
          <br />
          aohernandez@outlook.com
        </a>
        <a
          href="https://github.com/AOHF02"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[8px] text-blue-600 hover:text-blue-800 hover:underline"
        >
          GITHUB:
          <br />
          @AOHF02
        </a>
        <a
          href="https://www.linkedin.com/in/aohernandezfonseca/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[8px] text-blue-600 hover:text-blue-800 hover:underline"
        >
          LINKEDIN:
          <br />
          /in/alexis-hernandez
        </a>
        <div className="border-t border-dashed border-gray-400 my-0.5" />
        <div className="text-center text-[7px] text-gray-500 tracking-wide">THANK YOU FOR VISITING</div>
      </div>
    </div>
  )
}
