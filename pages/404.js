import { useRouter } from 'next/router';
import Image from 'next/image';
import icon_4 from '@/public/assets/icon_4.png';
import icon_spinner from '@/public/assets/icon_spinner.gif';
import icon_book from '@/public/assets/icon_book.png';
import styles from '../styles/ErrorPage.module.css';

export default function Error404() {

    const router = useRouter();

    const handleClickPocketPlace = () => {
        router.push('/pocketPlace');
    };

    return (
        <div className={styles.error_page_container}>
            <div className={styles.title_container}>
                <Image src={icon_4} alt="404" width={200} height={200} />
                <Image src={icon_spinner} alt="spinner" width={100} height={100} />
                <Image src={icon_4} alt="404" width={200} height={200} />

            </div>
            <div className={styles.error_message_container}>
                <p>페이지의 주소가 잘못 입력되었거나,<br /> 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</p>
            </div>
            <div className={styles.book_wrapper}>
                <Image src={icon_book} alt="book" width={500} height={300} />
            </div>
            <div className={styles.button_wrapper}>
                <button className={styles.go_pocketPlace_button} onClick={handleClickPocketPlace}>포켓플레이스로 돌아가기</button>
            </div>
        </div>
    );
}
