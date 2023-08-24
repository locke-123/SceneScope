import styles from './top-bar.module.css'
import Title from './title/title-component'
import SearchBar from './searchbar/searchbar-component'
import Profile from './profile/profile-component'

export default function TopBarPresenter(){

    return (
        <div className={styles.container}>
            <Title />
            <SearchBar />
            <Profile />
        </div>
    )
}