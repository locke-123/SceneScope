import styles from '../../styles/detailPage.module.css'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import test1 from './test1.json'
import test2 from './test2.json'
import BasicInfoComponent from '@/components/detail/basic-info-component';


export default function DetailPage(){
    const router = useRouter();
    const movieCd = router.query.movieCd as string;
    const [kobisData, setKobisData] = useState<any>();
    const [kmdbData, setKmdbData] = useState<any>();
    // const [youtubeData, setYoutubeData] = useState<any>();
    const youtubeData = 'oSqK_v6zPoM'
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const kobisData = await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&movieCd=${movieCd}`)
    //             .then((response) => {return(response.json())});
    //             setKobisData(kobisData.movieInfoResult.movieInfo);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     }
    //     fetchData();
    // }, [])

    // useEffect(() => {
    //     async function fetchData2() {
    //         if(kobisData === undefined) return;
    //         try {
    //             const kmdbData = await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.NEXT_PUBLIC_KMDB_API_KEY}&title=${kobisData.movieNm}&use=극장용&releaseDts=${kobisData.openDt}`)
    //             .then((response) => {return(response.json())});
    //             setKmdbData(kmdbData.Data[0].Result[0]);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     }
    //     fetchData2();
    // }, [kobisData])

    // useEffect(() => {
    //     async function fetchData3() {
    //         try {
    //             const youtubeData = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=%EC%98%A4%ED%8E%9C%ED%95%98%EC%9D%B4%EB%A8%B8%20%EC%98%88%EA%B3%A0%ED%8E%B8&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
    //             .then((response) => {return(response.json())});
    //             setYoutubeData(youtubeData.items[0].id.videoId);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     }
    //     fetchData3();
    // }, [])

    useEffect(() => {
        setKobisData(test1);
        setKmdbData(test2);
    }, [])
    
    console.log(kobisData);
    console.log(kmdbData);
    console.log(youtubeData);

    return (
        <>
            <div className={styles.container}>
                <BasicInfoComponent youtubeData={youtubeData} kobisData={kobisData} kmdbData={kmdbData} />
            </div>
        </>
    )
}