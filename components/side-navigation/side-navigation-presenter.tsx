import styles from './side-navigation.module.css'
import MainMenu from './main-menu/main-menu-component'
import Separator from './separator/separator-component'
import ArrowMenu from './arrow-menu/arrow-menu-component'
import menu1 from '@/public/search.webp'

const menuList1 = {
    title: "영화 목록",
    titleLink: "#",
    menu: ["menu1", "menu2", "menu3", "menu4", "menu5"],
    menuLink: ["#", "#", "#"]
}

export default function SideNavigationPresenter(){
    return (
        <div className={styles.container}>
            <MainMenu img={menu1} text="영화 TOP100" link="#" />
            <MainMenu img={menu1} text="개봉 신작" link="#" />
            <MainMenu img={menu1} text="메인 메뉴" link="#" />
            <Separator />
            <ArrowMenu isEnable={true} text={menuList1} />
            <ArrowMenu isEnable={true} text={menuList1}/>
            <ArrowMenu isEnable={false} text={menuList1} />
            <Separator />
        </div>
    )
}