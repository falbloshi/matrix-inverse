import Title from "./title"
import CallToActionButton from "./calltoactionbutton"

const Hero = () => {
  return (
    <div className="flex mt-16 gap-72 mx-64">
      <Title />
      <div className="px-12 mt-4 bg-neutral-100 py-8 rounded-xl drop-shadow-2xl  ">
        <p className={`font-pt-sans text-4xl text-justify leading-snug`}>
          Welcome to the Inverse Matrix. Here you can use the app to find the
          inverse of a square matrix.
        </p>
        <CallToActionButton />
      </div>
    </div>
  )
}

export default Hero
