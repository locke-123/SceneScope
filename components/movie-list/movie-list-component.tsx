import MovieListPresenter from "./movie-list-presenter"
import data1 from './test2.json'
import {useState, useEffect} from 'react'
import movieImg from '@/public/man-1139066_1280.jpg'
import { StaticImageData } from "next/image"

interface movieDataType {
    img: string | StaticImageData;
    title: string;
}

export interface movieDataType2 {
    movieData: {
        img: string | StaticImageData;
        title: string;
    }[]
}

export default function MovieListComponent(){

    const [movies, setMovies] = useState<any>();

    async function dataFetching() {
        try {
            const dailyData = await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&targetDt=20230820`).then(
                    (response) => {return(response.json())}
                );
            //const dailyData = data1;
            //console.log(dailyData);
            const movieCode = dailyData.boxOfficeResult.dailyBoxOfficeList.map((el: any) => {return el.movieCd})
            //console.log(movieCode);
            const movieEnNmPromises = movieCode.map(async (el: any) => {
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

    useEffect(()=> {
        async function fetchAndSetData() {
            try {
              const data = await dataFetching();
              setMovies(data);
              console.log(data);
            } catch (error) {
              console.error('Error:', error);
            }
        }

        // fetchAndSetData()
    }, [])

    // const movieData1 = movies?.movieImg.map((el: movieDataType) => {
    //     if(el === undefined) return {img: "N/A"}
    //     else return {img: el}
    // })
    // const movieData = movieData1?.map((el: movieDataType) => {
    //         if(el.img === "N/A") {
    //             el.img = movieImg
    //         }
    //         return el
    //     }
    // )
    // movies?.mainData.boxOfficeResult.dailyBoxOfficeList.map((el: any, index: any) => movieData[index].title = el.movieNm )

    // https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=서비스키&title=%EB%8B%AC%EC%A7%9D%EC%A7%80%EA%B7%BC%ED%95%B4:%207510
    // ///////////////////////////////////////////////////////////////////////////////

    const movieData  = data1.map((el: movieDataType) => {
            if(el.img === "N/A") {
                el.img = movieImg
            }
            return el
        }
    )

    return (
        <MovieListPresenter movieData={movieData} />
    )
}

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