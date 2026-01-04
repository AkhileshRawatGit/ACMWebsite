"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, X, Loader2 } from "lucide-react"

interface FacultyCoordinatorFormProps {
    onSubmit: (data: any) => void
    onClose: () => void
    initialData?: any
}

export default function FacultyCoordinatorForm({ onSubmit, onClose, initialData }: FacultyCoordinatorFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        email: "",
        phone: "",
        bio: "",
        image: "",
        linkedinUrl: "",
        twitterUrl: "",
        websiteUrl: "",
        department: "",
        officeLocation: "",
    })

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string>("")

    // Populate form with initial data when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                title: initialData.title || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                bio: initialData.bio || "",
                image: initialData.image || "",
                linkedinUrl: initialData.linkedinUrl || initialData.linkedin_url || "",
                twitterUrl: initialData.twitterUrl || initialData.twitter_url || "",
                websiteUrl: initialData.websiteUrl || initialData.website_url || "",
                department: initialData.department || "",
                officeLocation: initialData.officeLocation || initialData.office_location || "",
            })

            if (initialData.image) {
                setImagePreview(initialData.image)
            }
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setUploadError("Please select a valid image file")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setUploadError("Image size should be less than 5MB")
            return
        }

        setImageFile(file)
        setUploadError("")

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        setImageFile(null)
        setImagePreview("")
        setFormData((prev) => ({ ...prev, image: "" }))
    }

    const uploadImage = async (): Promise<string> => {
        if (!imageFile) {
            return formData.image
        }

        const uploadFormData = new FormData()
        uploadFormData.append("file", imageFile)
        uploadFormData.append("type", "images")

        try {
            setUploading(true)
            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadFormData,
            })

            if (!response.ok) {
                throw new Error("Failed to upload image")
            }

            const data = await response.json()
            return data.url
        } catch (error) {
            console.error("Upload error:", error)
            throw new Error("Failed to upload image")
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setUploadError("")

        try {
            let imageUrl = formData.image
            if (imageFile) {
                imageUrl = await uploadImage()
            }

            const submitData = {
                ...formData,
                image: imageUrl,
            }

            onSubmit(submitData)
        } catch (error) {
            setUploadError("Failed to save. Please try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Image Upload */}
            <div>
                <label className="block text-sm font-semibold mb-2">Profile Image</label>
                <div className="space-y-3">
                    {imagePreview ? (
                        <div className="relative inline-block">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-40 h-40 rounded-full object-cover border-4 border-primary"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-40 h-40 border-4 border-dashed border-gray-300 rounded-full bg-gray-50">
                            <Upload className="text-gray-400" size={40} />
                        </div>
                    )}

                    <div>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="image-upload"
                            className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-sm"
                        >
                            {imagePreview ? "Change Image" : "Upload Image"}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPG, PNG, WebP</p>
                    </div>
                </div>
                {uploadError && (
                    <p className="text-sm text-red-600 mt-2">{uploadError}</p>
                )}
            </div>

            {/* Name and Title */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Dr. John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Faculty Coordinator"
                    />
                </div>
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="email@srhu.edu.in"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="+91 98765 43210"
                    />
                </div>
            </div>

            {/* Department and Office Location */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Department</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Computer Science"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Office Location</label>
                    <input
                        type="text"
                        name="officeLocation"
                        value={formData.officeLocation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Room 301, Block A"
                    />
                </div>
            </div>

            {/* Bio */}
            <div>
                <label className="block text-sm font-semibold mb-1">Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                    placeholder="Brief bio about the faculty coordinator..."
                />
            </div>

            {/* Social Links */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold">Social & Professional Links</h3>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">LinkedIn URL</label>
                    <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="https://linkedin.com/in/username"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Twitter/X URL</label>
                    <input
                        type="url"
                        name="twitterUrl"
                        value={formData.twitterUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="https://twitter.com/username"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Personal Website</label>
                    <input
                        type="url"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        placeholder="https://example.com"
                    />
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={uploading}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {uploading && <Loader2 size={16} className="animate-spin" />}
                    {uploading ? "Uploading..." : initialData ? "Update Coordinator" : "Save Coordinator"}
                </button>
            </div>
        </form>
    )
}
