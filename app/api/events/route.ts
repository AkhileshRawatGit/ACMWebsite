import { type NextRequest, NextResponse } from "next/server"
import { query, execute } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const events = await query("SELECT * FROM events ORDER BY date DESC")
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await execute(
      `INSERT INTO events (title, date, time, location, category, description, image, video, results, attendees, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) RETURNING id`,
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
        data.attendees || 0,
      ]
    )

    return NextResponse.json({ id: result.rows[0].id, ...data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
