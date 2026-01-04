import { type NextRequest, NextResponse } from "next/server"
import { queryOne, execute } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    try {
        // Fetch the latest settings record.
        // We use ORDER BY updated_at DESC LIMIT 1 to ensure we get the most recent valid save,
        // even if there are duplicate rows.
        const settingsRecord = await queryOne<{ data: string }>(
            "SELECT data FROM settings WHERE type = 'site_settings' ORDER BY updated_at DESC, id DESC LIMIT 1"
        )

        let settings;
        const defaultSettings = {
            hero: {
                title: "SRHU ACM Student Chapter",
                subtitle: "Swami Rama Himalayan University",
                badge: "Swami Rama Himalayan University",
            },
            stats: {
                events: 0,
                members: 0,
                projects: 12,
                workshops: 0,
            },
            mission: {
                title: "Empowering Future Tech Leaders",
                description:
                    "We are dedicated to fostering innovation, collaboration, and excellence in computing. Our chapter provides students with opportunities to learn, grow, and connect with the global ACM community.",
            },
            contact: {
                email: "acm@srhu.edu.in",
                phone: "+91 135 247 1111",
                address: "Swami Rama Himalayan University, Jolly Grant, Dehradun, Uttarakhand 248016",
            },
        }

        try {
            if (settingsRecord && settingsRecord.data) {
                if (typeof settingsRecord.data === 'string') {
                    settings = JSON.parse(settingsRecord.data)
                } else {
                    settings = settingsRecord.data
                }
            } else {
                settings = defaultSettings
            }
        } catch (e) {
            console.error("Failed to parse settings JSON, using defaults:", e)
            settings = defaultSettings
        }

        return NextResponse.json(settings)
    } catch (error) {
        console.error("Settings API Error:", error)
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        // Robust Save Strategy:
        // 1. Delete all existing 'site_settings' to clean up potential duplicates
        // 2. Insert the new settings as a single fresh record
        // This avoids issues if the UNIQUE constraint is missing on the 'type' column

        await execute("DELETE FROM settings WHERE type = 'site_settings'")

        await execute(
            `INSERT INTO settings (type, data, updated_at) 
             VALUES ('site_settings', $1, NOW())`,
            [JSON.stringify(data)]
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Settings POST Error:", error)
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
    }
}
