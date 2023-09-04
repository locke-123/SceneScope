import styles from '../../styles/mainPage.module.css'
import MovieList from '@/components/movie-list/movie-list-component'

export default function WeeklyPage(){
  return(
    <>
      <div className={styles.container}>
        <MovieList isDaily={false} checkDate='20230903' titleText='이번주의 박스오피스'/>
        {/* <MovieList isDaily={true} checkDate='20230903' />
        <MovieList isDaily={true} checkDate='20230903' />
        <MovieList isDaily={true} checkDate='20230903' />
        <MovieList isDaily={true} checkDate='20230903' />
        <MovieList isDaily={true} checkDate='20230903' /> */}
      </div>
    </>
  )
}