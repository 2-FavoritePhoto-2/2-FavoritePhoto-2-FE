import styles from "./FileInput.module.css";

export default function FileInput({ label, name, value, onChange }) {
  return (
    <div className={styles.group}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.file_input}>
        <input type="file" id={name} name={name} style={{ display: "none" }} onChange={onChange} />
        <div className={styles.file_name}>
          <input readOnly value={value} placeholder={label} />
        </div>
        <button type="button" onClick={() => document.getElementById(name).click()}>
          파일선택
        </button>
      </div>
    </div>
  );
}
