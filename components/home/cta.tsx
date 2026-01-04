import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join Our Community?</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Become part of an amazing community of tech enthusiasts, innovators, and future leaders. Join ACM SRHU today!
        </p>
        <Link
          href="/membership"
          className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
        >
          Join ACM Now
        </Link>
      </div>
    </section>
  )
}
