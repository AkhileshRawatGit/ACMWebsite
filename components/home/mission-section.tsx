import { Target, Lightbulb, Users } from "lucide-react"

export default function MissionSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We strive to inspire and educate the next generation of computing professionals through innovation,
            collaboration, and excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Our Vision",
              description:
                "To be the leading computing community at SRHU, fostering innovation and professional development.",
            },
            {
              icon: Lightbulb,
              title: "Innovation First",
              description:
                "We encourage creative thinking and experimentation in all areas of computing and technology.",
            },
            {
              icon: Users,
              title: "Community Driven",
              description:
                "Building a supportive network where students can learn, grow, and achieve their goals together.",
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-8 rounded-xl glass hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
