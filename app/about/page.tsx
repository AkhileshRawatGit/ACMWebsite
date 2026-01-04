import Hero from "@/components/common/page-hero"
import TeamPreview from "@/components/about/team-preview"
import GoalsSection from "@/components/about/goals-section"
import FacultyCoordinator from "@/components/about/faculty-coordinator"

export default function AboutPage() {
  return (
    <>
      <Hero title="About ACM SRHU" subtitle="Learn more about our chapter and mission" />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="prose prose-lg max-w-3xl mb-20">
          <h2 className="text-4xl font-bold mb-6 gradient-text">What is ACM?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            The Association for Computing Machinery (ACM) is the world's largest educational and scientific computing
            society. It delivers resources that advance computing as a science and profession.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            The ACM SRHU Student Chapter is dedicated to fostering excellence in computing education and innovation at
            Swami Rama Himalayan University. Through workshops, competitions, and networking events, we provide students
            with opportunities to learn from industry experts and fellow enthusiasts.
          </p>
        </div>

        <FacultyCoordinator />
        <GoalsSection />
        <TeamPreview />
      </div>
    </>
  )
}
