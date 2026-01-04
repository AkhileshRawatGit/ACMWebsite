"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"

interface EventFormProps {
  onSubmit: (data: any) => void
  onClose: () => void
}

export default function EventForm({ onSubmit, onClose }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
    results: "",
  })

  const [members, setMembers] = useState<any[]>([])
  const [results, setResults] = useState<{ memberId: string; position: string; name: string; image: string }[]>([])

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/team")
      if (response.ok) {
        const data = await response.json()
        setMembers(data)
      }
    } catch (error) {
      console.error("Failed to fetch members:", error)
    }
  }

  const handleAddResult = () => {
    setResults([...results, { memberId: "", position: "", name: "", image: "" }])
  }

  const handleRemoveResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index))
  }

  const handleResultChange = (index: number, field: string, value: string) => {
    const newResults = [...results]

    if (field === "memberId") {
      const member = members.find(m => m.id.toString() === value)
      newResults[index] = {
        ...newResults[index],
        memberId: value,
        name: member?.name || "",
        image: member?.image || ""
      }
    } else {
      newResults[index] = { ...newResults[index], [field]: value }
    }

    setResults(newResults)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Serialize results if any
    const submitData = {
      ...formData,
      results: results.length > 0 ? JSON.stringify(results) : null
    }
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Event Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="e.g., Web Development Workshop"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Time *</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="e.g., Main Campus, Room 101"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Category *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="">Select Category</option>
          <option value="workshop">Workshop</option>
          <option value="talk">Talk</option>
          <option value="competition">Competition</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
          placeholder="Event description"
        />
      </div>

      {/* Results Section */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-semibold">Event Results (Optional)</label>
          <button
            type="button"
            onClick={handleAddResult}
            className="text-sm text-primary flex items-center gap-1 hover:underline"
          >
            <Plus size={16} /> Add Winner
          </button>
        </div>

        <div className="space-y-3">
          {results.map((result, index) => (
            <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <select
                  value={result.memberId}
                  onChange={(e) => handleResultChange(index, "memberId", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm mb-2"
                >
                  <option value="">Select Team Member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={result.position}
                  onChange={(e) => handleResultChange(index, "position", e.target.value)}
                  placeholder="Position (e.g. 1st Place, Speaker)"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveResult(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {results.length === 0 && (
            <p className="text-sm text-gray-500 italic">No results added yet.</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Create Event
        </button>
      </div>
    </form>
  )
}
