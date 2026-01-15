"use client"

export default function VideoSection() {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 glass">
                    <video
                        className="w-full h-full object-cover"
                        loop
                        playsInline
                        controls={true}
                    >
                        <source src="/video/lv_0_20260115231544.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Optional Overlay for better integration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Floating UI Elements or badging if needed */}
                    <div className="absolute top-6 left-6 right-6 flex items-start justify-between pointer-events-none">
                        <div className="text-white">
                            <h3 className="text-xl md:text-2xl font-bold mb-1">ACM SRHU in Action</h3>
                            <p className="text-sm text-white/80">Experience our community and events</p>
                        </div>
                        <div className="hidden md:block">
                            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">
                                Watch Our Journey
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
