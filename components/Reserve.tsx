import { doc, DocumentData, DocumentReference, increment, Timestamp, writeBatch } from "firebase/firestore"
import { toast } from "react-toastify";
import { useDocument } from 'react-firebase-hooks/firestore'
import { db,auth } from "../lib/config"
import { FormEvent, useState } from "react";
import {DateObject, Value} from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css"
import Router, { useRouter } from "next/router";


export const Reserve =  ({ room, roomRef }: { room:DocumentData, roomRef: DocumentReference }) => {
  const router =  useRouter()
  const [ date, setDate ] = useState<Value>([
    new DateObject(),
    new DateObject().add(1, "day")
  ])
  const [ dateArray, setDateArray ] = useState<string>(JSON.stringify(date))
  
  const reserveRef = auth.currentUser && doc(db ,roomRef.path, 'reservation',auth.currentUser?.uid)
  const [reserveDoc] = useDocument(reserveRef)

  const reserve = async (e: FormEvent) => {
    e.preventDefault()
    const [startDate, endDate] = dateArray!.replace(/[[\]]/g, '').split(',').map(num=>parseInt(num))
    const uid = auth.currentUser?.uid
    const batch = writeBatch(db)
    batch.update(roomRef, { reserved: true })
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
   
    router.push(`reservation/${uid}`)
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
        onChange={dateObj => {
          setDate
          setDateArray(JSON.stringify(dateObj))
        }}
        range
        minDate={new DateObject()}
        maxDate={new DateObject().add(15, "days")} />
      <input type='submit' value='Reserve' />
    </form>
  )
}

