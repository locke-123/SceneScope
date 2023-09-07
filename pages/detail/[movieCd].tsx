import styles from '../../styles/detailPage.module.css'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import BasicInfoComponent from '@/components/detail/basic-info-component';


export default function DetailPage(){
    const router = useRouter();
    const movieCd = router.query.movieCd as string;
    const [kobisData, setKobisData] = useState<any>();
    const [kmdbData, setKmdbData] = useState<any>();
    const [youtubeData, setYoutubeData] = useState<any>();

    useEffect(() => {
        async function fetchData() {
            try {
                const kobisData = await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&movieCd=${movieCd}`)
                .then((response) => {return(response.json())});
                setKobisData(kobisData.movieInfoResult.movieInfo);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [router.asPath])

    useEffect(() => {
        async function fetchData2() {
            if(kobisData === undefined) return;
            try {
                const kmdbData = await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.NEXT_PUBLIC_KMDB_API_KEY}&title=${kobisData.movieNm}&use=극장용&releaseDts=${kobisData.openDt}`)
                .then((response) => {return(response.json())});
                setKmdbData(kmdbData.Data[0].Result[0]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        async function fetchData3() {
            if(kobisData === undefined) return;
            try {
                const youtubeData = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${kobisData.movieNm} 예고편&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
                .then((response) => {return(response.json())});
                setYoutubeData(youtubeData.items[0].id.videoId);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData2();
        fetchData3();
    }, [kobisData])

    return (
        <>
            <div className={styles.container}>
                <BasicInfoComponent youtubeData={youtubeData} kobisData={kobisData} kmdbData={kmdbData} />
            </div>
        </>
    )
}