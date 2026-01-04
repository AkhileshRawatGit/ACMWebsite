import Hero from "@/components/common/page-hero"
import GalleryGrid from "@/components/gallery/gallery-grid"

export default function GalleryPage() {
  return (
    <>
      <Hero title="Gallery" subtitle="Moments from our events and activities" />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <GalleryGrid />
      </div>
    </>
  )
}
