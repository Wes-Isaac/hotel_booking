import { signOut } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { auth } from "../lib/config"
import { UserContext } from "../lib/context"

const Navbar = () => {
  const{ user,admin } = useContext(UserContext)
  const router = useRouter()
  const logOut = () => {
    signOut(auth)
    router.push('/')
  }

  return(
    <nav>
      <div className="logo">
        <Link href="/"><a>LOGO</a></Link>
      </div>

      {user && (
        <>
         <li>
          <Link href=''><a>Reservation</a></Link>
         </li>
         <li>
          <button onClick={logOut} >Sign out</button>
         </li>
         <li>
          <Link href={`/${user.displayName}`}>
            <img src={user?.photoURL || './favicon.ico'} />
          </Link>
         </li>
         {admin && (
          <li>
            <Link href='./add'><a>Add Room</a></Link>
          </li>
         )}
        </>
      )}

       {!user && (
        <Link href='./enter'>Login</Link>
       )}

    </nav>
  )
}

export default Navbar
