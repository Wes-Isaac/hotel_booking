import { RoomData } from "../pages"
import Link from "next/link"


export const PostFeed = ({ posts }: {posts: RoomData[]}) => {
  return(
    <div>
      {posts && posts.map((post) => (
        <Link href={`/${post.id}`} key={post.id}>
          <a>
            <div className="ind-rm" >
              <h1>{post.title}</h1>
              <h4>{post.price}</h4>
            </div>
          </a>
        </Link>
      )
      )}
    </div>
  )

}