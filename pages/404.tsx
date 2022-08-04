import Link from 'next/link';

 const Custom404 =() => {
  return (
    <main className='m-4'>
      <h1 className='my-4 text-lg font-semibold'>404 - That page does not seem to exist...</h1>
      <iframe
        className='mx-auto'
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="400"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <button className="m-2 p-1 text-lg cursor-pointer bg-white font-semibold border-2 border-black rounded-tr-lg">Go home</button>
      </Link>
    </main>
  );
}

export default Custom404
