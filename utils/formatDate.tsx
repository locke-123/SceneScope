export default function formatDate(stringDate: string) {
    const numDate = Number(stringDate);
    const year = Math.floor(numDate / 10000);
    const month = Math.floor((numDate % 10000) / 100);
    const day = numDate % 100;

    const date = new Date(year, month - 1, day);
    const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  
    return formattedDate;
}