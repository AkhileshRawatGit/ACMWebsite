"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, X, Loader2 } from "lucide-react"

interface TeamFormProps {
  onSubmit: (data: any) => void
  onClose: () => void
  initialData?: any
}

export default function TeamForm({ onSubmit, onClose, initialData }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    bio: "",
    image: "",
    socialLinks: {
      linkedin: "",
      github: "",
    },
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
        role: initialData.role || "",
        email: initialData.email || "",
        bio: initialData.bio || "",
        image: initialData.image || "",
        socialLinks: {
          linkedin: initialData.socialLinks?.linkedin || "",
          github: initialData.socialLinks?.github || "",
        },
      })

      // Set image preview if editing
      if (initialData.image) {
        setImagePreview(initialData.image)
      }
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Handle nested socialLinks
    if (name === "linkedin" || name === "github") {
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB")
      return
    }

    setImageFile(file)
    setUploadError("")

    // Create preview
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
      // If no new image file but there's an existing image URL, return it
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
      // Upload image if there's a new file
      let imageUrl = formData.image
      if (imageFile) {
        imageUrl = await uploadImage()
      }

      // Prepare data for submission
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
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
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
            <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full bg-gray-50">
              <Upload className="text-gray-400" size={32} />
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

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold mb-1">Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="Team member name"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-semibold mb-1">Role *</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="">Select Role</option>
          <option value="Chair">Chair</option>
          <option value="Vice Chair">Vice Chair</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
          <option value="Web Master">Web Master</option>
          <option value="Member">Member</option>
        </select>
      </div>

      {/* Email */}
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

      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
          placeholder="Brief bio about the team member"
        />
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Social Links (Optional)</h3>

        <div>
          <label className="block text-sm text-gray-600 mb-1">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={formData.socialLinks.linkedin}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">GitHub URL</label>
          <input
            type="url"
            name="github"
            value={formData.socialLinks.github}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="https://github.com/username"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 justify-end pt-4">
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
          {uploading ? "Uploading..." : initialData ? "Update Member" : "Add Member"}
        </button>
      </div>
    </form>
  )
}
