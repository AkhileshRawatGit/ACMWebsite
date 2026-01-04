"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 gradient-text">Send us a Message</h2>

      <div>
        <label className="block text-sm font-semibold mb-2">Your Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none transition-colors"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Subject *</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none transition-colors"
          placeholder="Message subject"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none transition-colors resize-none"
          placeholder="Your message here..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Send Message
      </button>
    </form>
  )
}
