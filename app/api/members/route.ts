import { type NextRequest, NextResponse } from "next/server"
import { query, execute } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const members = await query("SELECT * FROM members ORDER BY joined_at DESC")
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await execute(
      `INSERT INTO members (name, email, phone, roll_number, branch, semester, joined_at, status) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), 'active') RETURNING id`,
      [
        data.name,
        data.email,
        data.phone,
        data.rollNumber,
        data.branch,
        data.semester,
      ]
    )

    return NextResponse.json({ id: result.rows[0].id, ...data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to register member" }, { status: 500 })
  }
}
