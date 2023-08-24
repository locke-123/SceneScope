import styles from './searchbar.module.css'
import Image from 'next/image'
import searchImg from '../../../public/search.webp'

export default function SearchBarPresenter(){

    return (
        <div className={styles.container}>
            <Image src={searchImg} width={30} alt='search' />
            <input className={styles.input} type='text' placeholder='영화 검색'/>
        </div>
    )
}