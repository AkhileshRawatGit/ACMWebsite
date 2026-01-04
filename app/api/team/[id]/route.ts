import { type NextRequest, NextResponse } from "next/server"
import { execute } from "@/lib/db"
import { unlink } from "fs/promises"
import path from "path"

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
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
      `UPDATE team_members 
       SET name = $1, role = $2, image = $3, bio = $4, email = $5, social_links = $6
       WHERE id = $7`,
      [
        data.name,
        data.role,
        data.image,
        data.bio,
        data.email,
        JSON.stringify(data.socialLinks || {}),
        params.id,
      ]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params

    // First, get the team member to find their image
    const memberResult = await execute("SELECT image FROM team_members WHERE id = $1", [params.id])

    if (memberResult.rowCount === 0) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    const member = memberResult.rows[0]

    // If they have an image, try to delete it
    if (member.image) {
      try {
        // Construct absolute path
        // member.image usually looks like "/uploads/images/filename.jpg"
        const relativePath = member.image.startsWith('/') ? member.image.slice(1) : member.image
        const absolutePath = path.join(process.cwd(), "public", relativePath)

        await unlink(absolutePath)
        console.log(`Deleted image file: ${absolutePath}`)
      } catch (err) {
        console.error("Failed to delete image file:", err)
        // Continue with database deletion even if file deletion fails
      }
    }

    // Now delete from database
    await execute("DELETE FROM team_members WHERE id = $1", [params.id])

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Delete error details:", error)
    return NextResponse.json(
      { error: "Failed to delete team member", details: error.message },
      { status: 500 }
    )
  }
}
