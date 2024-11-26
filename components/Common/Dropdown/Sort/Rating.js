import styles from "./Sort.module.css";
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import { useState } from "react";

export default function Rating({ sortType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("등급");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  /* TODO
   *sortType 함수 -> 부모 컴포넌트에서 정렬하는 함수를 정의해야함 */
  const handleSelect = (value) => {
    setSelectValue(value);
    setIsOpen(false);
    if (sortType) {
      sortType(value);
    }
  };

  return (
    <div className={styles.dropDown_container} onClick={handleToggle}>
      <div>{selectValue}</div>
      <div className={styles.downIcon_container}>
        <Image src={isOpen ? icon_up : icon_down} alt="토글아이콘" />
      </div>
      {isOpen && (
        <div className={styles.dropDown_wrapper}>
          <ul className={styles.dropDown_list}>
            <li className={styles.dropDown_item} onClick={() => handleSelect("COMMON")}>
              COMMON
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("RARE")}>
              RARE
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("SUPER_RARE")}>
              SUPER RARE
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("LEGENDARY")}>
              LEGENDARY
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
