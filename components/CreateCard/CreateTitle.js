import styles from "./CreateTitle.module.css";

export default function CreateTitle() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>포토카드 생성</h1>
      <div className={styles.line}></div>
    </div>
  );
}
