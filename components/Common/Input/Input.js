import { useState } from "react";
import styles from "./Input.module.css";
import Image from "next/image";
import ic_visible from "@/public/assets/icon_visible.svg";
import ic_inVisible from "@/public/assets/icon_invisible.svg";

export default function Input({ label, type, name, value, onChange, placeholder, exchange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType =
    type === "textarea" ? (
      <textarea
        className={exchange ? styles.exchange : styles.textarea}
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
