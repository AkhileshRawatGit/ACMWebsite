import Hero from "@/components/home/hero"
import MissionSection from "@/components/home/mission-section"
import StatsSection from "@/components/home/stats-section"
import EventsPreview from "@/components/home/events-preview"
import VideoSection from "@/components/home/video-section"
import CTA from "@/components/home/cta"

export default function Home() {
  return (
    <>
      <Hero />
      <MissionSection />
      <StatsSection />
      <EventsPreview />
      <VideoSection />
      <CTA />
    </>
  )
}
