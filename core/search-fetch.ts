export default async function SearchFetch(inputTitle: string) {
    if(inputTitle.trim().length === 0) return null;
    try {
        const searchData = await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=D2S2K7R8800545F550J4&listCount=5&use=%EA%B7%B9%EC%9E%A5%EC%9A%A9&title=${inputTitle}&releaseDts=20000101&sort=prodYear,1`)
        .then((response) => {return(response.json())});
        const result = searchData.Data[0].Result.map((el: any) => {
            return {title: el.title.replace(/!HS|!HE/g, ''), img: el.posters.split("|")[0], year: el.prodYear, genre: el.genre, rating: el.rating, plot: el.plots.plot[0].plotText, movieCd: el.Codes.Code[0].CodeNo}
        });
        return result;
    } catch {
        console.error("fetching error");
    }
}