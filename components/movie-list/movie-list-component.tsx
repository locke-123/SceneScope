/* eslint-disable react-hooks/exhaustive-deps */
import DailyBoxOfficeFetch from "@/core/daily-box-office-fetch";
import MovieListPresenter from "./movie-list-presenter"
import {useState, useEffect} from 'react'
import PreviewFetch from "@/core/preview-fetch";
import WeeklyBoxOfficeFetch from "@/core/weekly-box-office-fetch";

interface movieListProps {
    isDaily: boolean
    checkDate: string
}

export default function MovieListComponent(props: movieListProps){
    const [movies, setMovies] = useState([{},{},{},{},{},{},{},{},{},{}]);
    const [dataIndex, setDataIndex] = useState(100);
    const [movieInfo, setMovieInfo] = useState<any>();

    useEffect(()=> {
        async function fetchAndSetData() {
            try {
                const movieInfo = props.isDaily ? await DailyBoxOfficeFetch(props.checkDate) : await WeeklyBoxOfficeFetch(props.checkDate);
                setMovieInfo(movieInfo);
                setDataIndex(0);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchAndSetData();
    }, [])

    useEffect(()=> {
        async function SetData() {
            try {
                const newArray = movies;
                newArray[dataIndex] = await PreviewFetch(movieInfo[dataIndex].title, movieInfo[dataIndex].openDt);
                setMovies(newArray);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if(dataIndex < 10) {
            SetData();
            setDataIndex(prev => prev + 1);
            console.log('ddd');
        }
    }, [dataIndex])

    return (
        <MovieListPresenter movies={movies} dataIndex={dataIndex} isDaily={props.isDaily}/>
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