import Hero from "@/components/common/page-hero"
import TeamGrid from "@/components/team/team-grid"

export default function TeamPage() {
  return (
    <>
      <Hero title="Our Team" subtitle="Meet the passionate leaders driving ACM SRHU" />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <TeamGrid />
      </div>
    </>
  )
}
