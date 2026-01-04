import { type NextRequest, NextResponse } from "next/server"
import { query, execute } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const images = await query("SELECT * FROM gallery ORDER BY uploaded_at DESC")
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await execute(
      `INSERT INTO gallery (title, category, image, type, event_id, uploaded_at) 
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id`,
      [
        data.title || 'Untitled',
        data.category || 'General',
        data.image,
        data.type || 'image',
        data.eventId || null,
      ]
    )

    return NextResponse.json({ id: result.rows[0].id, ...data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
