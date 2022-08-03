import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserProvider, { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function MyApp({ Component, pageProps }: AppProps) {

  const userData = useUserData();

  return (
    <UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <div className='h-screen flex flex-col'>
        <Navbar />
        <div className='flex-1' >
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </UserProvider>
  )
}

export default MyApp
