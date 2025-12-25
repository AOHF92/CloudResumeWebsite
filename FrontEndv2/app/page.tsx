"use client"

import { useEffect, useState } from "react"
import { SignalDetector } from "@/components/signal-detector"
import { LightsToggle } from "@/components/lights-toggle"
import { ReceiptPrinter } from "@/components/receipt-printer"

export default function Resume() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [blurAmount, setBlurAmount] = useState(0)

  useEffect(() => {
    const apiUrl = "https://getcounter.azurewebsites.net/api/HttpTriggerforcrw?code="
    const appendUrl = "xSSWM4sojDKrguuFLh6EITzgm/fu7KFk/xxT5FYvJjDsRLkv2tzMxQ=="

    fetch([apiUrl, appendUrl].join(""))
      .then((response) => response.json())
      .then((response) => {
        setVisitorCount(response.VisitorCount)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Visitor count fetch failed:", error)
        setIsLoading(false)
      })
  }, [])

  const handleTuneChange = (tuneValue: number) => {
    const blur = ((100 - tuneValue) / 100) * 1.5
    setBlurAmount(blur)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="col-span-1 lg:col-span-4">
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-2 text-center">Alexis Hernández</h1>
              <p className="text-base text-muted-foreground uppercase tracking-wider">
                IT Professional / Microsoft 365 & Azure
              </p>
              <a
                href="https://www.alexbuilds.cc/"
                className="hardware-button inline-flex items-center border-0 my-0 mx-0 mt-4 gap-8 px-24 py-0 ml-14"
              >
                <span>←</span>
                <span className="py-2.5 text-left px-0 mx-0 my-0"> Return to Portfolio </span>
              </a>
            </div>
            <div className="col-span-1 lg:col-span-3 flex gap-0 mx-0 px-0 justify-center">
              <ReceiptPrinter />
            </div>
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 justify-start items-center lg:justify-center">
              <SignalDetector onTuneChange={handleTuneChange} />
              <LightsToggle />
            </div>
          </div>
        </div>
      </header>

      <div
        style={{
          filter: `blur(${blurAmount}px)`,
          transition: "filter 0.3s ease-out",
        }}
      >
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-4 text-xs uppercase tracking-widest">
              <span className="text-muted-foreground">System Status</span>
              <span
                className={`w-2 h-2 bg-accent rounded-full text-accent ${visitorCount ? "shadow-[0_0_8px_currentColor]" : ""}`}
              ></span>
              <span className="text-foreground font-bold">
                {isLoading ? "—" : visitorCount ? `${visitorCount} Visitors` : "Counter Offline"}
              </span>
            </div>
          </div>
        </div>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">[01] About</h2>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="text-lg leading-relaxed mb-4">
                  IT professional with 7+ years of experience supporting enterprise environments including Banking,
                  Healthcare, Beverage and Consulting.
                </p>
                <p className="text-base leading-relaxed mb-4 text-muted-foreground">
                  Experienced in operating and supporting Microsoft 365, Azure AD, Citrix VDI, Windows environments, and
                  endpoint management platforms.
                </p>
                <p className="text-base leading-relaxed mb-4 text-muted-foreground">
                  Strong focus on process improvement and automation, with a growing interest in intelligent tooling to
                  improve reliability, scalability, and operational efficiency across IT services.
                </p>
                <p className="text-sm mt-8">
                  <span className="text-muted-foreground">Project: </span>
                  <a
                    href="https://cloudresumechallenge.dev/docs/the-challenge/azure/"
                    className="text-foreground hover:text-accent transition-colors border-b border-border hover:border-accent"
                  >
                    Cloud Resume Challenge
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">[02] Certifications</h2>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Microsoft Azure Fundamentals",
                    "Microsoft 365 Fundamentals",
                    "CompTIA Server+",
                    "CompTIA Network+",
                  ].map((cert, i) => (
                    <div key={i} className="border border-border p-4">
                      <span className="text-xs text-muted-foreground block mb-2">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-sm font-bold">{cert}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://www.credly.com/users/alexis-hernandez.7f90f790"
                  className="hardware-button-large inline-block mt-8 border-0"
                >
                  View Credly Profile →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">[03] Experience</h2>
              </div>
              <div className="col-span-12 md:col-span-9 space-y-12">
                <div className="border-l-2 border-accent pl-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-base font-bold uppercase mb-1">Service Desk Analyst</h3>
                      <p className="text-sm text-muted-foreground">MMM Holdings LLC</p>
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Apr 2024 — Present</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Tier 1 support with Tier 2 exposure in large enterprise IT environment</li>
                    <li>• Supported Citrix VDI environments (persistent & pooled) and Windows 365 Cloud PCs</li>
                    <li>• Managed hybrid Active Directory environment and BitLocker key retrieval</li>
                    <li>• Administered Microsoft 365 email operations via Exchange Admin Center</li>
                    <li>• Supported Intune-managed devices and compliance workflows</li>
                  </ul>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-base font-bold uppercase mb-1">Jr. System Administrator</h3>
                      <p className="text-sm text-muted-foreground">AEN Consulting Engineering, PSC</p>
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Oct 2020 — Present</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Designed team targeting hierarchy for Microsoft Teams</li>
                    <li>• Implemented support ticketing system using Azure IaaS (osTicket)</li>
                    <li>• Managed M365 cloud services (Teams, OneDrive, SharePoint, Azure AD)</li>
                  </ul>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-base font-bold uppercase mb-1">IT Technical Support Specialist</h3>
                      <p className="text-sm text-muted-foreground">Business Staffing Solutions</p>
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Sep 2021 — Jul 2022</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Provided IT support to clients and network monitoring services</li>
                    <li>• Managed M365 cloud services across client environments</li>
                  </ul>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-base font-bold uppercase mb-1">System Analyst</h3>
                      <p className="text-sm text-muted-foreground">Next Consulting Group Inc.</p>
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Jan 2020 — Mar 2020</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Administered Windows systems security patches and maintenance</li>
                    <li>• Developed scripts to solve high-sensitivity vulnerabilities</li>
                    <li>• Resolved 3000+ vulnerabilities in 3 months</li>
                  </ul>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-base font-bold uppercase mb-1">Security Information Analyst</h3>
                      <p className="text-sm text-muted-foreground">Cortelco Systems Puerto Rico, Inc.</p>
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Feb 2018 — May 2019</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Implemented cyber-security solutions and CyberArk PAS</li>
                    <li>• Managed security projects and client relationships</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">© 2025 Alexis Hernandez</div>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/aohernandezfonseca"
                  className="hardware-button border-0"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://github.com/AOHF92" className="hardware-button border-0" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-6.627-5.373-12-12-12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                  </svg>
                </a>
                <a
                  href="https://www.credly.com/users/alexis-hernandez.7f90f790"
                  className="hardware-button border-0"
                  aria-label="Credly"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                    <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6z" />
                    <path d="M12 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4z" />
                  </svg>
                </a>
              </div>
              <div className="text-xs text-muted-foreground">Built with Next.js • Deployed on Azure</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
