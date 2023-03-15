import { UserContextProvider } from '@/contexts/UserContext'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}
