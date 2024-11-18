import { useState } from "react";
import styles from "./Dropdown.module.css";
import Image from "next/image";
import arrowDown from "@/public/assets/icon_down.svg";

export default function Dropdown({ label, name, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.group}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.dropdown_container}>
        <div className={styles.dropdown} onClick={toggleDropdown}>
          <p>{value || `${label}을 선택하세요`}</p>
          <Image src={arrowDown} width={28} height={28} alt="아래 화살표" />
        </div>
        {isOpen && (
          <div className={styles.dropdown_options}>
            {options.map((option) => (
              <div key={option} className={styles.dropdown_option} onClick={onChange}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
