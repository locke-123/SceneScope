
import InfinityScrollComponent from '@/components/infinity-scroll-movie-list/infinity-scroll-component'
import styles from '../../styles/mainPage.module.css'

export default function ActionPage(){
  return(
    <>
        <div className={styles.container}>
            <InfinityScrollComponent genre="SF" />
        </div>
    </>
  )
}