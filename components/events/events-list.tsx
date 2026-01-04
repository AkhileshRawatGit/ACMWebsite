"use client"

import { useState, useEffect } from "react"
import EventCard from "./event-card"

export default function EventsList() {
  const [filter, setFilter] = useState("all")
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = filter === "all" ? events : events.filter((e) => e.category === filter)

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No events found. Check back soon!
      </div>
    )
  }

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 gradient-text">All Events</h2>
        <div className="flex flex-wrap gap-3">
          {["all", "workshop", "talk", "competition", "hackathon"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${filter === cat ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredEvents.map((event, idx) => (
          <EventCard key={event.id} event={event} delay={idx * 0.05} />
        ))}
      </div>
    </div>
  )
}
