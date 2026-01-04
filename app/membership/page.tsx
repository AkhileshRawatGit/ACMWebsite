import Hero from "@/components/common/page-hero"
import Benefits from "@/components/membership/benefits"
import JoinForm from "@/components/membership/join-form"

export default function MembershipPage() {
  return (
    <>
      <Hero title="Join ACM SRHU" subtitle="Become part of our amazing community" />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Benefits />
        <div className="my-20" />
        <JoinForm />
      </div>
    </>
  )
}
