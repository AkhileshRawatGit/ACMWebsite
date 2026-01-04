"use client"

import { useEffect, useState } from "react"

export default function StatsSection() {
  const [counts, setCounts] = useState({ members: 0, events: 0, workshops: 0, projects: 0 })
  const [targetCounts, setTargetCounts] = useState({ members: 0, events: 0, workshops: 0, projects: 0 })

  useEffect(() => {
    // Fetch settings from API
    fetch("/api/settings?t=" + new Date().getTime(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.stats) {
          setTargetCounts({
            members: Number(data.stats.members) || 0,
            events: Number(data.stats.events) || 0,
            workshops: Number(data.stats.workshops) || 0,
            projects: Number(data.stats.projects) || 0,
          })
        }
      })
      .catch((err) => console.error("Failed to fetch settings:", err))
  }, [])

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      setCounts({
        members: Math.floor(targetCounts.members * progress),
        events: Math.floor(targetCounts.events * progress),
        workshops: Math.floor(targetCounts.workshops * progress),
        projects: Math.floor(targetCounts.projects * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setCounts(targetCounts)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [targetCounts])

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Members", value: counts.members },
            { label: "Events Conducted", value: counts.events },
            { label: "Projects", value: counts.projects },
            { label: "Workshops", value: counts.workshops },
          ].map((stat, idx) => (
            <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">{stat.value}+</div>
              <p className="text-lg text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
