"use client"

import { useState } from "react"
import { Receipt } from "@/components/receipt"

export function ReceiptPrinter() {
  const [showReceipt, setShowReceipt] = useState(false)

  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      {/* PRINTER HOLE - Double-layer recessed design matching reference */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-full"
        style={{ width: "164px", height: "14px" }}
      >
        {/* Outer recessed pill - carved look */}
        <div className="absolute inset-0 rounded-full bg-card shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),inset_0_-1px_2px_rgba(255,255,255,0.05)]" />

        {/* Inner darker slot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[inset_0_2px_3px_rgba(0,0,0,0.8)]"
          style={{ width: "160px", height: "10px" }}
        >
          {/* Subtle highlight line for realism */}
          <div className="absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
        </div>
      </div>

      {/* RECEIPT - Animated printing */}
      {showReceipt && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <Receipt />
        </div>
      )}

      {/* PRINT CARD BUTTON - styled to match hardware buttons */}
      <button
        onClick={() => setShowReceipt(!showReceipt)}
        className="hardware-button-large inline-flex items-center gap-2 mt-20 border-card border"
      >
        <svg
          className="h-4 w-4 text-popover-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="text-primary"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        <span className="text-sm font-medium uppercase tracking-wider text-black">Print Card</span>
      </button>
    </div>
  )
}
