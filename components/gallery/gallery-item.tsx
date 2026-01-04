"use client"

import { Eye } from "lucide-react"

interface GalleryItemProps {
  image: {
    id: number
    title: string
    category: string
    image: string
    type?: string
  }
  onClick: () => void
  delay: number
}

export default function GalleryItem({ image, onClick, delay }: GalleryItemProps) {
  return (
    <div
      className="relative h-64 rounded-lg overflow-hidden cursor-pointer group animate-fade-in-up"
      onClick={onClick}
      style={{ animationDelay: `${delay}s` }}
    >
      {image.type === 'video' || image.image.match(/\.(mp4|webm|ogg)$/) ? (
        <video
          src={image.image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          muted
        />
      ) : (
        <img
          src={image.image || "/placeholder.svg"}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      )}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="text-center">
          <Eye className="w-8 h-8 text-white mb-2 mx-auto" />
          <p className="text-white font-semibold">{image.title}</p>
        </div>
      </div>
    </div>
  )
}
