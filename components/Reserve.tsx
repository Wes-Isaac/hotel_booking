import { async } from "@firebase/util"
import { doc, DocumentData, DocumentReference, increment, writeBatch } from "firebase/firestore"
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDocument } from 'react-firebase-hooks/firestore'
import { db,auth } from "../lib/config"
import { useState } from "react";

export const Reserve =  ({ room, roomRef }: { room:DocumentData, roomRef: DocumentReference }) => {
  const {register, handleSubmit, setValue, reset } = useForm()
  const [ startDate, setStartDate ] = useState<Date>()
  const isValid = startDate 
  
  const reserveRef = auth.currentUser && doc(db ,roomRef.path, 'reservation',auth.currentUser?.uid)

  const [reserveDoc] = useDocument(reserveRef)

  const reserve = async () => {
    console.log('happppppppy', roomRef.id)
    const uid = auth.currentUser?.uid
    const batch = writeBatch(db)
    batch.update(roomRef, { reserved: true })
    batch.set(reserveRef!, {
      uid,
      price: room.price,
      title: room.title,
    })
    await batch.commit()
    toast.success('Reservation successful', { position: toast.POSITION.TOP_CENTER, hideProgressBar: true, autoClose: 300 })
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
    <form >
      <input type='date' min={(new Date()).toDateString()} onChange={(e) => setStartDate(new Date(e.target.value))} />
      <input onClick={reserve}  type='submit' value='Reserve' />
    </form>
  );

}

