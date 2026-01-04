"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, X, Calendar, MapPin, Users, Trophy, Image as ImageIcon, Video } from "lucide-react"
import UploadZone from "../upload-zone"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
  image: string | null
  video: string | null
  results: string | null
  attendees: number
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "workshop",
    description: "",
    image: "",
    video: "",
    results: "",
    attendees: 0,
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingEvent ? `/api/events/${editingEvent.id}` : "/api/events"
      const method = editingEvent ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchEvents()
        resetForm()
      }
    } catch (error) {
      console.error("Failed to save event:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/events/${id}`, { method: "DELETE" })
      if (response.ok) {
        await fetchEvents()
      }
    } catch (error) {
      console.error("Failed to delete event:", error)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description,
      image: event.image || "",
      video: event.video || "",
      results: event.results || "",
      attendees: event.attendees,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "workshop",
      description: "",
      image: "",
      video: "",
      results: "",
      attendees: 0,
    })
    setEditingEvent(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Events Management
          </h1>
          <p className="text-gray-600 mt-1">Manage events, upload media, and track results</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          Create Event
        </button>
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-purple-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="talk">Talk</option>
                    <option value="competition">Competition</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="seminar">Seminar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Auditorium, Room 101"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Expected Attendees
                  </label>
                  <input
                    type="number"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  rows={4}
                  required
                />
              </div>

              {/* Media Uploads */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
                    <ImageIcon size={18} />
                    Event Image
                  </label>
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <UploadZone
                      type="images"
                      onUploadComplete={(url) => setFormData({ ...formData, image: url })}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
                    <Video size={18} />
                    Event Video (Optional)
                  </label>
                  {formData.video ? (
                    <div className="relative">
                      <video
                        src={formData.video}
                        className="w-full h-48 object-cover rounded-xl"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, video: "" })}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <UploadZone
                      type="videos"
                      maxSize={100}
                      onUploadComplete={(url) => setFormData({ ...formData, video: url })}
                    />
                  )}
                </div>
              </div>

              {/* Event Results */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
                  <Trophy size={18} />
                  Event Results (Optional)
                </label>
                <textarea
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Add event results, winners, or outcomes here..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">No events yet. Create your first event!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Media</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Results</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className={`border-b hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {event.image && (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin size={14} />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{event.date}</div>
                        <div className="text-gray-500">{event.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {event.image && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center gap-1">
                            <ImageIcon size={12} /> Image
                          </span>
                        )}
                        {event.video && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs flex items-center gap-1">
                            <Video size={12} /> Video
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {event.results ? (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                          <Trophy size={12} /> Added
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">No results</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                          title="Edit event"
                        >
                          <Edit2 size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                          title="Delete event"
                        >
                          <Trash2 size={18} className="text-red-600 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
