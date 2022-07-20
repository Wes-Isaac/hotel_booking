import Link from "next/link"
import { FC, ReactElement, useContext } from "react"
import { userContext } from "../lib/context"


export const AdminCheck:FC<{
  children:ReactElement
}> = (props) => {

  const isAdmin  = useContext(userContext)
  return isAdmin ? props.children : <Link href="/enter">Yess</Link>
  
}
