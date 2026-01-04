import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminAuth, getAuthToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const isValid = await verifyAdminAuth(email, password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create success response
    const response = NextResponse.json({ success: true, message: "Login successful" })

    // Set authentication cookie
    response.cookies.set("admin_auth", getAuthToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
