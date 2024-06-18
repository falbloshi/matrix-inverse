interface NavbarProps {
  currentPage: string
}

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {

  const color: string = currentPage === "Home" ? "secondary" :
    currentPage === "Input" ? "accent" :
      currentPage === "Result" ? "primary" :
        ""

  return (
    <div className={`bg-${color} h-48 flex items-center justify-center`}>
      <h1 className="font-inter font-bold text-7xl text-white tracking-tighter ">
        {`${currentPage.toUpperCase()}`}
      </h1>
    </div>)
}
export default Navbar
