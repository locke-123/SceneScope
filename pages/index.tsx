import styles from '../styles/mainPage.module.css'
import MovieList from '@/components/movie-list/movie-list-component'

export default function MainPage(){
  return(
    <>
      <div className={styles.container}>
          <MovieList />
          <MovieList />
      </div>
    </>
  )
}