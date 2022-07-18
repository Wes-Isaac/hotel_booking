import Link from "next/link"

const Navbar = () => {
  return(
    <nav>
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <Link href=''><a>Reservation</a></Link>
      <Link href=''><a>Contact Us</a></Link>
      
    </nav>
  )

}

export default Navbar