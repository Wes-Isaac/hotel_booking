import Link from "next/link"
import { FC, ReactElement, useContext } from "react"
import { UserContext } from "../lib/context"


export const AdminCheck:FC<{
  children:ReactElement
}> = (props) => {

  const { user }  = useContext(UserContext)
  return user ? props.children : <Link href="/enter">Sign in</Link>
  
}
