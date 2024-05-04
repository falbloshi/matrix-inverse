import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import SizeInput from "@/components/sizeinput"

export default function Home() {
  return (
    <main className="mx-16">
      <Navbar />
      <Hero />
      <SizeInput />
    </main>
  )
}
