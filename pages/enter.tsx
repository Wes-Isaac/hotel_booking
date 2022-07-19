import { signOut } from 'firebase/auth'
import { auth, googleAuthProvider, signWithPopup } from '../lib/config'
import { useContext } from "react"
import { userContext } from "../lib/context"

const Enter = () => {
  const { admin } = useContext(userContext);

  return (
    <div>
      <SignInButton />
      <SignOutButton />
      <h1>{admin? "Admin" : "User"}</h1>
    </div>
  )
}

const SignInButton = () => {
  const signInwithGoogle =async () => {
    try{
      await signWithPopup(auth, googleAuthProvider)
    } catch(err) {
      console.log(err)
    }
  
  }

  return(
    <button onClick={signInwithGoogle}>Sign in with Google</button>
  )

}

const SignOutButton = () => {
  return(
    <button onClick={ () => {signOut(auth) 
      console.log('Signed out')} }>Sign out</button>
  )
  
}

export default Enter;
 