import Hero from "@/components/common/page-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"

export default function ContactPage() {
  return (
    <>
      <Hero title="Contact Us" subtitle="Get in touch with ACM SRHU" />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </>
  )
}
