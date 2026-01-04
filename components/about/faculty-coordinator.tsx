"use client"

import { useState, useEffect } from "react"
import { Mail, Linkedin, Globe, Loader2 } from "lucide-react"

interface FacultyCoordinator {
  name: string
  title: string
  email: string
  phone?: string
  bio?: string
  image?: string
  linkedinUrl?: string
  linkedin_url?: string
  websiteUrl?: string
  website_url?: string
}

export default function FacultyCoordinator() {
  const [coordinator, setCoordinator] = useState<FacultyCoordinator | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCoordinator()
  }, [])

  const fetchCoordinator = async () => {
    try {
      const response = await fetch("/api/faculty-coordinator")
      if (response.ok) {
        const data = await response.json()
        setCoordinator(data)
      }
    } catch (error) {
      console.error("Failed to fetch faculty coordinator:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="mb-20">
        <h2 className="text-4xl font-bold mb-12 gradient-text">Faculty Coordinator</h2>
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin h-12 w-12 text-primary" />
        </div>
      </section>
    )
  }

  if (!coordinator) {
    return null
  }

  const linkedinUrl = coordinator.linkedinUrl || coordinator.linkedin_url
  const websiteUrl = coordinator.websiteUrl || coordinator.website_url

  return (
    <section className="mb-20">
      <h2 className="text-4xl font-bold mb-12 gradient-text">Faculty Coordinator</h2>
      <div className="max-w-2xl glass rounded-xl p-8 hover:shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          {/* Circular Image */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent p-1">
              <img
                src={coordinator.image || "/professor-faculty-member-portrait.jpg"}
                alt={coordinator.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-3xl font-bold mb-2">{coordinator.name}</h3>
            <p className="text-primary font-semibold mb-3">{coordinator.title}</p>

            {coordinator.bio && (
              <p className="text-muted-foreground mb-6">
                {coordinator.bio}
              </p>
            )}

            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${coordinator.email}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Mail size={18} />
                {coordinator.email}
              </a>

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              )}

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Globe size={18} />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
