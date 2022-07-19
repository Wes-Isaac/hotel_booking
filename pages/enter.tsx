import { signOut } from 'firebase/auth'
import { auth, googleAuthProvider, signWithPopup } from '../lib/config'

const Enter = () => {
  return (
    <div>
      <SignInButton />
      <SignOutButton />
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
 