import { type NextRequest, NextResponse } from "next/server"
import { execute } from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()

    const result = await execute(
      `UPDATE resources 
       SET title = $1, url = $2, category = $3, description = $4
       WHERE id = $5`,
      [
        data.title,
        data.url,
        data.category,
        data.description,
        id,
      ]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const result = await execute("DELETE FROM resources WHERE id = $1", [id])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 })
  }
}
