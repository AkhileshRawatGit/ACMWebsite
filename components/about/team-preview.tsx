import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function TeamPreview() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold gradient-text">Meet Our Team</h2>
        <Link href="/team" className="flex items-center gap-2 text-primary hover:underline">
          View Full Team <ArrowRight size={18} />
        </Link>
      </div>
      <p className="text-muted-foreground mb-8">
        Our leadership team is dedicated to driving innovation and supporting student success.
      </p>
    </section>
  )
}
