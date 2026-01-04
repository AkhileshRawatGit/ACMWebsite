"use client"

import { Mail, Linkedin, Github } from "lucide-react"

interface TeamCardProps {
  member: {
    name: string
    role: string
    image: string
    bio: string
    email?: string
    social: Array<{ icon: any; href: string; label: string }>
  }
  delay: number
}

export default function TeamCard({ member, delay }: TeamCardProps) {
  return (
    <div
      className="group animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="glass rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 h-full flex flex-col">
        {/* Large Circular Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent p-1">
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center flex-1 flex flex-col">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          <p className="text-primary text-lg font-semibold mb-4">{member.role}</p>

          {member.bio && (
            <p className="text-muted-foreground text-sm md:text-base mb-6 line-clamp-3 flex-1">
              {member.bio}
            </p>
          )}

          {/* Contact/Social Icons */}
          {((member.social && member.social.length > 0) || member.email) && (
            <div className="flex gap-3 justify-center mt-auto pt-4 border-t border-white/10">
              {member.social && member.social.map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    title={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-3 bg-white/10 hover:bg-primary rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}

              {/* Email Icon if available */}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  title="Email"
                  className="p-3 bg-white/10 hover:bg-primary rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
