"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react"
import TeamForm from "../forms/team-form"

type TeamRole = 'Chair' | 'Vice Chair' | 'Secretary' | 'Treasurer' | 'Web Master' | 'Member'

interface TeamMember {
  id: number
  name: string
  role: TeamRole
  email: string
  bio?: string
  image?: string
  socialLinks?: {
    linkedin?: string
    github?: string
  }
}

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/team")

      if (!response.ok) {
        throw new Error("Failed to fetch team members")
      }

      const data = await response.json()

      // Parse social_links JSON if it's a string
      const parsedData = data.map((member: any) => ({
        ...member,
        socialLinks: typeof member.social_links === 'string'
          ? JSON.parse(member.social_links || '{}')
          : member.social_links || {}
      }))

      setMembers(parsedData)
    } catch (error) {
      console.error("Failed to fetch team:", error)
      setError("Failed to load team members. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) {
      return
    }

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete team member")
      }

      // Remove from local state
      setMembers(members.filter((m) => m.id !== id))
    } catch (error) {
      console.error("Failed to delete team member:", error)
      alert("Failed to delete team member. Please try again.")
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      if (editingMember) {
        // Update existing member
        const response = await fetch(`/api/team/${editingMember.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error("Failed to update team member")
        }

        // Refresh the list
        await fetchTeam()
      } else {
        // Create new member
        const response = await fetch("/api/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error("Failed to create team member")
        }

        // Refresh the list
        await fetchTeam()
      }

      setShowForm(false)
      setEditingMember(null)
    } catch (error) {
      console.error("Failed to save team member:", error)
      alert("Failed to save team member. Please try again.")
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingMember(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Team Members</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <button onClick={handleCloseForm} className="p-1 hover:bg-gray-100 rounded">
                <X size={24} />
              </button>
            </div>
            <TeamForm
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
              initialData={editingMember}
            />
          </div>
        </div>
      )}

      {members.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No team members found.</p>
          <p className="text-sm mt-2">Click "Add Member" to create your first team member.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover mb-3"
                    />
                  )}
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold">{member.role}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 hover:bg-blue-100 rounded transition-colors"
                  >
                    <Edit2 size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{member.email}</p>
              {member.bio && (
                <p className="text-sm text-gray-500 line-clamp-2">{member.bio}</p>
              )}
              {(member.socialLinks?.linkedin || member.socialLinks?.github) && (
                <div className="mt-3 flex gap-2">
                  {member.socialLinks.linkedin && (
                    <span className="text-xs text-blue-600">LinkedIn</span>
                  )}
                  {member.socialLinks.github && (
                    <span className="text-xs text-gray-600">GitHub</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
