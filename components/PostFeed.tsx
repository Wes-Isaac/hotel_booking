import { RoomData } from "../pages"

// const postItem = ({post}) => {
// return(<div></div>)
// }


export const PostFeed = ({ posts }: {posts: RoomData[]}) => {
  // return posts ? posts.map((post) => <postItem post={post} /> ) : null
  return(
    <div>
      {posts && posts.map((post, index) => (
        <div key={Math.random()} id={post.id}>
          <h1>{post.title}</h1>
          <h4>{post.price}</h4>
        </div>)
      )}
    </div>
  )

}