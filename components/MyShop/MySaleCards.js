import Grade from "../Common/Grade/Grade";
import styles from "./MySaleCards.module.css";

export default function MySaleCards() {
  const grades = ["COMMON", "RARE", "SUPER-RARE", "LEGENDARY"];

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.owner}>소유자님이 판매 중인 포토카드</p>
        <p className={styles.total_count}>(40장)</p>
      </div>
      <div className={styles.grade_count}>
        {grades.map((grade) => (
          <Grade grade={grade} quantity={10} border={true} />
        ))}
      </div>
    </div>
  );
}
