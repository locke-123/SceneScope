import { useEffect, useState } from 'react';
import styles from '../../styles/mainPage.module.css'
import MovieList from '@/components/movie-list/movie-list-component'

export default function WeeklyPage(){

  const [clientTime, setClientTime] = useState('');
  const [clientTime2, setClientTime2] = useState('');

  useEffect(() => {
    const now = new Date();
    const now2 = new Date();
    now.setDate(now.getDate() - 7);
    now2.setDate(now2.getDate() - 30);
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
        {clientTime ? <MovieList isDaily={false} checkDate={clientTime} titleText='이번주 박스오피스'/> : <div></div>}
        {clientTime2 ? <MovieList isDaily={false} checkDate={clientTime2} titleText='저번달 박스오피스'/> : <div></div>}
      </div>
    </>
  )
}