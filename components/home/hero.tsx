"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const text1 = "SRHU ACM "
  const text2 = "Student Chapter"
  const totalLength = text1.length + text2.length

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const typingTimer = setInterval(() => {
      setCharIndex((prev) => {
        if (prev < totalLength) {
          return prev + 1
        }
        return prev
      })
    }, 100)

    const resetTimer = setInterval(() => {
      setCharIndex(0)
    }, 4000)

    return () => {
      clearInterval(typingTimer)
      clearInterval(resetTimer)
    }
  }, [totalLength, mounted])

  return (
    <section className="relative min-h-[560px] md:min-h-[640px] flex items-center bg-slate-50 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-campus.png"
          alt="Swami Rama Himalayan University campus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-4 lg:px-0 text-center py-20 md:py-24">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50/90 text-primary rounded-full text-base md:text-lg font-semibold shadow mb-6">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Swami Rama Himalayan University
          </div>

          <div className="inline-block px-10 py-4 rounded-full bg-slate-900/20 backdrop-blur-[1px] text-white shadow-lg mb-4 border border-white/25">
            <h1 className="relative text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              {!mounted ? (
                // Server-side render: Show full text to prevent hydration mismatch
                <>
                  {text1}
                  <span className="drop-shadow-sm">{text2}</span>
                </>
              ) : (
                // Client-side: Show typing animation
                <>
                  {/* Invisible layout reservation */}
                  <span className="opacity-0">
                    {text1}
                    <span className="drop-shadow-sm">{text2}</span>
                    |
                  </span>

                  {/* Visible typing animation */}
                  <span className="absolute inset-0">
                    {text1.slice(0, charIndex)}
                    <span className="drop-shadow-sm">
                      {text2.slice(0, Math.max(0, charIndex - text1.length))}
                    </span>
                    <span className="animate-pulse text-primary">|</span>
                  </span>
                </>
              )}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/events"
              className="px-8 py-3 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-smooth"
            >
              Explore Events
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-full border border-slate-300 text-slate-800 font-semibold bg-white hover:bg-slate-50 transition-smooth"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
