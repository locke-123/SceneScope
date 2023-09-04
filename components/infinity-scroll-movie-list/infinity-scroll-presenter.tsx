import styles from './infinity-scroll.module.css'
import Image from 'next/image'
import img from '@/public/man-1139066_1280.jpg'
import InfiniteScrollComponent from './infinite-scroll-component'
import { useState } from 'react'
import ScrollFetch from '@/core/scroll-fetch'

export default function InfinityScrollPresenter(){
    const [items, setItems] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadMOreItems = async () => {
        console.log('load more item');
        const newItems = await ScrollFetch("액션",page);
        setItems([...items, ...newItems])
        setPage(page + 10);
    }

    return (
        <InfiniteScrollComponent loadMore={loadMOreItems} hasMore={hasMore}>
            {items.map((el: any, key: any) => (
                <div className={styles.listElement} key={key}>
                    <div className={styles.loading} style={el.imageUrl ? {opacity: 1} : {opacity: 0}}>
                        <Image priority height={330} width={230} src={el?.imageUrl ? el.imageUrl[0] : img} alt='movieImg'/>
                    </div>
                </div>
            ))}
        </InfiniteScrollComponent>
    )
}