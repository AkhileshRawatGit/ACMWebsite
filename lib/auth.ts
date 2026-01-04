const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ADMINACM@123"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "adminacm@gamil.com"
const AUTH_SECRET = process.env.AUTH_SECRET || "Akhil@987"

export async function verifyAdminAuth(email: string, password: string): Promise<boolean> {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
}

export function getAuthToken(): string {
  // Simple token for demonstration - in production use JWT or proper sessions
  return Buffer.from(`${ADMIN_EMAIL}:${AUTH_SECRET}`).toString('base64')
}

export function verifyToken(token: string): boolean {
  return token === getAuthToken()
}
