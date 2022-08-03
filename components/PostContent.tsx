import Image from "next/image"
import { DocumentData } from "firebase/firestore"

 const PostContent = ({ room }: {room: DocumentData}) => {

 
  return (
    <div className=" flex flex-col">
      <div className="relative">
        <Image src={room.image}
          width={100}
          height={100}/>
      </div>
      <h2>Room: {room.title}</h2>
      <h2>price: {room.price}</h2>

    </div>
  )
}

export default PostContent