import { BookOpen, Code, FileText, LinkIcon, Github, Globe } from "lucide-react"

export default function ResourcesGrid() {
  const resources = [
    {
      category: "Coding Tutorials",
      icon: Code,
      items: [
        { title: "LeetCode", url: "#", description: "Competitive programming practice" },
        { title: "HackerRank", url: "#", description: "Coding challenges and tutorials" },
        { title: "Codeforces", url: "#", description: "Competitive programming contests" },
        { title: "GeeksforGeeks", url: "#", description: "Comprehensive DSA tutorials" },
      ],
    },
    {
      category: "Web Development",
      icon: Globe,
      items: [
        { title: "MDN Web Docs", url: "#", description: "Complete web development guide" },
        { title: "FreeCodeCamp", url: "#", description: "Free coding courses" },
        { title: "W3Schools", url: "#", description: "Web technologies reference" },
        { title: "Next.js Docs", url: "#", description: "Modern React framework" },
      ],
    },
    {
      category: "Research & Papers",
      icon: FileText,
      items: [
        { title: "IEEE Xplore", url: "#", description: "Research papers database" },
        { title: "ArXiv", url: "#", description: "Preprints of research papers" },
        { title: "Google Scholar", url: "#", description: "Scholarly research search" },
        { title: "ResearchGate", url: "#", description: "Research collaboration" },
      ],
    },
    {
      category: "Development Tools",
      icon: Github,
      items: [
        { title: "GitHub", url: "#", description: "Version control and collaboration" },
        { title: "Stack Overflow", url: "#", description: "Q&A for developers" },
        { title: "VS Code", url: "#", description: "Powerful code editor" },
        { title: "Docker", url: "#", description: "Containerization platform" },
      ],
    },
    {
      category: "Learning Platforms",
      icon: BookOpen,
      items: [
        { title: "Coursera", url: "#", description: "Online university courses" },
        { title: "Udemy", url: "#", description: "Affordable online courses" },
        { title: "LinkedIn Learning", url: "#", description: "Professional development" },
        { title: "Pluralsight", url: "#", description: "Tech skill development" },
      ],
    },
    {
      category: "ACM Resources",
      icon: LinkIcon,
      items: [
        { title: "ACM Official", url: "#", description: "Association for Computing Machinery" },
        { title: "ACM Digital Library", url: "#", description: "Research publications" },
        { title: "ACM Learning Center", url: "#", description: "Educational resources" },
        { title: "ACM Careers", url: "#", description: "Job board and opportunities" },
      ],
    },
  ]

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 gradient-text">Curated Resources</h2>
      <p className="text-lg text-muted-foreground mb-12">
        Access a collection of tools, platforms, and resources to support your learning and development journey.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, idx) => {
          const Icon = resource.icon
          return (
            <div
              key={idx}
              className="rounded-xl glass overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">{resource.category}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {resource.items.map((item, itemIdx) => (
                  <a key={itemIdx} href={item.url} className="block p-3 rounded-lg hover:bg-white/10 transition-colors">
                    <p className="font-semibold text-sm mb-1 hover:text-primary">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
