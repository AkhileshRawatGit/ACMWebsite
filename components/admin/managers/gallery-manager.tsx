"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, X, Image as ImageIcon, Video as VideoIcon, Filter } from "lucide-react"
import UploadZone from "../upload-zone"

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  type: "image" | "video"
  eventId?: number
  uploadedAt: string
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadType, setUploadType] = useState<"image" | "video">("image")
  const [filterCategory, setFilterCategory] = useState("all")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    url: "",
  })

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAutoSave = async (url: string) => {
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Gallery Upload",
          category: "General",
          image: url,
          type: uploadType,
        }),
      })

      if (response.ok) {
        await fetchGallery()
        resetForm()
      }
    } catch (error) {
      console.error("Failed to save gallery item:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" })
      if (response.ok) {
        await fetchGallery()
      }
    } catch (error) {
      console.error("Failed to delete item:", error)
    }
  }

  const resetForm = () => {
    setFormData({ title: "", category: "", url: "" })
    setShowUpload(false)
    setUploadType("image")
  }

  const filteredItems = filterCategory === "all"
    ? items
    : items.filter(item => item.category === filterCategory)

  const categories = ["all", ...new Set(items.map(item => item.category))]

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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
            Gallery Management
          </h1>
          <p className="text-gray-600 mt-1">Upload and organize images and videos</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          Upload Media
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-3">
        <Filter size={20} className="text-gray-600" />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">
          {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-primary to-pink-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold">Upload Media</h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Upload Type Toggle */}
              <div className="flex gap-3 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setUploadType("image")}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${uploadType === "image"
                    ? "bg-white shadow-md text-primary"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  <ImageIcon size={18} className="inline mr-2" />
                  Image
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType("video")}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${uploadType === "video"
                    ? "bg-white shadow-md text-primary"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  <VideoIcon size={18} className="inline mr-2" />
                  Video
                </button>
              </div>

              {/* Upload Zone - Direct Upload */}
              <UploadZone
                type={uploadType === "image" ? "images" : "videos"}
                maxSize={uploadType === "image" ? 10 : 100}
                onUploadComplete={handleAutoSave}
              />

              <div className="flex justify-end">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
          <ImageIcon size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">No media uploaded yet. Start building your gallery!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
            >
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                {item.type === "video" ? (
                  <video
                    src={item.image}
                    className="w-full h-full object-cover"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause()
                      e.currentTarget.currentTime = 0
                    }}
                    muted
                    loop
                  />
                ) : (
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-2 right-2">
                  {item.type === "video" ? (
                    <span className="px-2 py-1 bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <VideoIcon size={12} /> Video
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <ImageIcon size={12} /> Image
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-full">{item.category}</span>
                </p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
