"use client"

import { useState, useEffect } from "react"
import GalleryItem from "./gallery-item"
import { X } from "lucide-react"

export default function GalleryGrid() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data = await response.json()
        setGalleryImages(data)
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (galleryImages.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No images found in the gallery. Use the admin panel to upload some!
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {galleryImages.map((img, idx) => (
          <GalleryItem key={img.id} image={img} onClick={() => setSelectedItem(img)} delay={idx * 0.05} />
        ))}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setSelectedItem(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
            {selectedItem.type === 'video' || selectedItem.image.match(/\.(mp4|webm|ogg)$/) ? (
              <video
                src={selectedItem.image}
                className="w-full rounded-lg"
                controls
                autoPlay
              />
            ) : (
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.title || "Gallery Item"}
                className="w-full rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
