import styles from "./Sort.module.css";
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import { useState, useEffect } from "react";

export default function Soldout({ sortType, reset }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("매진여부");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setSelectValue(value);
    setIsOpen(false);
    if (sortType) {
      const availableValue = value === "잔여" ? true : value === "매진" ? false : undefined;
      sortType(availableValue);
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectValue("매진여부");

      if (sortType) {
        sortType(undefined);
      }
    }
  }, [reset, sortType]);

  return (
    <div
      className={`${styles.dropDown_container} ${styles.container_large}`}
      onClick={handleToggle}
    >
      <div>{selectValue}</div>
      <div className={styles.downIcon_container}>
        <Image src={isOpen ? icon_up : icon_down} alt="토글아이콘" />
      </div>
      {isOpen && (
        <div className={styles.dropDown_wrapper}>
          <ul className={styles.dropDown_list}>
            <li className={styles.dropDown_item} onClick={() => handleSelect("매진")}>
              매진
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("잔여")}>
              잔여
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}