import { useState } from "react";
import styles from "./Dropdown.module.css";
import Image from "next/image";
import arrowDown from "@/public/assets/icon_down.svg";

export default function Dropdown({ label, name, value, setValue, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (val) => {
    setValue(val);
    setIsOpen(false);
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
              <div
                key={option.value}
                className={styles.dropdown_option}
                onClick={() => handleOptionClick(option)}
              >
                <p>{option}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
