import { doc, DocumentData, DocumentReference, collection, Timestamp, writeBatch, FieldValue } from "firebase/firestore"
import { toast } from "react-toastify";
import { useDocument } from 'react-firebase-hooks/firestore'
import { db,auth } from "../lib/config"
import { FormEvent, useState } from "react";
import {DateObject, Value} from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css"
import { useRouter } from "next/router";


export const Reserve =  ({ room, roomRef, reservedDate }: { room:DocumentData, roomRef: DocumentReference, reservedDate: number[][] }) => {
  const router =  useRouter()
  const [ date, setDate ] = useState<Value>([
    new DateObject(),
    new DateObject().add(1, "day")
  ])

  const reserveRef = auth.currentUser && doc(db ,roomRef.path, 'reservation',auth.currentUser?.uid)
  const [reserveDoc] = useDocument(reserveRef)

  const reserve = async (e: FormEvent) => {
    e.preventDefault()
    const allReservation = collection(db ,roomRef.path, 'reservation')
    const [startDate, endDate] = JSON.stringify(date).replace(/[[\]]/g, '').split(',').map(num=>parseInt(num))
    let isReserved = false
    reservedDate.forEach((res) => {
      if(startDate > res[0] && startDate < res[1]) {
          isReserved = true
      } 
    })
  

    if(!isReserved){ 
      const uid = auth.currentUser?.uid
      const batch = writeBatch(db)
      batch.set(reserveRef!, {
        uid,
        price: room.price,
        title: room.title,
        startDate: Timestamp.fromMillis(startDate),
        endDate: Timestamp.fromMillis(endDate),
        roomId: roomRef.id,
      })
      await batch.commit()
      toast.success(`reservation date ${date}`, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true, autoClose: 800 })
    
      // router.push(`reservation/${uid}`)
    } else {
      toast.error('PLEASE PICK ANOTHER DATE', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true, autoClose: 800 })
    }

  }

  const cancelReservation = async () => {
    const batch = writeBatch(db)
    batch.update(roomRef, { reserved: false })
    batch.delete(reserveRef!)
    await batch.commit()
  }

  return reserveDoc?.exists() ? (
    <button onClick={cancelReservation}>Cancel Reservation</button>
  ) : (
    <form onSubmit={reserve}>
      <DatePicker
        className="teal"
        required
        render={<InputIcon />}
        value={date}
        onChange={setDate}
        range
        minDate={new DateObject()}
        maxDate={new DateObject().add(15, "days")}
        />
      <input className="ml-4 p-1 text-md cursor-pointer bg-white font-semibold  rounded-tr-lg border-2 border-yellow-900 sm:ml-0 sm:mt-2 " type='submit' value='Reserve' />
    </form>
  )
}

