import Image from 'next/image'
import styles from './basic-info.module.css'
import img from '@/public/man-1139066_1280.jpg'
import formatDate from '@/utils/formatDate'

export default function BasicInfoComponent(props: any){

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.upperWrapper}>
                    <div className={styles.poster}>
                        <Image height={405} width={280} src={props.kmdbData ? props.kmdbData.posters.split("|")[0] : img} alt='movieImg'></Image>
                    </div>
                    <div className={styles.infoWrapper}>
                        <div className={styles.movieNm}>{props.kobisData?.movieNm}</div>
                        <div className={styles.movieNmEn}>{props.kobisData?.movieNmEn}</div>
                        <div className={styles.directors}>{props.kobisData?.directors[0]?.peopleNm}</div>
                        <div className={styles.companys}>{props.kobisData?.companys[0]?.companyNm}</div>
                        <div className={styles.openDt}>{formatDate(props.kobisData?.openDt)} 개봉</div>
                        <div className={styles.showTm}>{props.kobisData?.showTm}분</div>
                        <div className={styles.actorsWrapper}>
                            {props.kobisData?.actors.map((el: any, key: any) => {
                                return <div className={styles.actors} key={key}>{el.peopleNm}</div>
                            })}
                        </div>
                    </div>
                    <div className={styles.infoWrapper2}>
                        <div className={styles.genresWrapper}>
                            {props.kobisData?.genres.map((el: any, key: any) => {
                                return <div className={styles.genres} key={key}>{el.genreNm}</div>
                            })}
                        </div>
                        <div className={styles.watchGradeNm}>{props.kobisData?.audits[0]?.watchGradeNm}</div>
                    </div>
                    <div className={styles.videoContainer}>
                        <iframe id="player" width="720" height="405" frameBorder="0" allowFullScreen
                        src={`https://www.youtube.com/embed/${props.youtubeData}?autoplay=1`}></iframe>
                    </div>
                </div>
                <div className={styles.underWrapper}>
                    <div className={styles.plot}>{props.kmdbData?.plots.plot[0].plotText}</div>
                    <div className={styles.stllsWrapper} style={props.kmdbData?.stlls ? {opacity: 1} : {opacity: 0}}>
                        <div className={styles.imgText}>스틸컷</div>
                        <div className={styles.imgWrapper}>
                            {props.kmdbData?.stlls.split("|").map((el: any, key: any) => {
                                return <Image className={styles.imgElement} key={key} height={138} width={207} src={el} alt='img'></Image>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}