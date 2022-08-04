import Image from "next/image"
import { DocumentData } from "firebase/firestore"

 const PostContent = ({ room }: {room: DocumentData}) => {

 
  return (
    <div className=" h-[60%] flex flex-col mt-10
    bg-slate-50 rounded-tr-2xl p-6 drop-shadow-lg">
      <div className="relative mx-auto h-1/2 w-4/5 aspect-square sm:w-1/2 sm:h-full">
        <Image className="object-contain" src={room.image} layout='fill'/>
      </div>
      <h2 className=" pt-6 border-slate-700 text-2xl font-medium mt-6">Room: {room.title}</h2>
      <h2 className="text-2xl font-medium my-3">price: {room.price}</h2>

    </div>
  )
}

export default PostContent