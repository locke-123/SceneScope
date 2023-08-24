import '../styles/global.css'
import type { AppProps } from 'next/app'
import TopBar from '../components/top-bar/top-bar-component'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopBar />
      <Component {...pageProps} />
    </>
  )
}