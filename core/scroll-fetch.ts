import { fireBaseApp } from '@/pages/_app';
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore/lite';

const db = getFirestore(fireBaseApp);


export default async function ScrollFetch(inputGenre: string, pageInt: number){
    const col = collection(db, inputGenre);
    const pageString = pageInt.toString();
    try {
        const result = await getDoc(doc(db,inputGenre,pageString));
        if (result.exists()) {
            console.log('firebase에서 값을 찾아옴');
            return result.data().previewImages;
        } 
        else {
            throw new Error(`No such ${inputGenre} document`);
        }
    } catch {
        try {
            const moreListData = await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=D2S2K7R8800545F550J4&listCount=10&startCount=${pageInt}&use=%EA%B7%B9%EC%9E%A5%EC%9A%A9&genre=${inputGenre}&releaseDts=20000101`)
            .then((response) => {return(response.json())});
            console.log(moreListData);
            const previewImages = moreListData.Data[0].Result.map((el: any) => {
                const result = {title: el.title , imageUrl: el.posters.split("|"), movieCd: el.Codes.Code[0].CodeNo}
                if(result.imageUrl[0] === "") {
                    return;
                } else {
                    return result;
                }
            }).filter((el: any) => el !== undefined)
            console.log(previewImages);
            console.log('firebase에 없어서 kmdb에서 값을 찾아옴');
            await setDoc(doc(col, pageString), {
                previewImages
            });
            console.log('firebase에 값을 등록완료');
            return previewImages;
        } catch {
            console.error('kmdb에서 값 찾거나 firebase 등록 실패');
        }
    }
}