import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from './config'

export const useUserData = () => {
const [user] = useAuthState(auth)
const [admin, setAdmin ] = useState(false)

  useEffect(() => {
    let unsubscribe;
    if(user) {
      const ref = doc(db, 'users', user.uid)
      unsubscribe = onSnapshot(ref, (doc) => {
        setAdmin(doc.data()?.isAdmin)
      })
    } else {
      setAdmin(false)
    }
    return unsubscribe
  }, [user])

  return { user, admin }

}