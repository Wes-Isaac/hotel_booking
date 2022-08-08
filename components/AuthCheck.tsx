import Link from "next/link"
import { FC, ReactElement, useContext } from "react"
import { UserContext } from "../lib/context"


export const AuthCheck:FC<{
  children:ReactElement
}> = (props) => {

  const { user }  = useContext(UserContext)
  return user ? props.children :
    <Link href="/enter"><a className=" text-center bg-white text-lg my-6 py-5 font-semibold rounded-tr-2xl sm:my-2 sm:flex sm:py-4 sm:w-20 sm:bg-transparent">Sign in</a></Link>
  
}
