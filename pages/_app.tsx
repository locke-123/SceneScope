import '../styles/global.css'
import type { AppProps } from 'next/app'
import { initializeApp } from "firebase/app";
import TopBar from '../components/top-bar/top-bar-component'
import SideNavigation from '../components/side-navigation/side-navigation-component'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const fireBaseApp = initializeApp(firebaseConfig);

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