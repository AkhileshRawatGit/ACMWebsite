"use client"

import { useState, useEffect } from "react"
import { Save, RefreshCw } from "lucide-react"

interface SiteSettings {
    hero: {
        title: string
        subtitle: string
        badge: string
    }
    stats: {
        events: number
        members: number
        projects: number
        workshops: number
    }
    mission: {
        title: string
        description: string
    }
    contact: {
        email: string
        phone: string
        address: string
    }
}

export default function SettingsManager() {
    const [settings, setSettings] = useState<SiteSettings>({
        hero: {
            title: "SRHU ACM Student Chapter",
            subtitle: "Swami Rama Himalayan University",
            badge: "Swami Rama Himalayan University",
        },
        stats: {
            events: 24,
            members: 150,
            projects: 12,
            workshops: 18,
        },
        mission: {
            title: "Empowering Future Tech Leaders",
            description:
                "We are dedicated to fostering innovation, collaboration, and excellence in computing. Our chapter provides students with opportunities to learn, grow, and connect with the global ACM community.",
        },
        contact: {
            email: "acm@srhu.edu.in",
            phone: "+91 135 247 1111",
            address: "Swami Rama Himalayan University, Jolly Grant, Dehradun, Uttarakhand 248016",
        },
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/settings")
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setSettings(data)
                }
            } else {
                setError("Failed to load settings from server")
            }
        } catch (err) {
            console.error("Failed to fetch settings:", err)
            setError("Failed to connect to server")
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setLoading(true)
        setError("")
        setSuccess(false)

        try {
            const response = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            })

            if (!response.ok) {
                throw new Error("Failed to save settings")
            }

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save settings")
        } finally {
            setLoading(false)
        }
    }

    const updateSetting = (section: keyof SiteSettings, field: string, value: string | number) => {
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">Website Settings</h1>
                <div className="flex gap-3">
                    <button
                        onClick={fetchSettings}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Reset
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    ✓ Settings saved successfully!
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    ✗ {error}
                </div>
            )}

            <div className="space-y-6">
                {/* Hero Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Badge Text</label>
                            <input
                                type="text"
                                value={settings.hero.badge || ""}
                                onChange={(e) => updateSetting("hero", "badge", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Main Title</label>
                            <input
                                type="text"
                                value={settings.hero.title || ""}
                                onChange={(e) => updateSetting("hero", "title", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Subtitle</label>
                            <input
                                type="text"
                                value={settings.hero.subtitle || ""}
                                onChange={(e) => updateSetting("hero", "subtitle", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Statistics</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Total Events</label>
                            <input
                                type="number"
                                value={settings.stats.events || 0}
                                onChange={(e) => updateSetting("stats", "events", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Total Members</label>
                            <input
                                type="number"
                                value={settings.stats.members || 0}
                                onChange={(e) => updateSetting("stats", "members", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Total Projects</label>
                            <input
                                type="number"
                                value={settings.stats.projects || 0}
                                onChange={(e) => updateSetting("stats", "projects", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Total Workshops</label>
                            <input
                                type="number"
                                value={settings.stats.workshops || 0}
                                onChange={(e) => updateSetting("stats", "workshops", parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Mission Statement</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Title</label>
                            <input
                                type="text"
                                value={settings.mission.title || ""}
                                onChange={(e) => updateSetting("mission", "title", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Description</label>
                            <textarea
                                value={settings.mission.description || ""}
                                onChange={(e) => updateSetting("mission", "description", e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                value={settings.contact.email || ""}
                                onChange={(e) => updateSetting("contact", "email", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Phone</label>
                            <input
                                type="tel"
                                value={settings.contact.phone || ""}
                                onChange={(e) => updateSetting("contact", "phone", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Address</label>
                            <textarea
                                value={settings.contact.address || ""}
                                onChange={(e) => updateSetting("contact", "address", e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
