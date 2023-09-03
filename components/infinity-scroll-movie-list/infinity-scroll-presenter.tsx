import styles from './infinity-scroll.module.css'
import Image from 'next/image'
import img from '@/public/man-1139066_1280.jpg'

export default function InfinityScrollPresenter(){

    return (
        <div className={styles.container}>
            {Array.from({length: 10}).map((el, key) => (
                <div className={styles.listElement} key={key}>
                    <div>
                        <Image className={styles.img} priority height={330} width={230} src={img} alt='movieImg'/>
                    </div>
                </div>
            ))}
        </div>
    )
}