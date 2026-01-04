"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, User } from "lucide-react"

export default function JoinForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    branch: "",
    semester: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.")
      }

      setSuccess(true)
      setFormData({ name: "", email: "", phone: "", rollNumber: "", branch: "", semester: "" })

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Join?</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Fill out the form below and we'll get in touch with you soon!
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">Quick Facts</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <User className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Student Membership</h4>
                <p className="text-muted-foreground text-sm">Open to all students of SRHU</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Easy Registration</h4>
                <p className="text-muted-foreground text-sm">Quick online form, no fees</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Instant Benefits</h4>
                <p className="text-muted-foreground text-sm">Start enjoying benefits immediately</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none transition-colors"
              placeholder="your.email@srhu.edu.in"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none transition-colors"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Roll Number *</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none transition-colors"
              placeholder="Your roll number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none transition-colors"
            >
              <option value="">Select your branch</option>
              <option value="cse">Computer Science & Engineering</option>
              <option value="ece">Electronics & Communication</option>
              <option value="me">Mechanical Engineering</option>
              <option value="ce">Civil Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none transition-colors"
            >
              <option value="">Select your semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          {success && (
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-semibold">✓ Registration Successful!</p>
              <p className="text-sm">Thank you for joining ACM SRHU. We'll contact you soon!</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-semibold">✗ Registration Failed</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Registering..." : "Join ACM SRHU"}
          </button>

          <p className="text-xs text-muted-foreground text-center">We'll contact you to confirm your membership.</p>
        </form>
      </div>
    </section>
  )
}
