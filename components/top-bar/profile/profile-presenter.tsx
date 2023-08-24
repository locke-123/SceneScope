import styles from './profile.module.css'
import ProfileImg from '../../../public/profile.png'
import Image from 'next/image'

export default function ProfileComponent(){

    return (
        <div className={styles.container}>
            guest
            <div className={styles.imgContainer}>
                <Image src={ProfileImg} alt='profile' width={30} />
            </div>
        </div>
    )
}