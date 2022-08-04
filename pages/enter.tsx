import { User } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { UserContext } from '../lib/context'
import { auth, db, googleAuthProvider, signWithPopup } from '../lib/config'

const Enter = () => {
  const { user, admin } = useContext(UserContext);
  
  return (
    <div>
        { !user && <SignInButton /> }
    </div>
  )
}

const SignInButton = () => {
  const router = useRouter()
  const signInwithGoogle = async () => {
  
    await signWithPopup(auth, googleAuthProvider).then(res =>{ 
      writeToUser(res.user)
      toast.success('Sign in successful', { position: toast.POSITION.TOP_CENTER })
    }
    ).catch(err => {
      toast.error(`${err.message}`, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true, autoClose: 800 })
    })
    router.push('/')
  
  }

  return(
    <button className=' m-4 p-4 bg-white text-lg drop-shadow-md flex items-center' onClick={signInwithGoogle}><img className=" w-6 mx-1" src='/google.png'/> Sign in with Google</button>
  )

}


const writeToUser =async (user: User| null| undefined) => {
  if(user?.uid){
    const userDoc = doc(db, 'users', user?.uid)
    const docSnap = await getDoc(userDoc)
    if(!docSnap.exists()) {  
      setDoc(userDoc, {isAdmin: false, uid: user?.uid})
      .catch((error) => 
      toast.error(`${error.message}`, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true, autoClose: 800 }))
    } 
  }
}

export default Enter;
