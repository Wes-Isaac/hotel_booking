import { RoomData } from "../pages"


export const PostFeed = ({ posts }: {posts: RoomData[]}) => {
  return(
    <div>
      {posts && posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <h4>{post.price}</h4>
        </div>)
      )}
    </div>
  )

}