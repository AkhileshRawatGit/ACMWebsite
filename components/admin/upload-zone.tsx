"use client"

import { useState, useCallback } from "react"
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react"

interface UploadZoneProps {
    type: "images" | "videos"
    onUploadComplete: (url: string) => void
    accept?: string
    maxSize?: number // in MB
}

export default function UploadZone({
    type,
    onUploadComplete,
    accept,
    maxSize = 50,
}: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const [progress, setProgress] = useState(0)

    const defaultAccept = type === "images"
        ? "image/jpeg,image/png,image/gif,image/webp"
        : "video/mp4,video/webm,video/ogg"

    const handleFile = async (file: File) => {
        // Validate file size
        const maxBytes = maxSize * 1024 * 1024
        if (file.size > maxBytes) {
            setUploadStatus("error")
            setErrorMessage(`File size exceeds ${maxSize}MB`)
            setTimeout(() => setUploadStatus("idle"), 3000)
            return
        }

        // Validate file type
        const acceptedTypes = (accept || defaultAccept).split(",")
        if (!acceptedTypes.some(t => file.type.includes(t.trim().replace("*", "")))) {
            setUploadStatus("error")
            setErrorMessage("Invalid file type")
            setTimeout(() => setUploadStatus("idle"), 3000)
            return
        }

        setIsUploading(true)
        setProgress(0)

        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("type", type)

            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90))
            }, 200)

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            clearInterval(progressInterval)
            setProgress(100)

            if (!response.ok) {
                throw new Error("Upload failed")
            }

            const data = await response.json()
            setUploadStatus("success")
            onUploadComplete(data.url)

            setTimeout(() => {
                setUploadStatus("idle")
                setProgress(0)
            }, 2000)
        } catch (error) {
            setUploadStatus("error")
            setErrorMessage("Upload failed. Please try again.")
            setTimeout(() => {
                setUploadStatus("idle")
                setProgress(0)
            }, 3000)
        } finally {
            setIsUploading(false)
        }
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }, [])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback(() => {
        setIsDragging(false)
    }, [])

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${isDragging
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : uploadStatus === "success"
                        ? "border-green-500 bg-green-50"
                        : uploadStatus === "error"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
                }`}
        >
            <input
                type="file"
                accept={accept || defaultAccept}
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFile(file)
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
            />

            {uploadStatus === "success" ? (
                <div className="animate-in fade-in zoom-in duration-300">
                    <CheckCircle size={48} className="mx-auto mb-3 text-green-500" />
                    <p className="font-semibold text-green-700">Upload successful!</p>
                </div>
            ) : uploadStatus === "error" ? (
                <div className="animate-in fade-in zoom-in duration-300">
                    <AlertCircle size={48} className="mx-auto mb-3 text-red-500" />
                    <p className="font-semibold text-red-700">{errorMessage}</p>
                </div>
            ) : isUploading ? (
                <div className="animate-in fade-in duration-300">
                    <div className="w-16 h-16 mx-auto mb-3 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="font-semibold mb-2">Uploading...</p>
                    <div className="w-full max-w-xs mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <Upload size={48} className="mx-auto mb-3 text-gray-400" />
                    <p className="font-semibold text-lg mb-1">
                        Drop your {type === "images" ? "image" : "video"} here
                    </p>
                    <p className="text-sm text-gray-600 mb-2">or click to browse</p>
                    <p className="text-xs text-gray-500">
                        {type === "images"
                            ? "PNG, JPG, GIF, WEBP"
                            : "MP4, WEBM, OGG"} up to {maxSize}MB
                    </p>
                </div>
            )}
        </div>
    )
}
