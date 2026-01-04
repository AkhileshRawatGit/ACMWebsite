"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Members", href: "/team" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-50/80 via-blue-50/80 to-slate-50/80 backdrop-blur-2xl border-b border-slate-200/50 shadow-md transition-all duration-300">
      <div className="w-full mx-auto px-0 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover-scale -ml-6 sm:-ml-3 lg:-ml-2"
            aria-label="SRHU ACM Student Chapter"
          >
            <div className="relative h-16 w-48 md:w-64">
              <Image
                src="/assets/srhu_official.png"
                alt="SRHU ACM Student Chapter"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth relative group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/admin-login"
              className="px-4 py-2 text-sm font-semibold rounded-full bg-primary text-white shadow hover:bg-primary/90 transition-smooth"
            >
              Member Login
            </Link>
            <div className="relative h-16 w-16 ml-4">
              <Image
                src="/assets/acm-official-logo.png"
                alt="ACM Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-smooth"
          >
            {isOpen ? <X size={24} className="animate-rotate" /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in-up">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium hover:bg-slate-100 rounded-lg transition-smooth"
                style={{ animationDelay: `${idx * 30}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin-login"
              className="block text-center px-4 py-3 text-sm font-semibold rounded-full bg-primary text-white shadow hover:bg-primary/90 transition-smooth"
              onClick={() => setIsOpen(false)}
            >
              Member Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
