import { type NextRequest, NextResponse } from "next/server"
import { query, execute } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const resources = await query("SELECT * FROM resources ORDER BY created_at DESC")
    return NextResponse.json(resources)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await execute(
      `INSERT INTO resources (title, url, category, description, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING id`,
      [
        data.title,
        data.url,
        data.category,
        data.description,
      ]
    )

    return NextResponse.json({ id: result.rows[0].id, ...data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 })
  }
}
