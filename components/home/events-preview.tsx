"use client"
import { useState, useEffect } from "react"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function EventsPreview() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      if (response.ok) {
        const events = await response.json()
        const today = new Date()
        const futureEvents = events
          .filter((e: any) => new Date(e.date) >= today)
          .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3)
        setUpcomingEvents(futureEvents)
      }
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return null
  if (upcomingEvents.length === 0) return null

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Upcoming Events</h2>
            <p className="text-muted-foreground">Join us for amazing learning opportunities</p>
          </div>
          <Link
            href="/events"
            className="hidden sm:flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, idx) => (
            <div
              key={event.id}
              className="rounded-xl overflow-hidden glass hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-full h-40 bg-muted overflow-hidden relative group">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location}
                  </div>
                </div>
                <Link
                  href="/events"
                  className="block w-full text-center py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/events"
            className="block w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-center font-semibold"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}
