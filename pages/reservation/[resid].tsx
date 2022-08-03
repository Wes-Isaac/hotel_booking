import { collectionGroup, where, DocumentData, getDocs, onSnapshot, query, writeBatch, doc } from "firebase/firestore"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { auth, db } from "../../lib/config"
import { UserContext } from "../../lib/context"

export const getServerSideProps = async ({query:params}:GetServerSidePropsContext) => {
  const ref = collectionGroup(db, 'reservation')
  const q = query(ref, where('uid', '==', params.resid ))
  const queryDocs = await getDocs(q)

  const recomms:DocumentData[] = []
  queryDocs.forEach((doc) => {
    recomms.push({ ...doc.data(), startDate: doc.data().startDate.toDate().toDateString(), endDate: doc.data().endDate.toDate().toDateString() })
  })

  return { props: { recomms: JSON.stringify(recomms) } }
}



const Reservation =  ({recomms}: {recomms:string}) => {
  const { admin } = useContext(UserContext)
  const router =  useRouter()
  const [ reservation, setReservation ] = useState<DocumentData[]>(JSON.parse(recomms))
  const {resid}  = router.query
  const ref = collectionGroup(db, 'reservation')
  useEffect(()=> {
    const q = query(ref, where('uid', '==', resid ))
    const unsubscribe = onSnapshot(admin?ref:q,(snapshot) => {
      let res:DocumentData[] = []
      snapshot.forEach((doc) => {
        res.push({...doc.data(), startDate: doc.data().startDate.toDate().toDateString(), endDate: doc.data().endDate.toDate().toDateString()})
      })
      setReservation(res)
    })
    return unsubscribe
  },[])

  const cancelReservation = async (roomId : string) => {
    const roomRef = doc(db,'rooms', roomId)
    const batch = writeBatch(db)
    const reserveRef = auth.currentUser && doc(db, roomRef.path,'reservation',auth.currentUser?.uid)
    batch.update(roomRef, { reserved: false })
    batch.delete(reserveRef!)
    await batch.commit()
  }

    return(
      <div className="">
        <h2 className="text-2xl font-medium">Reservations</h2>
        {reservation && reservation.map((res) => (
          <div key={Math.random()}>
              <div className="ind-rm" >
                <h1>{res.title}</h1>
                <h4>{res.price}</h4>
                <h4>from: {res.startDate}</h4>
                <h4>to:{res.endDate}</h4>
                <button onClick={() => cancelReservation(res.roomId)}>Cancel Reservation</button>
              </div>
          </div>
      )
      )}
    </div>
  )

}

export default Reservation

