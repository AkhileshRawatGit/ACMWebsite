"use client"

import { useEffect, useState } from "react"
import { Calendar, Image, Users, FileText, TrendingUp, Video, Trophy, Activity } from "lucide-react"

interface Stats {
  totalEvents: number
  upcomingEvents: number
  totalMembers: number
  galleryItems: number
  recentActivity: {
    type: string
    title: string
    timestamp: string
  }[]
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    totalEvents: 0,
    upcomingEvents: 0,
    totalMembers: 0,
    galleryItems: 0,
    recentActivity: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch events
      const eventsRes = await fetch("/api/events")
      const events = eventsRes.ok ? await eventsRes.json() : []

      // Fetch gallery
      const galleryRes = await fetch("/api/gallery")
      const gallery = galleryRes.ok ? await galleryRes.json() : []

      // Fetch members
      const membersRes = await fetch("/api/members")
      const members = membersRes.ok ? await membersRes.json() : []

      const today = new Date()
      const upcomingEvents = events.filter((e: any) => new Date(e.date) >= today)

      setStats({
        totalEvents: events.length,
        upcomingEvents: upcomingEvents.length,
        totalMembers: members.length,
        galleryItems: gallery.length,
        recentActivity: [
          ...events.slice(0, 3).map((e: any) => ({
            type: "event",
            title: e.title,
            timestamp: e.created_at || e.date,
          })),
          ...gallery.slice(0, 2).map((g: any) => ({
            type: "gallery",
            title: g.title,
            timestamp: g.uploadedAt,
          })),
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5),
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Gallery Items",
      value: stats.galleryItems,
      icon: Image,
      gradient: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: Users,
      gradient: "from-pink-500 to-pink-600",
      bg: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105 animate-in fade-in zoom-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${card.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                  <card.icon className={`${card.iconColor}`} size={24} />
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                  {card.value}
                </div>
              </div>
              <h3 className="text-gray-600 font-semibold">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-primary to-purple-600 rounded-lg">
            <Activity className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
        </div>

        {stats.recentActivity.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className={`p-2 rounded-lg ${activity.type === "event"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-purple-100 text-purple-600"
                  }`}>
                  {activity.type === "event" ? (
                    <Calendar size={20} />
                  ) : (
                    <Image size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {activity.type === "event" ? "Event created" : "Media uploaded"}
                  </p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 transition-all hover:scale-105">
            <Calendar size={24} />
            <span className="font-semibold">New Event</span>
          </button>
          <button className="flex items-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 transition-all hover:scale-105">
            <Image size={24} />
            <span className="font-semibold">Upload Media</span>
          </button>
          <button className="flex items-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 transition-all hover:scale-105">
            <Users size={24} />
            <span className="font-semibold">Manage Members</span>
          </button>
          <button className="flex items-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 transition-all hover:scale-105">
            <Trophy size={24} />
            <span className="font-semibold">Add Results</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-amber-900 text-lg mb-2 flex items-center gap-2">
          <Video size={20} />
          💡 Pro Tips
        </h3>
        <ul className="space-y-2 text-amber-800">
          <li>• Upload videos up to 100MB for event highlights and promotions</li>
          <li>• Add event results after completion to keep your audience engaged</li>
          <li>• Use high-quality images (recommended: 1920x1080px) for better visual impact</li>
          <li>• Organize gallery items with consistent category names for easier management</li>
        </ul>
      </div>
    </div>
  )
}
