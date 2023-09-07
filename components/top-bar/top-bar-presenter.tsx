import styles from './top-bar.module.css'
import Title from './title/title-component'
import SearchBar from './searchbar/searchbar-component'
import Image from 'next/image'
import githubImg from '@/public/github.png'
import Link from 'next/link'

export default function TopBarPresenter(){

    return (
        <div className={styles.container}>
            <Title />
            <SearchBar />
            <div className={styles.linkIcon}>
                <Link href={'https://github.com/locke-123/SceneScope'}>
                    <Image width={40} height={40} src={githubImg} alt='githubImg'></Image>
                </Link>
            </div>
        </div>
    )
}