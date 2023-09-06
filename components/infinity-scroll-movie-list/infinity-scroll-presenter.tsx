import styles from './infinity-scroll.module.css'
import Image from 'next/image'
import img from '@/public/man-1139066_1280.jpg'
import InfiniteScrollComponent from './infinite-scroll-component'
import Link from 'next/link'

export default function InfinityScrollPresenter(props: any){

    return (
        <InfiniteScrollComponent loadMore={props.loadMOreItems} hasMore={props.hasMore}>
            {props.items.map((el: any, key: any) => (
                <div className={styles.listElement} key={key}>
                    <Link href={el?.movieCd ? `/detail/${el.movieCd}` : `#`}>
                        <div className={styles.loading} style={el?.imageUrl ? {opacity: 1} : {opacity: 0}}>
                            <Image priority height={330} width={230} src={el?.imageUrl ? el.imageUrl[0] : img} alt='movieImg'/>
                        </div>
                    </Link>
                </div>
            ))}
        </InfiniteScrollComponent>
    )
}