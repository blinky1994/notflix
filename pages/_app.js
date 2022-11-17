import '../styles/globals.css'
import { magic } from '../lib/magic-client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '../components/loading/loading'

function MyApp({ Component, pageProps }) {

  //If logged in, route to '/'. Else, route to '/login'
  const [ isLoading, setIsLoading ] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const AutoLogin = async () => {;
      const isLoggedIn = await magic.user.isLoggedIn();
      
      if (isLoggedIn) {
        //Route to '/'
        router.push('/');
      } else {
        //Route to '/login'
        router.push('/login');
      }
    }
    AutoLogin();
  }, [])

  useEffect(()=> {
    const handleComplete = () => {
        setIsLoading(false);
    }
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return () => {
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
    }
  }, [router]);
  
  return isLoading? <Loading /> : <Component {...pageProps} />
}

export default MyApp
