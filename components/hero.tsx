import Title from "@/components/title"
import { PT_Sans } from "next/font/google"

const secondFont = PT_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
})

const Hero = () => {
  return (
    <div className="flex">
      <Title />
      <div className="p-24">
        <p
          className={`${secondFont.className} text-2xl text-justify leading-[24px]`}>
          Welcome to the Inverse Matrix. Here you can use the app to find the
          inverse of a square matrix.
        </p>
      </div>
    </div>
  )
}

export default Hero
