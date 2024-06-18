interface NavbarProps {
  currentPage: string
}

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {

  const colorMap: { [key: string]: string } = {
    Home: 'bg-secondary',
    Input: 'bg-accent',
    Result: 'bg-primary',
  }

  const colorClass = colorMap[currentPage] || "bg-primary"

  return (
    <div className={`${colorClass} h-48 flex items-center justify-center`}>
      <h1 key={currentPage}
        className="opacity-0 animate-fadeIn font-inter font-bold text-7xl text-white tracking-tighter ">
        {`${currentPage.toUpperCase()}`}
      </h1>
    </div>)
}
export default Navbar
