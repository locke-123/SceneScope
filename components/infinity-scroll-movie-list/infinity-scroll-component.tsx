import { useState } from "react";
import InfinityScrollPresenter from "./infinity-scroll-presenter"
import ScrollFetch from "@/core/scroll-fetch";

interface infiniteProps {
    genre: string
}

export default function InfinityScrollComponent(props: infiniteProps){

    const [items, setItems] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadMOreItems = async () => {
        console.log('load more item');
        const newItems = await ScrollFetch(props.genre,page);
        setItems([...items, ...newItems])
        setPage(page + 10);
        if(page >= 100) {
            setHasMore(false);
        }
    }

    return (
        <InfinityScrollPresenter loadMOreItems={loadMOreItems} items={items} hasMore={hasMore} />
    )
}