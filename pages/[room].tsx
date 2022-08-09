import Link from "next/link"
import { useRouter } from "next/router";
import {  useContext } from 'react'
import type { GetStaticProps, GetStaticPaths } from "next"
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { ParsedUrlQuery } from "querystring"
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query, deleteDoc, FieldValue } from "firebase/firestore"
import { db } from "../lib/config"
import { Heart } from '../components/Heart';
import { AuthCheck } from "../components/AuthCheck";
import { UserContext } from '../lib/context'
import { toast } from "react-toastify";
import PostContent from "../components/PostContent";
import { Reserve } from "../components/Reserve";
import Metatags from "../components/Metatags";


interface Props  {
  post: string,
  path: string,
  resPath: string,
}

interface Params extends ParsedUrlQuery {
  room: string
}


export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const {room}  = params!
  
  const docRef = doc(db,'rooms',room)
  const resRef = collection(db ,docRef.path, 'reservation')
  const allRes = await getDocs(resRef)
  const resPath = resRef.path
  // console.log(resPath)

  // allRes.forEach(ref => {
  //   const startDate:number = ref.data().startDate.toMillis()
  //   const endDate:number = ref.data().endDate.toMillis()
  //   console.log(ref.data().title)
  //   console.log(ref.data().uid)   
  // })


  const docSnap = await getDoc(docRef)
  const post = JSON.stringify({...docSnap.data(), roomId: docSnap.id})
 
  const path = docRef.path
  return {
    props: { post, path, resPath },
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
    fallback: false,
  }
}


 const Room = ({ post, path, resPath }: {post: string, path:string, resPath:string}) => {
  const colRef = collection(db, resPath)
  const [realTimeResData] = useCollectionData(collection(db, resPath))
  let reservedDate: number[][] = []
  realTimeResData?.forEach(res => {
    console.log(res.startDate.toDate().toDateString())
    reservedDate.push([res.startDate.toMillis(), res.endDate.toMillis()])
  })
  const roomRef = doc(db, path)
  const [realTimeData] = useDocumentData(roomRef)
  const room = realTimeData || JSON.parse(post)
  const { admin } = useContext(UserContext)

  return (
    <div className=" h-[80vh] w-[90%] mx-auto flex flex-col sm:w-[60vw] sm:flex-row sm:justify-center sm:items-center sm:gap-10">
      <PostContent room={room} />
      <Metatags title={room.title}/>
      <AuthCheck>
        <div className=" bg-slate-50 rounded-tr-2xl p-4 my-6 drop-shadow-lg">
          <div className="flex gap-1 text-lg sm:mt-2">
            <strong>{room.heartCount || 0}</strong>
            <Heart roomRef={roomRef} />
          </div>
          <Reserve room={room} roomRef={roomRef} reservedDate={reservedDate} />
          {admin && (<DeletePostButton roomRef={roomRef}/>)}
        </div>
      </AuthCheck>

    </div>
    
  )
}


function DeletePostButton({ roomRef }: {roomRef: DocumentReference<DocumentData>}) {
  const router = useRouter()

  const deletePost = async () => {
    const doIt = confirm('are you sure!')
    if (doIt) {
      await deleteDoc(roomRef)
      router.push('/')
      toast('Room annihilated ', { icon: '🗑️' })
    }
  }

  return (
    <button className="ml-4 p-1 px-2 text-md cursor-pointer bg-white font-semibold  rounded-tr-lg border-2 border-yellow-900 sm:ml-0 sm:mt-2 " onClick={deletePost}>
      Delete
    </button>
  )
}


export default Room
