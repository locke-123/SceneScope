import styles from './searchbar.module.css'
import Image from 'next/image'
import searchImg from '../../../public/search.webp'
import { useState, useEffect } from 'react';
import SearchFetch from '@/core/search-fetch';
import img from '@/public/man-1139066_1280.jpg'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SearchBarPresenter(){

    const router = useRouter();
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState<any[]>([]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setResponse(await SearchFetch(userInput));
        }, 500);
      
        return () => clearTimeout(timer);
    }, [userInput]);


    const handleInputChange = (event: any) => {
        setUserInput(event.target.value);
    };

    const handleOnClickChange = (event: any) => {
        setUserInput('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Image src={searchImg} width={30} alt='search' />
                <input value={userInput} onChange={handleInputChange} className={styles.input} type='text' placeholder='영화 검색'/>
            </div>
            {response?.length > 0 && (
                <div className={styles.searchResults}>
                {response.map((el, index) => (
                    <Link onClick={handleOnClickChange} className={styles.link} key={index} href={`/detail/${el.movieCd}`}>
                        <div className={styles.searchResult}>
                            <Image width={139} height={200} src={el.img ? el.img : img} alt='img'></Image>
                            <div className={styles.resultText}>
                                <span className={styles.title}>{el.title}</span>
                                <span>{el.genre}</span>
                                <span>{el.rating}</span>
                                <span>{el.year}</span>
                                <span className={styles.plot}>{el.plot}</span>
                            </div>
                        </div>
                    </Link>
                ))}
                </div>
            )}
        </div>
    )
}