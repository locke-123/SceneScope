import MovieListPresenter from "./movie-list-presenter"
import {useState, useEffect} from 'react'

export default function MovieListComponent(){
    const [movies, setMovies] = useState<any>();

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
    }, [])

    return (
        <MovieListPresenter/>
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