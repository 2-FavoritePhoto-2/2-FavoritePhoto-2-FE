import { useState } from "react";
import styles from "./Dropdown.module.css";
import Image from "next/image";
import arrowDown from "@/public/assets/icon_down.svg";

export default function Dropdown({ label, value, setValue, option }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = {
    등급: ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"],
    속성: [
      "노말",
      "불꽃",
      "물",
      "풀",
      "전기",
      "얼음",
      "격투",
      "독",
      "땅",
      "비행",
      "에스퍼",
      "벌레",
      "바위",
      "고스트",
      "드래곤",
      "악",
      "강철",
      "페어리",
    ],
  };

  const formatDisplayValue = (value) => {
    return value.replace(/_/g, " ");
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (val) => {
    setValue(val);
    setIsOpen(false);
  };

  return (
    <div className={styles.group}>
      <p className={styles.label}>{label}</p>
      <div className={styles.dropdown_container}>
        <div className={styles.dropdown} onClick={toggleDropdown}>
          <p>{formatDisplayValue(value) || `${label}을 선택하세요`}</p>
          <Image src={arrowDown} width={28} height={28} alt="아래 화살표" />
        </div>
        {isOpen && (
          <div className={styles.dropdown_options}>
            {options[option].map((option, index) => (
              <div
                key={index}
                className={styles.dropdown_option}
                onClick={() => handleOptionClick(option)}
              >
                <p>{formatDisplayValue(option)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
