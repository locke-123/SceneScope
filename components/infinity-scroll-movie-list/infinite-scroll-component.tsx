import styles from './infinity-scroll.module.css'
import InfiniteScroll from 'react-infinite-scroller'

export default function InfiniteScrollComponent(props: any){

    return (
        <InfiniteScroll
            loadMore={props.loadMore}
            hasMore={props.hasMore}
            loader={<div key={0}>Loading...</div>}
            className={styles.container}
        >
            {props.children}
        </InfiniteScroll>
    )
}