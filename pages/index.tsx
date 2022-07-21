import { onSnapshot, collection, query, orderBy, limit, FieldValue, getDocs,  } from 'firebase/firestore'
import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Loader from '../components/Loader'
import { db } from '../lib/config'
import styles from '../styles/Home.module.css'

interface RoomData {
  image: string;
  reserved: boolean;
  title: string;
  price: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  id:string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const colRef = collection(db, 'rooms')
  const q = query(colRef, orderBy('createdAt'), limit(4))
  let rooms:RoomData[] = []

  // const unsub =  onSnapshot(colRef, async(snapshot) => {
  //   const docs = await snapshot.docs;
  //   docs.forEach((doc) => {
  //     console.log(doc.id)
  //     console.log('heee')
  //    rooms.push({...doc.data(), id: doc.id} as RoomData)
  //   })
  // })

  const queryDocs = await getDocs(colRef)

  queryDocs.forEach((doc) => {
    rooms.push({...doc.data(), id: doc.id} as RoomData)
  })


  return {props: {  rooms: JSON.stringify(rooms) }}
}


const Home = ({ rooms }: {rooms: RoomData[]}) => {
  console.log()

  

  return(
  <div>
    {rooms.map((room) =>(
        <div>
          <h1>{room.title}</h1>
          <h2>{room.price}</h2>
      </div>)
    )}

    </div>
  )
}

export default Home
