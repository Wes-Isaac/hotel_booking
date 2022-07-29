import { doc, DocumentData, DocumentReference, increment, Timestamp, writeBatch } from "firebase/firestore"
import { toast } from "react-toastify";
import { useDocument } from 'react-firebase-hooks/firestore'
import { db,auth } from "../lib/config"
import { FormEvent, useState } from "react";
import {DateObject, Value}  from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css"


export const Reserve =  ({ room, roomRef }: { room:DocumentData, roomRef: DocumentReference }) => {
  // Timestamp.fromDate([])
  const [ date, setDate ] = useState<Value>([
    new DateObject(),
    new DateObject().add(1, "day")
  ])
  const [ dateArray, setDateArray ] = useState<string[]>([])
  
  const reserveRef = auth.currentUser && doc(db ,roomRef.path, 'reservation',auth.currentUser?.uid)
  const [reserveDoc] = useDocument(reserveRef)

  const reserve = async (e: FormEvent) => {
    e.preventDefault()
    setDateArray(JSON.stringify(date).replace(/[[\]]/g, '').split(','))
    const d = dateArray.map(num=>parseInt(num))
    console.log(d)
    const uid = auth.currentUser?.uid
    const batch = writeBatch(db)
    batch.update(roomRef, { reserved: true })
    batch.set(reserveRef!, {
      uid,
      price: room.price,
      title: room.title,
      startDate: Timestamp.fromMillis(d[0]),
      endDate: Timestamp.fromMillis(d[1]),
    })
    await batch.commit()
    toast.success(`reservation date ${date}`, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true, autoClose: 800 })
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
        render={<InputIcon />}
        value={date}
        onChange={setDate}
        range
        minDate={new DateObject()}
        maxDate={new DateObject().add(15, "days")} />
      <input type='submit' value='Reserve' />
    </form>
  );

}

