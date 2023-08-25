import '../styles/global.css'
import type { AppProps } from 'next/app'
import TopBar from '../components/top-bar/top-bar-component'
import SideNavigation from '../components/side-navigation/side-navigation-component'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopBar />
      <div className='container'>
        <SideNavigation />
        <Component {...pageProps} />
      </div>
    </>
  )
}