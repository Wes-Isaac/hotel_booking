import { async } from "@firebase/util"
import { doc, DocumentData, DocumentReference, getFirestore, increment, writeBatch } from "firebase/firestore"
import {useDocument} from 'react-firebase-hooks/firestore'
import { db,auth } from "../lib/config"

export const Heart =  ({roomRef}: {roomRef:DocumentReference<DocumentData>}) => {
  
  const heartRef = auth.currentUser && doc(db ,roomRef.path, 'hearts',auth.currentUser?.uid)

  const [heartDoc] = useDocument(heartRef)

  const addHeart =async () => {
    const uid = auth.currentUser?.uid
    const batch = writeBatch(db)
    batch.update(roomRef, {heartCount: increment(1)})
    batch.set(heartRef!,{uid})
    await batch.commit()
  }

  const removeHeart = async() => {
    const batch = writeBatch(db)
    batch.update(roomRef, {heartCount: increment(-1)})
    batch.delete(heartRef!)
    await batch.commit()

  }

  return heartDoc?.exists() ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );

}

