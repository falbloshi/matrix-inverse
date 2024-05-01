import Title from "@/components/title"
import CallToActionButton from "@/components/calltoactionbutton"
import { PT_Sans } from "next/font/google"

const secondFont = PT_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
})

const Hero = () => {
  return (
    <div className="flex mt-16 gap-72 mx-64">
      <Title />
      <div className="px-12 mt-4 ">
        <p
          className={`${secondFont.className} text-4xl text-justify leading-snug`}>
          Welcome to the Inverse Matrix. Here you can use the app to find the
          inverse of a square matrix.
        </p>
        <CallToActionButton />
      </div>
    </div>
  )
}

export default Hero
