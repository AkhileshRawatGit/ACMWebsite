import Hero from "@/components/common/page-hero"
import EventsList from "@/components/events/events-list"

export default function EventsPage() {
  return (
    <>
      <Hero title="Events" subtitle="Join our workshops, talks, and competitions" />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <EventsList />
      </div>
    </>
  )
}
