import Link from "next/link"
import { useRouter } from "next/router";
import {  useContext } from 'react'
import type { GetStaticProps, GetStaticPaths } from "next"
import { useDocumentData } from "react-firebase-hooks/firestore";
import { ParsedUrlQuery } from "querystring"
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query, deleteDoc } from "firebase/firestore"
import { db } from "../lib/config"
import { Heart } from '../components/Heart';
import { AuthCheck } from "../components/AuthCheck";
import { UserContext } from '../lib/context'
import { toast } from "react-toastify";
import PostContent from "../components/PostContent";
import { Reserve } from "../components/Reserve";
import { appendFileSync } from "fs";


interface Props  {
  post: string,
  path: string
}

interface Params extends ParsedUrlQuery {
  room: string
}


export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const {room}  = params!
  
  const docRef = doc(db,'rooms',room)
  const docSnap = await getDoc(docRef)
  const post = JSON.stringify({...docSnap.data(), roomId: docSnap.id})

  const path = docRef.path
  return {
    props: { post, path },
    revalidate: 40,
  }

}

export const getStaticPaths: GetStaticPaths = async () => {

  const q = query(collection(db, 'rooms'))
  const snapshot = await getDocs(q)

  const paths = snapshot.docs.map((doc) => {
    const {id} = doc
    return{
      params: {room: id}
    }
  })

  return {
    paths,
    fallback:"blocking"
  }
}


 const Room = ({ post, path }: {post: string, path:string}) => {

  const roomRef = doc(db, path)
  const [realTimeData] = useDocumentData(roomRef)
  const room = realTimeData || JSON.parse(post)
  const { admin } = useContext(UserContext)

  return (
    <div>
      <h1>Individual room</h1>
      <PostContent room={room} />
      <AuthCheck>
      <>
        <p>
            <strong>{room.heartCount || 0} 🤍</strong>
          </p>
        <Heart roomRef={roomRef} />
        <Reserve room={room} roomRef={roomRef} />
      </>
      </AuthCheck>

      {admin && (
        <>
          <Link href='/edit'>
            <button className="btn-blue">Edit Room</button>
          </Link>
          <DeletePostButton roomRef={roomRef}/>
        </>
      )}
    </div>
    
  )
}


function DeletePostButton({ roomRef }: {roomRef: DocumentReference<DocumentData>}) {
  const router = useRouter()

  const deletePost = async () => {
    const doIt = confirm('are you sure!')
    if (doIt) {
      await deleteDoc(roomRef)
      router.push('/admin')
      toast('Room annihilated ', { icon: '🗑️' })
    }
  }

  return (
    <button className="btn-red" onClick={deletePost}>
      Delete
    </button>
  )
}


export default Room
