import { type NextRequest, NextResponse } from "next/server"
import { execute, queryOne } from "@/lib/db"
import { unlink } from "fs/promises"
import { join } from "path"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    // 1. Get the local file path from the DB
    const item = await queryOne<{ image: string }>("SELECT image FROM gallery WHERE id = $1", [id])

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // 2. Delete the file from the filesystem
    // item.image is like "/uploads/images/filename.jpg"
    if (item.image) {
      // Remove leading slash for safe joining
      const relativePath = item.image.startsWith('/') ? item.image.slice(1) : item.image
      // Only proceed if it is in the uploads folder for safety
      if (relativePath.startsWith('uploads')) {
        const filePath = join(process.cwd(), 'public', relativePath)
        try {
          await unlink(filePath)
          console.log(`Successfully deleted file: ${filePath}`)
        } catch (err: any) {
          // Ignore 'ENOENT' (file not found), log others
          if (err.code !== 'ENOENT') {
            console.error(`Failed to delete file: ${filePath}`, err)
          }
        }
      }
    }

    // 3. Delete the record from the DB
    const result = await execute("DELETE FROM gallery WHERE id = $1", [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}
