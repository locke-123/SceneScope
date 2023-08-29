import Image from 'next/image';
import styles from './movie-list.module.css'
import {useState, useEffect} from 'react'
import { movieDataType2 } from './movie-list-component';

import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore/lite';
import DailyBoxOfficeFetch from '@/core/daily-box-office-fetch';

export default function MovieListPresenter(props: movieDataType2){
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

    const onClickRightArrow = () => {
        if(movieIndex === 9 - (width/250) + 1) {
            setMovieIndex(0);
        } else {
            setMovieIndex(movieIndex + 1);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainText}>일간 박스오피스 {'>'}</div>
            <div className={styles.wrapper}>
                <div onClick={onClickLeftArrow} className={styles.arrowBtn}>{'<'}</div>
                <div className={styles.listContainer} style={{width: `${width}px`}}>
                    <div className={styles.listWrap} style={{ transform: `translateX(-${movieIndex * 250}px)` }}>
                        {props.movieData?.map((el, key) => (
                            <div className={styles.listElement} key={key}>
                                <Image height={300} width={200} src={el.img} alt='movieImg'/>
                                <div className={styles.elText}>
                                    {el.title}
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