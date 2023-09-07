import styles from '../styles/mainPage.module.css'
import MovieList from '@/components/movie-list/movie-list-component'
import {useState, useEffect} from 'react'

export default function MainPage(){
  const [clientTime, setClientTime] = useState('');
  const [clientTime2, setClientTime2] = useState('');


  useEffect(() => {
    const now = new Date();
    const now2 = new Date();
    now.setDate(now.getDate() - 1);
    now2.setDate(now2.getDate() - 7);
    setClientTime(formatDate2(now));
    setClientTime2(formatDate2(now2));
  }, [])

  function formatDate2(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }


  return(
    <>
      <div className={styles.container}>
      {clientTime ? <MovieList isDaily={true} checkDate={clientTime} titleText='일일 박스오피스'/> : <div></div>}
      {clientTime2 ? <MovieList isDaily={false} checkDate={clientTime2} titleText='이주의 박스오피스'/> : <div></div>}
      </div>
    </>
  )
}