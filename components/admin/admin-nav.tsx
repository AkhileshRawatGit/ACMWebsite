"use client"

import { LogOut, LayoutDashboard, Calendar, Users, Image, FileText, Settings, UserCircle, GraduationCap } from "lucide-react"
import Link from "next/link"

interface AdminNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminNav({ activeTab, setActiveTab }: AdminNavProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar },
    { id: "team", label: "Team", icon: UserCircle },
    { id: "faculty", label: "Faculty", icon: GraduationCap },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "members", label: "Members", icon: Users },
    { id: "resources", label: "Resources", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-40 border-b-2 border-primary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-sm font-black shadow-lg">
              ACM
            </div>
            <div>
              <div className="text-sm text-gray-400">Admin Panel</div>
              <div className="text-xs text-primary font-semibold">Content Management</div>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden lg:flex gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-semibold ${activeTab === item.id
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105"
                  }`}
              >
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id} className="bg-gray-800">
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Logout Button */}
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" })
              window.location.href = "/admin-login"
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl transition-all duration-300 font-semibold hover:scale-105"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
