import { type NextRequest, NextResponse } from "next/server"
import { queryOne, execute } from "@/lib/db"
import { unlink } from "fs/promises"
import { join } from "path"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const event = await queryOne("SELECT * FROM events WHERE id = $1", [id])

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()

    const result = await execute(
      `UPDATE events 
       SET title = $1, date = $2, time = $3, location = $4, category = $5, description = $6, image = $7, video = $8, results = $9, attendees = $10, updated_at = NOW()
       WHERE id = $11`,
      [
        data.title,
        data.date,
        data.time,
        data.location,
        data.category,
        data.description,
        data.image,
        data.video || null,
        data.results || null,
        data.attendees,
        id,
      ]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    // 1. Get media paths before deleting
    const event = await queryOne<{ image: string, video: string }>("SELECT image, video FROM events WHERE id = $1", [id])

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // 2. Delete media files
    const deleteFile = async (path: string | null) => {
      if (path && path.startsWith('/uploads')) {
        const filePath = join(process.cwd(), 'public', path)
        try {
          await unlink(filePath)
          console.log(`Deleted file: ${filePath}`)
        } catch (err) {
          console.error(`Failed to delete file: ${filePath}`, err)
        }
      }
    }

    await deleteFile(event.image)
    await deleteFile(event.video)

    // 3. Delete record
    const result = await execute("DELETE FROM events WHERE id = $1", [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
