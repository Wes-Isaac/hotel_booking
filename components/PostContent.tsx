import Image from "next/image"
import { DocumentData } from "firebase/firestore"
import { AuthCheck } from "./AuthCheck"

 const PostContent = ({room}: {room: DocumentData}) => {
  return (
    <div>
      <h1>PostContent</h1>
      <Image src={room.image}
         width={100}
         height={100}/>
      <h2>price: {room.price}</h2>
      <AuthCheck>
        <button>Reserve</button>
      </AuthCheck>
    </div>
  )
}

export default PostContent