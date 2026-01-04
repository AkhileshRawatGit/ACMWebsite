import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from "lucide-react"

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 gradient-text">Get in Touch</h2>

      <div className="space-y-8 mb-12">
        <div className="flex gap-4">
          <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold mb-1">Email</h3>
            <a href="mailto:acm@srhu.edu.in" className="text-muted-foreground hover:text-primary transition-colors">
              acm@srhu.edu.in
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold mb-1">Phone</h3>
            <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
              +91 98765 43210
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold mb-1">Location</h3>
            <p className="text-muted-foreground">
              Swami Rama Himalayan University
              <br />
              Dehradun, Uttarakhand, India
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Follow Us</h3>
        <div className="flex gap-4">
          {[
            { icon: Facebook, label: "Facebook" },
            { icon: Twitter, label: "Twitter" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Github, label: "GitHub" },
          ].map((social, idx) => {
            const Icon = social.icon
            return (
              <a
                key={idx}
                href="#"
                className="p-3 bg-muted rounded-lg hover:bg-primary hover:text-white transition-colors"
                title={social.label}
              >
                <Icon size={20} />
              </a>
            )
          })}
        </div>
      </div>

      <div className="mt-12 p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="font-bold mb-2">Response Time</h3>
        <p className="text-muted-foreground text-sm">
          We typically respond to inquiries within 24-48 hours. For urgent matters, please call us directly.
        </p>
      </div>
    </div>
  )
}
