import styles from './main-menu.module.css'
import Image, { StaticImageData } from 'next/image'

interface MenuProps {
    img: StaticImageData;
    text: string;
}

export default function MainMenuComponent(props: MenuProps){

    return (
        <div className={styles.container}>
            <Image src={props.img} alt={props.text}  width={30}/>
            <div className={styles.text}>{props.text}</div>
        </div>
    )
}