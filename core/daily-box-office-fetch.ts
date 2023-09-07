import { fireBaseApp } from '@/pages/_app';
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore/lite';

interface dailyBoxOfficeListElementType {
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
const col = collection(db, "daily");

export default async function DailyBoxOfficeFetch(inputDate: string) {
    try {
        const result = await getDoc(doc(db,"daily",inputDate));
        if (result.exists()) {
            return result.data().movieInfo;
        } 
        else {
            throw new Error('No such daily document');
        }
    } catch {
        try {
            const dailyData = await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&targetDt=${inputDate}`)
            .then((response) => {return(response.json())});
            const movieInfo = dailyData.boxOfficeResult.dailyBoxOfficeList.map((el: dailyBoxOfficeListElementType) => {return {title: el.movieNm, movieCd: el.movieCd, openDt: el.openDt}});
            await setDoc(doc(col, inputDate), {
                movieInfo
            });
            return movieInfo;
        } catch {
            console.error('kobis에서 값 찾거나 firebase 등록 실패');
        }
    }
}

// await setDoc(doc(col, '달마시안'), {
//     title: 'dalmasian',
//     movieImg: 'www.ddeed.com'
// });