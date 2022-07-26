import Link from "next/link"
import { FC, ReactElement, useContext } from "react"
import { UserContext } from "../lib/context"


export const AdminCheck:FC<{
  children:ReactElement
}> = (props) => {

  const isAdmin  = useContext(UserContext)
  return isAdmin ? props.children : <Link href="/enter">Yess</Link>
  
}
