import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"

interface EventCardProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    category: string
    description: string
    image: string
    attendees: number
    results?: string
  }
  delay: number
}

export default function EventCard({ event, delay }: EventCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden glass hover:shadow-2xl hover:shadow-primary/20 transition-smooth animate-fade-in-up hover-lift"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-72 md:shrink-0 h-56 md:h-80 relative overflow-hidden group border-r border-white/10 bg-gray-50 flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full h-full cursor-pointer p-2">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-smooth duration-500 rounded-md"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
              <DialogTitle className="sr-only">{event.title}</DialogTitle>
              <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold uppercase hover:bg-primary/30 transition-smooth">
                {event.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
                <Users size={14} />
                {event.attendees} attending
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{event.title}</h3>
            <p className="text-muted-foreground mb-4 whitespace-pre-wrap text-sm">{event.description}</p>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Calendar size={16} className="text-primary" />
                {format(new Date(event.date), "MMM d, yyyy")} at {event.time}
              </div>
              <div className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <MapPin size={16} className="text-primary" />
                {event.location}
              </div>
            </div>

            {event.results && (() => {
              let parsedResults = null
              try {
                parsedResults = JSON.parse(event.results)
              } catch (e) {
                // If parse fails, it's a legacy string
                parsedResults = event.results
              }

              if (Array.isArray(parsedResults)) {
                return (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                      🏆 Event Results
                    </h4>
                    <div className="space-y-3">
                      {parsedResults.map((result: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/50 p-2 rounded-lg">
                          {result.image ? (
                            <img
                              src={result.image}
                              alt={result.name}
                              className="w-10 h-10 rounded-full object-cover border border-yellow-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold border border-yellow-200">
                              {result.name?.[0]}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm text-yellow-900">{result.name}</p>
                            <p className="text-xs text-yellow-700 font-medium">{result.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-yellow-800 mb-1 flex items-center gap-2">
                    🏆 Event Results
                  </h4>
                  <p className="text-sm text-yellow-700">{parsedResults}</p>
                </div>
              )
            })()}
          </div>

          {event.results ? (
            <button className="mt-auto inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-smooth transform hover:scale-105 hover:shadow-lg group w-fit">
              View Details
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-smooth" />
            </button>
          ) : new Date(event.date) < new Date() ? (
            <button
              disabled
              className="mt-auto inline-flex items-center gap-2 px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed w-fit"
            >
              Ended
            </button>
          ) : (
            <button className="mt-auto inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-smooth transform hover:scale-105 hover:shadow-lg group w-fit">
              Register Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-smooth" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
