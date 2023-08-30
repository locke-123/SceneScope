import Image from 'next/image';
import styles from './movie-list.module.css'
import {useState, useEffect} from 'react'

export default function MovieListPresenter(props){
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

    // image와 text를 미리 불러오는 로딩 이미지와 텍스트 구현 후 component에서 가져온 movie 이미지를 사용해 갱신 후 리렌더

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