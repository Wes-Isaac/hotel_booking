import { collection, query, orderBy, limit, FieldValue, getDocs, startAfter,  Timestamp, where } from 'firebase/firestore'
import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Loader from '../components/Loader'
import { PostFeed } from '../components/PostFeed'
import { db, timestamp } from '../lib/config'
import styles from '../styles/Home.module.css'

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
  const q = query(colRef, orderBy("price"), limit(4))
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
    const q = query(colRef, orderBy("price"), startAfter(last?.price), limit(4))
    console.log(last)

    const newPosts =   (await getDocs(q)).docs.map((doc) => ({...doc.data(), id:doc.id}));

    setPosts(posts.concat(newPosts as RoomData[]))
    setLoading(false)

    if (newPosts.length < 1) {
      setPostsEnd(true)
    }


  }


  return (
    <main>
      <PostFeed posts={posts}  />
      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}

    </main>
  )
}

export default Home

