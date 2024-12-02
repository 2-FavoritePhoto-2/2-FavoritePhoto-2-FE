import styles from "./MySaleCards.module.css";
import Grade from "../Common/Grade/Grade";

export default function MySaleCards({ mySales, profile }) {
  const grades = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];

  const gradeCount = {
    COMMON: 0,
    RARE: 0,
    SUPER_RARE: 0,
    LEGENDARY: 0,
  };

  mySales.forEach((card) => {
    if (gradeCount[card.grade] !== undefined) {
      gradeCount[card.grade]++;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.owner}>{profile.nickname}님이 판매 중인 포토카드</p>
        <p className={styles.total_count}>({mySales.length}장)</p>
      </div>
      <div className={styles.grade_count}>
        {grades.map((grade, index) => (
          <div key={index}>
            <Grade grade={grade} quantity={gradeCount[grade] || 0} border={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
