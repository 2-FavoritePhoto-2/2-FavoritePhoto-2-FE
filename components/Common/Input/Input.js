import { useState } from "react";
import styles from "./Input.module.css";
import Image from "next/image";
import ic_visible from "@/public/assets/icon_visible.svg";
import ic_inVisible from "@/public/assets/icon_invisible.svg";

export default function Input({ label, type, name, value, onChange, placeholder, onFileChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleFileChange = (e) => {
    if (onFileChange) {
      const file = e.target.files[0];
      onFileChange(file);
    }
  };

  const inputType =
    type === "textarea" ? (
      <textarea
        className={styles.textarea}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    ) : type === "password" ? (
      <div className={styles.password}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <Image
          src={isPasswordVisible ? ic_visible : ic_inVisible}
          onClick={togglePasswordVisibility}
          width={24}
          height={24}
          alt={isPasswordVisible ? "비밀번호 표시" : "비밀번호 숨기기"}
        />
      </div>
    ) : type === "point" ? (
      <div className={styles.point}>
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <p>P</p>
      </div>
    ) : type === "file" ? (
      <div className={styles.file_input}>
        <input
          type="file"
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={() => {}}
          placeholder={placeholder}
        />
        <button
          type="button"
          className={styles.file_select}
          onClick={() => document.getElementById(name).click()}
        >
          {value ? value : "파일선택"}
        </button>
      </div>
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );

  return (
    <div className={styles.group}>
      {label ? <label htmlFor={name}>{label}</label> : ""}
      {inputType}
    </div>
  );
}
