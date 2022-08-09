import { collection, doc, onSnapshot, getDocs, CollectionReference, DocumentData } from 'firebase/firestore'
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
      // const ref = collection(db, 'users')

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

// export const useCheckReserve = async(allReservation:CollectionReference<DocumentData> | null, selected:number): Promise<boolean> => {
//   console.log('triggered');
//   let isReserved = false
//   const allDates: {startDate:number,endDate:number}[] =[]
//   const allRes = await getDocs(allReservation!)

//     allRes.forEach(ref => {
//       const startDate:number = ref.data().startDate.toMillis()
//       const endDate:number = ref.data().endDate.toMillis()
//       allDates.push({startDate, endDate})

//       allDates.forEach(value => {

//         if(selected > value.startDate && selected < value.endDate) {
//           isReserved = true
//         } 
//       })
//     })


//   return isReserved

// }

export const useCheckReserve = async(reservedDate: string[], selected:number): Promise<boolean> => {
  console.log('triggered');
  let isReserved = false


   


  return isReserved

}
