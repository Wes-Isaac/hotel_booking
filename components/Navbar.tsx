import { signOut } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { AlignRight, X, Logout, Calendar, FilePlus, Bed, Login } from "tabler-icons-react"
import { auth } from "../lib/config"
import { UserContext } from "../lib/context"

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const{ user,admin } = useContext(UserContext)
  const router = useRouter()
  const logOut = () => {
    signOut(auth)
    router.push('/')
  }

  return(
    <>
   
    <nav className=" w-full px-4 top-0 z-30 bg-white fixed box-sizing flex border-b-2 justify-between items-center">
      <div className="w-full sm:hidden">
        <div className=" bg-white sm:w-1/2 flex justify-between">
          <Link href="/">
            <a className="logo text-3xl"><Bed color="#7f5345" size={48}/></a></Link>
          <AlignRight className="sm:hidden" size={48} color="#7f5345" onClick={() => setIsNavOpen((prev) => !prev)} />
        </div>
        <div className={isNavOpen ? "absolute z-10 inset-0 w-full h-screen bg-white transition-transform -translate-x-0 duration-300" : "inset-0 absolute bg-white transition-transform duration-200 translate-x-full"}>
        <ul className="flex h-full flex-col justify-center items-center" onClick={() => setIsNavOpen(false)} >  
          <X className="absolute top-1 right-2" color="#7f5345" size={48} onClick={() => setIsNavOpen(false)} />
          {user && (
            <>
            <li>
                <img className="rounded-full my-1" src={user?.photoURL || '/favicon.ico'} />
            </li>
            
            <li className="mb-4 mt-14">
              <Link href={`/reservation/${user.uid}`}><a className="flex items-center text-2xl text-stone-500 underline underline-offset-8 decoration-1"><Calendar className=" mt-1" />RESERVATION</a></Link>
            </li>
            {admin && (
              <li className="my-4">
                <Link href='/add'><a className="text-2xl flex items-center  text-stone-500 underline underline-offset-8 decoration-1"><FilePlus className="mt-1" />
                  ADD ROOM</a></Link>
              </li>
            )}
            <li className="my-4">
              <button className="text-2xl text-red-400 flex items-center underline underline-offset-4 decoration-1" onClick={logOut} ><Logout className="mt-1" />SIGN OUT</button>
            </li>
            
            </>
          )}

          {!user && (
            <li>
              <Link  href='./enter'><a className="text-3xl text-stone-500 flex items-center underline underline-offset-4 decoration-1"><Login className="mt-1" size={40} />Login</a></Link>
            </li>
          )}
        </ul>
        </div>
      </div>


      <div className="w-screen hidden sm:flex sm:justify-between sm:items-center">
        <div className="">
          <Link href="/">
            <a className="logo text-3xl"><Bed color="#7f5345" size={48}/></a></Link>
        </div>
        <ul className="flex justify-center items-center">
          {user && (
            <>
            {admin && (
              <li className=" mx-1">
                <Link href='./add'><a className=" text-sm flex items-center  text-stone-500 underline underline-offset-4 decoration-1"><FilePlus className="mt-1" />
                  ADD ROOM</a></Link>
              </li>
            )}
            <li className=" mx-1">
              <Link href={`/reservation/${user.uid}`}><a className="flex items-center text-sm text-stone-500 underline underline-offset-4 decoration-1"><Calendar className=" mt-1" />RESERVATION</a></Link>
            </li>
            <li className="mx-1">
             <button className="text-sm text-red-400 flex items-center underline underline-offset-4 decoration-1" onClick={logOut} ><Logout className="mt-1" />SIGN OUT</button>
            </li>
            <li className=" mx-1">
                <img className="rounded-full h-8 w-auto" src={user?.photoURL || '/favicon.ico'} />
            </li>
            
            </>
          )}

          {!user && (
            <li>
              <Link href='./enter'>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
    <div className="mb-16" />
    </>
  )
}

export default Navbar
