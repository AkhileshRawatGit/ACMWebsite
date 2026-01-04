import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File
        const type = formData.get("type") as string || "images" // images or videos

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        // Validate file type
        const isImage = type === "images" && file.type.startsWith("image/")
        const isVideo = type === "videos" && file.type.startsWith("video/")

        if (!isImage && !isVideo) {
            return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), "public", "uploads", type)
        try {
            await mkdir(uploadsDir, { recursive: true })
        } catch (error) {
            // Directory already exists
        }

        // Generate unique filename
        const timestamp = Date.now()
        const fileName = `${timestamp}-${file.name.replace(/\s/g, "-")}`
        const filePath = path.join(uploadsDir, fileName)

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filePath, buffer)

        // Return the public URL
        const publicUrl = `/uploads/${type}/${fileName}`

        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName,
            fileSize: file.size,
            fileType: file.type,
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
