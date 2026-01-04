import { type NextRequest, NextResponse } from "next/server"
import { execute } from "@/lib/db"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const result = await execute("DELETE FROM members WHERE id = $1", [id])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 })
  }
}
