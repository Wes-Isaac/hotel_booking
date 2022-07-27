import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import type { GetStaticProps, GetStaticPaths } from "next"
import { ParsedUrlQuery } from "querystring"
import { db } from "../lib/config"
import { Heart } from '../components/Heart';
import { AdminCheck } from "../components/AdminCheck";
import { useDocumentData } from "react-firebase-hooks/firestore";


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
  const post = JSON.stringify(docSnap.data())
  const path = docRef.path
  console.log(path);
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
  console.log(paths);

  return {
    paths,
    fallback:"blocking"
  }
}


 const Room = ({ post, path }: {post: string, path:string}) => {
  // console.log(JSON.parse(post))

  const roomRef = doc(db, path)
  const [realTimeData] = useDocumentData(roomRef)
  const room = realTimeData || JSON.parse(post)


  return (
    <div>
      <h1>Individual room</h1>
      <AdminCheck>
      <>
        <p>
            <strong>{room.heartCount || 0} 🤍</strong>
          </p>
        <Heart roomRef={roomRef} />
      </>
      </AdminCheck>
    </div>
    
  )
}


export default Room
