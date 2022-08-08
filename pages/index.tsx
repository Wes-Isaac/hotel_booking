import { collection, query, orderBy, limit, FieldValue, getDocs, startAfter,  Timestamp, where } from 'firebase/firestore'
import type { GetServerSideProps } from 'next'
import { useState } from 'react'
import Loader from '../components/Loader'
import Metatags from '../components/Metatags'
import { PostFeed } from '../components/PostFeed'
import { db, timestamp } from '../lib/config'

export interface RoomData {
  image: string;
  reserved: boolean;
  title: string;
  price: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const colRef = collection(db, 'rooms')
  const q = query(colRef,where("reserved","==",false), orderBy("price"), limit(4))
  let rooms: RoomData[] = []

  const queryDocs = await getDocs(q)

  queryDocs.forEach((doc) => {
    rooms.push({ ...doc.data(), id: doc.id } as RoomData)
  })


  return { props: { rooms: JSON.stringify(rooms) } }
}


const Home = ({ rooms }: { rooms: string }) => {
  
  const [posts, setPosts] = useState<RoomData[]>(JSON.parse(rooms))
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true)
    const last = posts[posts.length - 1]
    const cursor = last.createdAt
    const colRef = collection(db, 'rooms')
    const q = query(colRef,where("reserved","==",false), orderBy("price"), startAfter(last?.price), limit(4))

    const newPosts =  (await getDocs(q)).docs.map((doc) => ({...doc.data(), id:doc.id}));

    setPosts(posts.concat(newPosts as RoomData[]))
    setLoading(false)

    if (newPosts.length < 1) {
      setPostsEnd(true)
    }
  }

  return (
    <main >
      <Metatags title='Home Page'/>
      <PostFeed posts={posts}  />
      {!loading && !postsEnd &&
      <button className='m-4 p-2 text-lg cursor-pointer bg-white font-semibold border-2 border-yellow-900 rounded-md' onClick={getMorePosts}>
        Load more
      </button>}

      <Loader show={loading} />

      {postsEnd && <p className='text-lg font-medium my-3 flex justify-center'>You have reached the end!</p>}

    </main>
  )
}

export default Home

