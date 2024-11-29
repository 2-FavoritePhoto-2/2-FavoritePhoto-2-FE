import Link from "next/link";
import styles from "./Profile.module.css";

export default function UserDrop({ nickname, points, onClose, handleAuthChange }) {
  return (
    <div className={styles.userDrop} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <span className={styles.title}>안녕하세요, {nickname}님!</span>

            <div className={styles.point}>
              <span>보유 포인트</span>
              <span className={styles.numPoint}> {points ? points.toLocaleString("ko-KR") : "0"} P </span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.table}>
              <Link href="/myGallery">마이갤러리</Link>
              <Link href="/myShop">나의 판매 포토카드</Link>
            </div>

            <span className={styles.logout} onClick={() => {
              if (typeof handleAuthChange === 'function') {
                handleAuthChange(); 
                setIsOpen(false);
              } else {
                console.error("handleAuthChange is not a function");
              }
            }}>
            로그아웃
          </span>
        </div>
      </div>
    );
  }