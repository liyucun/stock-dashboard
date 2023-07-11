import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { GeistProvider, CssBaseline } from '@geist-ui/core'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} >
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </SessionProvider >
  )
}
