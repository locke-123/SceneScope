import Image from 'next/image';
import styles from './movie-list.module.css'
import data1 from './test2.json'
import movieImg from '@/public/man-1139066_1280.jpg'
import {useState, useEffect} from 'react'

export default function MovieListPresenter(){
    const [movies, setMovies] = useState<any>();
    

    // 일간 박스 오피스
    // fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&targetDt=20230820`).then(
    //     (response) => response.json()
    // ).then((data) => console.log(data));
    
    // 해외 영화 api - poster image 가져오기 위함
    // fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&t=Oppenheimer`).then(
    //     (response) => response.json()
    // ).then((data) => console.log(data)).catch(err => console.log(err));

    // 영화 상세 정보
    // fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&movieCd=${data1.boxOfficeResult.dailyBoxOfficeList[2].movieCd}`).then(
    //     (response) => response.json()
    // ).then((data5) => console.log(data5));

    async function dataFetching() {
        try {
            const dailyData = await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&targetDt=20230820`).then(
                    (response) => {return(response.json())}
                );
            //const dailyData = data1;
            //console.log(dailyData);
            const movieCode = dailyData.boxOfficeResult.dailyBoxOfficeList.map((el) => {return el.movieCd})
            //console.log(movieCode);
            const movieEnNmPromises = movieCode.map(async (el) => {
                const mEn = await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&movieCd=${el}`).then(
                    (response) => {return(response.json())}
                )
                return mEn.movieInfoResult.movieInfo.movieNmEn
            })
            const movieEnNm = await Promise.all(movieEnNmPromises)
            //console.log(movieEnNm)
            const movieImgPromises = movieEnNm.map(async (el) => {
                const mImgTmp = await fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&t=${el}`).then(
                    (response) => {return(response.json())}
                )
                return mImgTmp.Poster
            })
            const movieImg = await Promise.all(movieImgPromises)
            //console.log(movieImg);
            return {
                mainData: dailyData,
                movieImg: movieImg
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    useEffect( () => {
        async function fetchAndSetData() {
            try {
              const data = await dataFetching();
              setMovies(data);
              console.log(data);
            } catch (error) {
              console.error('Error:', error);
            }
        }
        // ///////////////////////////////    실제 fetch 하는 코드      //////////////////////////////

        // fetchAndSetData()
    }, [])

    // const movieData1 = movies?.movieImg.map((el) => {
    //     if(el === undefined) return {img: "N/A"}
    //     else return {img: el}
    // })
    // const movieData = movieData1?.map((el) => {
    //         if(el.img === "N/A") {
    //             el.img = movieImg
    //         }
    //         return el
    //     }
    // )
    // movies?.mainData.boxOfficeResult.dailyBoxOfficeList.map((el, index) => movieData[index].title = el.movieNm )

    // ///////////////////////////////////////////////////////////////////////////////

    const movieData = data1.map((el) => {
            if(el.img === "N/A") {
                el.img = movieImg
            }
            return el
        }
    )

    return (
        <div className={styles.container}>
            <div className={styles.mainText}>일간 박스오피스 {'>'}</div>
            <div className={styles.listWrap}>
                <div>{'<'}</div>
                {movieData?.map((el, key) => (
                    <div className={styles.listElement} key={key}>
                        <Image height={300} width={200} src={el.img} alt='movieImg'/>
                        <div className={styles.elText}>
                            {el.title}
                        </div>
                    </div>
                ))}
                <div>{'>'}</div>
            </div>
        </div>
    )
}