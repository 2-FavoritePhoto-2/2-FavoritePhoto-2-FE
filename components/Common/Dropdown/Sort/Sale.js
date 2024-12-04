import { useState, useEffect } from "react";
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import styles from "./Sort.module.css";

export default function Sale({ sortType, reset, isOpen, onToggle }) {
  const [selectValue, setSelectValue] = useState("판매방법");

  const handleSelect = (value) => {
    setSelectValue(value);
    if (sortType) {
      sortType(value);
    }
    onToggle();
  };

  useEffect(() => {
    if (reset) {
      setSelectValue("판매방법");
    }
  }, [reset]);

  return (
    <div
      className={`${styles.dropDown_container} ${styles.container_large}`}
      onClick={onToggle}
    >
      <div>{selectValue}</div>
      <div className={styles.downIcon_container}>
        <Image src={isOpen ? icon_up : icon_down} alt="토글아이콘" />
      </div>
      {isOpen && (
        <div className={styles.dropDown_wrapper}>
          <ul className={styles.dropDown_list}>
            <li className={styles.dropDown_item} onClick={() => handleSelect("판매중")}>
              판매중
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("대기중")}>
              대기중
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
