import { User } from "firebase/auth";
import { createContext, ReactNode } from "react";
import { useUserData } from "./hooks";

export const UserContext = createContext<{
  admin:boolean,
  user:User|null|undefined
}>({admin:false, user:undefined})



function UserProvider({children}:{children:ReactNode}) {

  const user = useUserData()

  return <UserContext.Provider value={user} >
    {children}
  </UserContext.Provider>
}

export default UserProvider