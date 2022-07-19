import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { userContext } from '../lib/context'



function MyApp({ Component, pageProps }: AppProps) {
  return (
  <userContext.Provider value={{admin: true}} >
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </userContext.Provider>
  )
}

export default MyApp
