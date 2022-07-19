import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { userContext } from '../lib/context'
import { useUserData } from '../lib/hooks'



function MyApp({ Component, pageProps }: AppProps) {

  const userData = useUserData();

  return (
  <userContext.Provider value={ userData } >
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </userContext.Provider>
  )
}

export default MyApp
