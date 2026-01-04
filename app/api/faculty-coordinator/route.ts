import { type NextRequest, NextResponse } from "next/server"
import { query, execute } from "@/lib/db"

// GET - Fetch the faculty coordinator (single record)
export async function GET(request: NextRequest) {
    try {
        const coordinator = await query("SELECT * FROM faculty_coordinators LIMIT 1")

        if (coordinator.length === 0) {
            return NextResponse.json({ error: "No faculty coordinator found" }, { status: 404 })
        }

        return NextResponse.json(coordinator[0])
    } catch (error) {
        console.error("Failed to fetch faculty coordinator:", error)
        return NextResponse.json({ error: "Failed to fetch faculty coordinator" }, { status: 500 })
    }
}

// POST - Create or update the faculty coordinator (only one allowed)
export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        // Check if a coordinator already exists
        const existing = await query("SELECT id FROM faculty_coordinators LIMIT 1")

        if (existing.length > 0) {
            // Update existing record
            await execute(
                `UPDATE faculty_coordinators 
         SET name = $1, title = $2, image = $3, bio = $4, email = $5, phone = $6, 
             linkedin_url = $7, twitter_url = $8, website_url = $9, department = $10, office_location = $11
         WHERE id = $12`,
                [
                    data.name,
                    data.title,
                    data.image || null,
                    data.bio || null,
                    data.email,
                    data.phone || null,
                    data.linkedinUrl || null,
                    data.twitterUrl || null,
                    data.websiteUrl || null,
                    data.department || null,
                    data.officeLocation || null,
                    existing[0].id,
                ]
            )

            return NextResponse.json({ id: existing[0].id, ...data }, { status: 200 })
        } else {
            // Insert new record
            const result = await execute(
                `INSERT INTO faculty_coordinators 
         (name, title, image, bio, email, phone, linkedin_url, twitter_url, website_url, department, office_location) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
                [
                    data.name,
                    data.title,
                    data.image || null,
                    data.bio || null,
                    data.email,
                    data.phone || null,
                    data.linkedinUrl || null,
                    data.twitterUrl || null,
                    data.websiteUrl || null,
                    data.department || null,
                    data.officeLocation || null,
                ]
            )

            return NextResponse.json({ id: result.rows[0].id, ...data }, { status: 201 })
        }
    } catch (error) {
        console.error("Failed to save faculty coordinator:", error)
        return NextResponse.json({ error: "Failed to save faculty coordinator" }, { status: 500 })
    }
}

// PUT - Update the faculty coordinator
export async function PUT(request: NextRequest) {
    try {
        const data = await request.json()

        const result = await execute(
            `UPDATE faculty_coordinators 
       SET name = $1, title = $2, image = $3, bio = $4, email = $5, phone = $6, 
           linkedin_url = $7, twitter_url = $8, website_url = $9, department = $10, office_location = $11`,
            [
                data.name,
                data.title,
                data.image || null,
                data.bio || null,
                data.email,
                data.phone || null,
                data.linkedinUrl || null,
                data.twitterUrl || null,
                data.websiteUrl || null,
                data.department || null,
                data.officeLocation || null,
            ]
        )

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Faculty coordinator not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to update faculty coordinator:", error)
        return NextResponse.json({ error: "Failed to update faculty coordinator" }, { status: 500 })
    }
}

// DELETE - Delete the faculty coordinator
export async function DELETE(request: NextRequest) {
    try {
        const result = await execute("DELETE FROM faculty_coordinators")

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Faculty coordinator not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to delete faculty coordinator:", error)
        return NextResponse.json({ error: "Failed to delete faculty coordinator" }, { status: 500 })
    }
}
