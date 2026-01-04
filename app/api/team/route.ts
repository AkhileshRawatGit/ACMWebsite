import { type NextRequest, NextResponse } from "next/server"
import { query, execute } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const team = await query("SELECT * FROM team_members ORDER BY id DESC")
    return NextResponse.json(team)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate role
    const allowedRoles = ['Chair', 'Vice Chair', 'Secretary', 'Treasurer', 'Web Master', 'Member']
    if (!allowedRoles.includes(data.role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be one of: Chair, Vice Chair, Secretary, Treasurer, Web Master, Member" },
        { status: 400 }
      )
    }

    const result = await execute(
      `INSERT INTO team_members (name, role, image, bio, email, social_links, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id`,
      [
        data.name,
        data.role,
        data.image,
        data.bio,
        data.email,
        JSON.stringify(data.socialLinks || {}),
      ]
    )

    return NextResponse.json({ id: result.rows[0].id, ...data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
