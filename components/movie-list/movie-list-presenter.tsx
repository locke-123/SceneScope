import Image from 'next/image';
import styles from './movie-list.module.css'
import {useState, useEffect} from 'react'
import movieImg from '@/public/man-1139066_1280.jpg'

export default function MovieListPresenter(props: any){
    const [width, setWidth] = useState(0);
    const [movieIndex, setMovieIndex] = useState(0);

    useEffect( () => {
        if(typeof window !== 'undefined') {
            const handleResize = () => {
                setWidth(((window.innerWidth - 470) - ((window.innerWidth - 470) % 250)));
            }
            handleResize();
            window.addEventListener('resize', handleResize);
        }
    }, [])

    const onClickLeftArrow = () => {
        if(movieIndex === 0) {
            setMovieIndex(9 - (width/250) + 1);
        } else {
            setMovieIndex(movieIndex - 1);
        }
    }

    const onClickRightArrow = async () => {
        if(movieIndex === 9 - (width/250) + 1) {
            setMovieIndex(0);
        } else {
            setMovieIndex(movieIndex + 1);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainText}>오늘의 박스오피스 {'>'}</div>
            <div className={styles.wrapper}>
                <div onClick={onClickLeftArrow} className={styles.arrowBtn}>{'<'}</div>
                <div className={styles.listContainer} style={{width: `${width}px`}}>
                    <div className={styles.listWrap} style={{ transform: `translateX(-${movieIndex * 250}px)` }}>
                        {Array.from({length: 10}).map((el, key) => (
                            <div className={styles.listElement} key={key}>
                                <div className={styles.loading} style={props?.movies[key].imageUrl ? {opacity: 1} : {opacity: 0}}>
                                    <Image height={330} width={230} src={props?.movies[key]?.imageUrl ? props.movies[key].imageUrl[0] : movieImg} alt='movieImg'/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div onClick={onClickRightArrow} className={styles.arrowBtn}>{'>'}</div>
            </div>
        </div>
    )
}