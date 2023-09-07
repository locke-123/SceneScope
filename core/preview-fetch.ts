import { fireBaseApp } from '@/pages/_app';
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore/lite';

const db = getFirestore(fireBaseApp);
const col = collection(db, "preview");

export default async function PreviewFetch(inputTitle: string, inputOpenDate: string){
    inputTitle = inputTitle.replace(/\//g, '');
    try {
        const result = await getDoc(doc(db,"preview",inputTitle));
        if (result.exists()) {
            return result.data().previewImages;
        } 
        else {
            throw new Error('No such preview document');
        }
    } catch {
        try {
            const previewData = await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.NEXT_PUBLIC_KMDB_API_KEY}&title=${encodeURI(inputTitle)}&use=극장용&releaseDts=${inputOpenDate}`)
            .then((response) => {return(response.json())});
            const result = previewData.Data[0].Result[0].posters.split("|");
            const previewImages = {title: inputTitle, imageUrl: result};
            await setDoc(doc(col, inputTitle), {
                previewImages
            });
            return previewImages;
        } catch {
            console.error('kmdb에서 값 찾거나 firebase 등록 실패');
        }
    }
}