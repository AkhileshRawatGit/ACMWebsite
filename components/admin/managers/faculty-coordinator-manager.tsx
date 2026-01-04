"use client"

import { useState, useEffect } from "react"
import { Edit2, Loader2, User } from "lucide-react"
import FacultyCoordinatorForm from "../forms/faculty-coordinator-form"

interface FacultyCoordinator {
    id: number
    name: string
    title: string
    email: string
    phone?: string
    bio?: string
    image?: string
    linkedinUrl?: string
    twitterUrl?: string
    websiteUrl?: string
    department?: string
    officeLocation?: string
}

export default function FacultyCoordinatorManager() {
    const [coordinator, setCoordinator] = useState<FacultyCoordinator | null>(null)
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchCoordinator()
    }, [])

    const fetchCoordinator = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch("/api/faculty-coordinator")

            if (response.status === 404) {
                // No coordinator exists yet
                setCoordinator(null)
            } else if (!response.ok) {
                throw new Error("Failed to fetch faculty coordinator")
            } else {
                const data = await response.json()
                setCoordinator(data)
            }
        } catch (error) {
            console.error("Failed to fetch faculty coordinator:", error)
            setError("Failed to load faculty coordinator. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (data: any) => {
        try {
            const method = coordinator ? "PUT" : "POST"
            const response = await fetch("/api/faculty-coordinator", {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to save faculty coordinator")
            }

            // Refresh the data
            await fetchCoordinator()
            setShowForm(false)
        } catch (error) {
            console.error("Failed to save faculty coordinator:", error)
            alert("Failed to save faculty coordinator. Please try again.")
        }
    }

    const handleCloseForm = () => {
        setShowForm(false)
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
                <h1 className="text-3xl font-bold">Faculty Coordinator</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <Edit2 size={20} />
                    {coordinator ? "Edit Coordinator" : "Add Coordinator"}
                </button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold">
                                {coordinator ? "Edit Faculty Coordinator" : "Add Faculty Coordinator"}
                            </h2>
                            <button onClick={handleCloseForm} className="p-1 hover:bg-gray-100 rounded">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <FacultyCoordinatorForm
                            onSubmit={handleSubmit}
                            onClose={handleCloseForm}
                            initialData={coordinator}
                        />
                    </div>
                </div>
            )}

            {coordinator ? (
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">
                            {coordinator.image ? (
                                <img
                                    src={coordinator.image}
                                    alt={coordinator.name}
                                    className="w-48 h-48 rounded-full object-cover border-4 border-primary"
                                />
                            ) : (
                                <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center border-4 border-primary">
                                    <User size={80} className="text-gray-400" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-2">{coordinator.name}</h2>
                            <p className="text-xl text-primary font-semibold mb-4">{coordinator.title}</p>

                            {coordinator.department && (
                                <p className="text-gray-600 mb-2">
                                    <strong>Department:</strong> {coordinator.department}
                                </p>
                            )}

                            {coordinator.officeLocation && (
                                <p className="text-gray-600 mb-2">
                                    <strong>Office:</strong> {coordinator.officeLocation}
                                </p>
                            )}

                            {coordinator.bio && (
                                <p className="text-gray-700 mt-4 mb-4">{coordinator.bio}</p>
                            )}

                            <div className="space-y-2 mt-4">
                                <p className="text-gray-700">
                                    <strong>Email:</strong>{" "}
                                    <a href={`mailto:${coordinator.email}`} className="text-primary hover:underline">
                                        {coordinator.email}
                                    </a>
                                </p>

                                {coordinator.phone && (
                                    <p className="text-gray-700">
                                        <strong>Phone:</strong> {coordinator.phone}
                                    </p>
                                )}

                                {coordinator.linkedinUrl && (
                                    <p className="text-gray-700">
                                        <strong>LinkedIn:</strong>{" "}
                                        <a href={coordinator.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                            View Profile
                                        </a>
                                    </p>
                                )}

                                {coordinator.websiteUrl && (
                                    <p className="text-gray-700">
                                        <strong>Website:</strong>{" "}
                                        <a href={coordinator.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                            Visit Website
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow">
                    <User size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg text-gray-500 mb-2">No faculty coordinator assigned</p>
                    <p className="text-sm text-gray-400">Click "Add Coordinator" to set up a faculty coordinator</p>
                </div>
            )}
        </div>
    )
}
