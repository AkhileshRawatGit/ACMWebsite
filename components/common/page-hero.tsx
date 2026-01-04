interface PageHeroProps {
  title: string
  subtitle: string
}

export default function Hero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary via-blue-800 to-secondary overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">{title}</h1>
        <p className="text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {subtitle}
        </p>
      </div>
    </section>
  )
}
