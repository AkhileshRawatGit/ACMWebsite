import { CheckCircle } from "lucide-react"

export default function GoalsSection() {
  const goals = [
    "Promote computing as a science and profession",
    "Provide networking opportunities with industry professionals",
    "Organize workshops, seminars, and coding competitions",
    "Support student research and innovation projects",
    "Build a strong community of tech enthusiasts",
    "Mentor students for career development",
  ]

  return (
    <section className="mb-20">
      <h2 className="text-4xl font-bold mb-12 gradient-text">Our Chapter Goals</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-6 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <p className="text-lg">{goal}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
