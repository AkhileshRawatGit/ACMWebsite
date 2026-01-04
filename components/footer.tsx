import { Facebook, Twitter, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Image
                src="/assets/acm-official-logo.png"
                alt="ACM SRHU Logo"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              SRHU
            </h3>
            <p className="text-sm text-gray-300">
              Association for Computing Machinery Student Chapter at Swami Rama Himalayan University.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-300 hover:text-white transition-colors">
                  Join Us
                </Link>
              </li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.acm.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  ACM Global
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Coding Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <p className="text-sm text-gray-300 mb-4">acm@srhu.edu.in</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 hover:bg-primary rounded-lg transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-primary rounded-lg transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-primary rounded-lg transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-primary rounded-lg transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} ACM SRHU Student Chapter. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
