import Image from 'next/image';
import styles from './movie-list.module.css'
import data1 from './test.json'
import movieImg from '@/public/man-1139066_1280.jpg'

export default function MovieListPresenter(){

    // fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&targetDt=20230820`).then(
    //     (response) => response.json()
    // ).then((data) => console.log(data));

    const data = data1;
    console.log(data1.boxOfficeResult.dailyBoxOfficeList)

    return (
        <div className={styles.container}>
            <div className={styles.mainText}>아아아아 {'>'}</div>
            <div className={styles.listWrap}>
                <div>{'<'}</div>
                {data1.boxOfficeResult.dailyBoxOfficeList.map((el, key) => (
                    <div className={styles.listElement} key={key}>
                        <Image width={200} src={movieImg} alt='movieImg'/>
                        <div className={styles.elText}>
                            {el.movieNm}
                        </div>
                    </div>
                ))}
                <div>{'>'}</div>
            </div>
        </div>
    )
}