import { collectionGroup, where, DocumentData, getDocs, onSnapshot, query, Timestamp } from "firebase/firestore"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { db } from "../../lib/config"
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
  console.log(reservation);
  const {resid}  = router.query
  console.log(resid)
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

    return(
      <div>
      {reservation && reservation.map((res) => (
        <div key={Math.random()}>
          <a>
            <div className="ind-rm" >
              <h1>{res.title}</h1>
              <h4>{res.price}</h4>
              <h4>from: {res.startDate}</h4>
              <h4>to:{res.endDate}</h4>
            </div>
          </a>
        </div>
      )
      )}
      Reservations
    </div>
  )

}

export default Reservation

