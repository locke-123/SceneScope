import Image from 'next/image'
import styles from './arrow-menu.module.css'
import arrow from '@/public/arrow.png'
import type { ArrowMenuProps } from './arrow-menu-component'

export default function ArrowMenuPresenter(props: ArrowMenuProps){

    return (
        <div className={props.isEnable ? styles.container:styles.container2}>
            <div className={props.isEnable ? styles.textWrap:styles.textWrap2}>
                <div className={styles.text}>{props.text.title}</div>
                <div onClick={props.onClickArrow} className={props.isEnable ? styles.imgBox:styles.imgBox2}>
                    <Image src={arrow} width={16} alt='arrow'/>
                </div>
            </div>
            {props.text.menu.map((el, index) => (
                <div key={index} className={props.isEnable ? styles.subMenu:styles.subMenu2}>
                    {el}
                </div>
            ))}
        </div>
    )
}