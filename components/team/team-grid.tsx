"use client"

import { useState, useEffect } from "react"
import TeamCard from "./team-card"
import { Linkedin, Github, Mail } from "lucide-react"

export default function TeamGrid() {
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      const response = await fetch("/api/team")
      if (response.ok) {
        const data = await response.json()
        setTeamMembers(data)
      }
    } catch (error) {
      console.error("Failed to fetch team:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No team members found.
      </div>
    )
  }

  // Helper to format social links for TeamCard
  const formatMember = (member: any) => ({
    ...member,
    social: [
      { icon: Linkedin, href: member.socialLinks?.linkedin || member.social_links?.linkedin || "#", label: "LinkedIn" },
      { icon: Github, href: member.socialLinks?.github || member.social_links?.github || "#", label: "GitHub" },
    ].filter(link => link.href && link.href !== "#")
  })

  // Group members into rows of 5
  const membersPerRow = 5
  const rows: any[][] = []
  for (let i = 0; i < teamMembers.length; i += membersPerRow) {
    rows.push(teamMembers.slice(i, i + membersPerRow))
  }

  return (
    <div className="space-y-12 overflow-hidden">
      {rows.map((row, rowIndex) => {
        // Determine if odd or even row (1-indexed)
        const isOddRow = (rowIndex + 1) % 2 === 1

        // Duplicate the row members for seamless infinite scroll
        const duplicatedRow = [...row, ...row, ...row]

        return (
          <div key={rowIndex} className="relative">
            {/* Infinite scroll container */}
            <div
              className="flex gap-8"
              style={{
                // @ts-ignore
                "--scroll-width": `calc(-320px * ${row.length} - 2rem * ${row.length})`,
                animation: isOddRow
                  ? `scroll-right-to-left 30s linear infinite`
                  : `scroll-left-to-right 30s linear infinite`,
              }}
            >
              {duplicatedRow.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="flex-shrink-0 w-80"
                >
                  <TeamCard
                    member={formatMember(member)}
                    delay={0}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Add the keyframe animations inline */}
      <style jsx>{`
        @keyframes scroll-right-to-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--scroll-width));
          }
        }

        @keyframes scroll-left-to-right {
          0% {
            transform: translateX(var(--scroll-width));
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Pause animation on hover */
        .flex:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
