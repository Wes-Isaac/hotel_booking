import { collectionGroup, doc, DocumentData, getDocs, onSnapshot, Timestamp } from "firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { db } from "../../lib/config"

const Reservation =  () => {
  const router =  useRouter()
  const [ reservation, setReservation ] = useState<DocumentData[]>()
  const { resid } = router.query
  const ref = collectionGroup(db, 'reservation')
  // if(resid){
  //   const resRef = doc(db, 'reservation', resid?.toString())
  //   const [realtime] = useDocumentData(resRef)
  //   console.log(realtime)
  // }
  // const reservation =  getDocs(ref).then((data) => {
  //   const res = data.docs.map((cul) => cul.data())
  //   // console.log(data)
  //   console.log(res)
  // })
  onSnapshot(ref,(snapshot) => {
    let res:DocumentData[] = []
    snapshot.docs.forEach((doc) => {
      res.push({...doc.data(), startDate: doc.data().startDate.toDate().toDateString(), endDate: doc.data().startDate.toDate().toDateString()})

    })
    console.log(res)
    // const resData = snapshot.docs.map((doc)=> doc.data())
    setReservation(res)
  })

  return(
    <div>
      {reservation && reservation.map((res) => (
        <div key={Math.random()}>
          <a>
            <div className="ind-rm" >
              <h1>{res.title}</h1>
              <h4>{res.price}</h4>
              <h4>from: {res.startDate.toDate().toString()}</h4>
              <h4>to:{res.price}</h4>
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
