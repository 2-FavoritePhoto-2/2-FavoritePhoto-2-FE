import styles from "./MyShopTitle.module.css";

export default function MyShopTitle() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>나의 판매 포토카드</h1>
      <div className={styles.line}></div>
    </div>
  );
}
