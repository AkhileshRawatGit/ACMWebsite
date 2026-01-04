"use client"

import { useState } from "react"
import AdminNav from "./admin-nav"
import EventsManager from "./managers/events-manager"
import TeamManager from "./managers/team-manager"
import GalleryManager from "./managers/gallery-manager"
import ResourcesManager from "./managers/resources-manager"
import MembersManager from "./managers/members-manager"
import SettingsManager from "./managers/settings-manager"
import FacultyCoordinatorManager from "./managers/faculty-coordinator-manager"
import DashboardOverview from "./dashboard-overview"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "events":
        return <EventsManager />
      case "team":
        return <TeamManager />
      case "faculty":
        return <FacultyCoordinatorManager />
      case "gallery":
        return <GalleryManager />
      case "members":
        return <MembersManager />
      case "resources":
        return <ResourcesManager />
      case "settings":
        return <SettingsManager />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 py-8">{renderContent()}</main>
    </div>
  )
}
