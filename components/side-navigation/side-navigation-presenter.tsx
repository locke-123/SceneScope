import styles from './side-navigation.module.css'
import MainMenu from './main-menu/main-menu-component'
import Separator from './separator/separator-component'
import ArrowMenu from './arrow-menu/arrow-menu-component'
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
            <Separator />
            <ArrowMenu isEnable={true} text={menuList1} />
            <ArrowMenu isEnable={true} text={menuList1}/>
            <ArrowMenu isEnable={false} text={menuList1} />
            <Separator />
        </div>
    )
}