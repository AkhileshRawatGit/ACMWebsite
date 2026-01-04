import { Trophy, Users, BookOpen, Zap, Briefcase, Award } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      icon: Trophy,
      title: "Competitions",
      description: "Participate in coding contests, hackathons, and innovation challenges.",
    },
    {
      icon: Users,
      title: "Networking",
      description: "Connect with industry professionals and like-minded peers.",
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access to tutorials, courses, and technical documentation.",
    },
    {
      icon: Zap,
      title: "Workshops",
      description: "Learn emerging technologies from expert instructors.",
    },
    {
      icon: Briefcase,
      title: "Career Development",
      description: "Interview prep, resume reviews, and job opportunities.",
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Earn recognized certifications through ACM programs.",
    },
  ]

  return (
    <section>
      <h2 className="text-4xl font-bold mb-4 gradient-text">Why Join ACM?</h2>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        Membership gives you access to exclusive opportunities, resources, and a community of passionate technologists.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon
          return (
            <div
              key={idx}
              className="p-6 rounded-lg glass hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <Icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          )
        })}
      </div>

      <div className="p-8 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <h3 className="text-2xl font-bold mb-4">Membership Benefits at a Glance</h3>
        <ul className="grid md:grid-cols-2 gap-4 text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Free access to all workshops and events
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Monthly tech talks from industry experts
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Exclusive job postings and internships
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Member discounts on certifications
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Networking opportunities with mentors
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Access to ACM global resources
          </li>
        </ul>
      </div>
    </section>
  )
}
