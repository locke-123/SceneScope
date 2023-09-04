import styles from '../../styles/mainPage.module.css'
import MovieList from '@/components/movie-list/movie-list-component'

export default function DailyPage(){
  return(
    <>
      <div className={styles.container}>
        <MovieList isDaily={true} checkDate='20230903' titleText='오늘의 박스오피스'/>
        {/* <MovieList isDaily={true} checkDate='20230903' />
        <MovieList isDaily={true} checkDate='20230903' />
        <MovieList isDaily={true} checkDate='20230903' />
        <MovieList isDaily={true} checkDate='20230903' />
        <MovieList isDaily={true} checkDate='20230903' /> */}
      </div>
    </>
  )
}