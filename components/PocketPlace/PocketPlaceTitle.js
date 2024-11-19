import styles from "./PocketPlaceTitle.module.css";

export default function PocketPlaceTitle() {
  return (
    <div className={styles.container}>
      <div className={styles.title_button}>
        <h1>포켓플레이스</h1>
        <button>나의 포토카드 판매하기</button>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
