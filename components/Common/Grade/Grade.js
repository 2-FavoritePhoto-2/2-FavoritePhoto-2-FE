import styles from "./Grade.module.css";

export default function Grade({ grade, detail, quantity, border }) {
  const normalizedGrade = grade.replace(/[_-]/g, " ").toUpperCase();

  const gradeClass = styles[`grade_${normalizedGrade.toLowerCase().replace(/\s+/g, "-")}`];
  const gradeDetail = detail ? styles.grade_detail : "";
  const borderClass = border ? styles.grade_border : "";
  const showQuantity = quantity ? `${quantity}장` : quantity === 0 ? "0장" : "";

  return (
    <div className={`${styles.grade} ${gradeClass} ${gradeDetail} ${borderClass}`}>
      <p>{normalizedGrade}</p>
      <p>{showQuantity}</p>
    </div>
  );
}
