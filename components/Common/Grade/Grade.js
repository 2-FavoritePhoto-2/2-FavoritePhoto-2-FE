import styles from "./Grade.module.css";

export default function Grade({ grade, detail, quantity, border }) {
  const gradeClass = styles[`grade_${grade.toLowerCase().replace(/\s+/g, "-")}`];
  const gradeDetail = detail ? styles.grade_detail : "";
  const borderClass = border ? styles.grade_border : "";
  const showQuantity = quantity ? `${quantity}장` : "";

  return (
    <div className={`${styles.grade} ${gradeClass} ${gradeDetail} ${borderClass}`}>
      <p>{grade}</p>
      <p>{showQuantity}</p>
    </div>
  );
}
