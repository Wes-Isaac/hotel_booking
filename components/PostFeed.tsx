import { RoomData } from "../pages"
import Link from "next/link"
import Image from "next/image"


export const PostFeed = ({ posts }: {posts: RoomData[]}) => {
  return(
    <div className=" grid grid-cols-1 w-4/5 mx-auto bg-transparent sm:grid-cols-2 sm:gap-12">
      {posts && posts.map((post) => (
        <Link href={`/${post.id}`} key={post.id}>
          <a className=" my-3 w-full">
            <div className="bg-white flex flex-col items-center w-full  rounded-t-2xl py-2 drop-shadow-2xl">
             <div className="relative w-40 h-40  sm:w-56 sm:h-56 mx-auto" >
                <Image src={post.image} layout='fill' className="sm:object-scale-down"/>
              </div>
              <h1 className=" text-2xl font-medium">{post.title}</h1>
              <h4 className=" text-2xl font-semibold"> Price:{post.price}</h4>
            </div>
          </a>
        </Link>
      )
      )}
    </div>
  )

}