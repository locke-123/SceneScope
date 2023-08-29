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

// ////////////// movie code가 아닌 {movie code & movie title} 형식으로 반환해야함.
// 알고보니 kmdb에서 외국 영화 포스터도 지원해줌. 한국만 되는줄

export default async function DailyBoxOfficeFetch(inputDate: string) {
    try {
        const result = await getDoc(doc(db,"daily",inputDate));
        if (result.exists()) {
            console.log('firebase에서 값을 찾아옴');
            console.log(result.data().movieCode);
            return result.data().movieCode;
        } 
        else {
            throw new Error('No such daily document');
        }
    } catch {
        try {
            const dailyData = await fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOFIC_API_KEY}&targetDt=${inputDate}`)
            .then((response) => {return(response.json())});
            console.log(dailyData);
            const movieCode = dailyData.boxOfficeResult.dailyBoxOfficeList.map((el: dailyBoxOfficeListElementType) => {return el.movieCd});
            console.log('firebase에 없어서 kobis에서 값을 찾아옴');
            console.log(movieCode);
            await setDoc(doc(col, inputDate), {
                movieCode
            });
            console.log('firebase에 값을 등록완료');
            return movieCode;
        } catch {
            console.error('kobis에서 값 찾거나 firebase 등록 실패');
        }
    }
}

// await setDoc(doc(col, '달마시안'), {
//     title: 'dalmasian',
//     movieImg: 'www.ddeed.com'
// });