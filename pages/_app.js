import '../styles/globals.css'
import Nav from '../components/Nav'
import { StateContext } from '../lib/context'
import {Toaster} from 'react-hot-toast'

// Auth
import { UserProvider } from '@auth0/nextjs-auth0'

// URQL
import {Provider, createClient} from 'urql'

// We create a client and provide it to our app
const client = createClient({
  // When you use .env.local with next and you want
  // the browser to access it, it needs to start with
  // NEXT_PUBLIC_.....
  url: process.env.NEXT_PUBLIC_BACKEND_API
})
// Once provided we can make request wherever in our app


function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster/>
          <Nav/>
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  )
}

export default MyApp
