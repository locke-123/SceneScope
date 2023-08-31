import styles from '../styles/mainPage.module.css'
import MovieList from '@/components/movie-list/movie-list-component'

export default function MainPage(){
  return(
    <>
      <div className={styles.container}>
          <MovieList checkDate='20200820' />
          <MovieList checkDate='20230815' />
      </div>
    </>
  )
}