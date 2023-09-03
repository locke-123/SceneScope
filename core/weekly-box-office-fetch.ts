import { fireBaseApp } from '@/pages/_app';
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore/lite';

interface weeklyBoxOfficeListElementType {
    audiAcc: string,
    audiChange: string,
    audiCnt: string,
    audiInten: string,
    movieCd: string,
    movieNm: string,
    openDt: string,
    rank: string,
    rankInten: string,
    rankOldAndNew: string,
    rnum: string,
    salesAcc: string,
    salesAmt: string,
    salesChange: string,
    salesInten: string,
    salesShare: string,
    scrnCnt: string,
    showCnt: string
}

const db = getFirestore(fireBaseApp);
const col = collection(db, "weekly");

export default async function WeeklyBoxOfficeFetch(inputDate: string) {
    try {
        const result = await getDoc(doc(db,"weekly",inputDate));
        if (result.exists()) {
            console.log('firebase에서 값을 찾아옴');
            console.log(result.data().movieInfo);
            return result.data().movieInfo;
        } 
        else {
            throw new Error('No such weekly document');
        }
    } catch {
        try {
            const weeklyData = await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&targetDt=${inputDate}&weekGb=0`)
            .then((response) => {return(response.json())});
            console.log(weeklyData);
            const movieInfo = weeklyData.boxOfficeResult.weeklyBoxOfficeList.map((el: weeklyBoxOfficeListElementType) => {return {title: el.movieNm, movieCd: el.movieCd, openDt: el.openDt}});
            console.log('firebase에 없어서 kobis에서 값을 찾아옴');
            console.log(movieInfo);
            await setDoc(doc(col, inputDate), {
                movieInfo
            });
            console.log('firebase에 값을 등록완료');
            return movieInfo;
        } catch {
            console.error('kobis에서 값 찾거나 firebase 등록 실패');
        }
    }
}