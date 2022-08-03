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
  const { user, admin } = useContext(UserContext)
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
      <div className="flex flex-col w-4/5  mx-auto">
        <h2 className="text-2xl font-medium underline underline-offset-8 decoration-1">Reservations</h2>
        {reservation && reservation.map((res) => (
          <div key={Math.random()} className="my-6 p-3 bg-white rounded-t-2xl" >
            <h1 className="my-1 text-lg font-medium">Room: {res.title}</h1>
            <h4 className="my-1 text-lg font-semibold">Price: {res.price}</h4>
            <h4 className="my-1">From: {res.startDate}</h4>
            <h4 className="my-1">To: {res.endDate}</h4>
            {admin && <h4 className="my-1">By: {res.uid}</h4>}
            {res.uid == user?.uid && <button className="my-2 p-1 text-lg cursor-pointer bg-white font-semibold border-2 border-yellow-900 rounded-md" onClick={() => cancelReservation(res.roomId)}>Cancel Reservation</button>}
          </div>
      )
      )}
    </div>
  )

}

export default Reservation

