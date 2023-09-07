import styles from './side-navigation.module.css'
import MainMenu from './main-menu/main-menu-component'
import Separator from './separator/separator-component'
import menu1 from '@/public/search.webp'
import Link from 'next/link'

const menuList1 = {
    title: "영화 목록",
    titleLink: "#",
    menu: ["menu1", "menu2", "menu3", "menu4", "menu5"],
    menuLink: ["#", "#", "#"]
}

export default function SideNavigationPresenter(){
    return (
        <div className={styles.container}>
            <Link className={styles.link} href="/">
                <MainMenu img={menu1} text="홈"/>
            </Link>
            <Link className={styles.link} href="/daily">
                <MainMenu img={menu1} text="일간 박스오피스"/>
            </Link>
            <Link className={styles.link} href="/weekly">
                <MainMenu img={menu1} text="주간 박스오피스"/>
            </Link>
            <Separator />
            <Link className={styles.link} href="/action">
                <MainMenu img={menu1} text="액션"/>
            </Link>
            <Link className={styles.link} href="/thriller">
                <MainMenu img={menu1} text="스릴러"/>
            </Link>
            <Link className={styles.link} href="/crime">
                <MainMenu img={menu1} text="범죄"/>
            </Link>
            <Link className={styles.link} href="/drama">
                <MainMenu img={menu1} text="드라마"/>
            </Link>
            <Link className={styles.link} href="/horror">
                <MainMenu img={menu1} text="공포"/>
            </Link>
            <Link className={styles.link} href="/sf">
                <MainMenu img={menu1} text="SF"/>
            </Link>
            <Separator />
        </div>
    )
}