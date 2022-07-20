import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from './config'


export const useUserData = () => {
  const [user] = useAuthState(auth)
  const [admin, setAdmin ] = useState(false)

  useEffect(() => {
    let unsubscribe;
    if(user) {
      const ref = collection(db, 'users')
      unsubscribe = onSnapshot(ref, (snapshot) => {
        snapshot.docs.forEach(doc => {
          const {isAdmin} = doc.data()
          setAdmin(isAdmin)
        })

      })
    } else {
      setAdmin(false)
    }
    return unsubscribe
  }, [user])

  return { admin }

}
