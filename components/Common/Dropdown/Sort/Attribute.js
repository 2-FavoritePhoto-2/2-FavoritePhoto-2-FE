import styles from "./Sort.module.css";
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import { useState } from "react";

export default function Attribute({ sortType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("속성");

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
      <div>속성</div>
      <div className={styles.downIcon_container}>
        <Image src={isOpen ? icon_up : icon_down} alt="토글아이콘" />
      </div>
      {isOpen && (
        <div className={styles.dropDown_wrapper}>
          <ul className={styles.dropDown_list}>
            <li className={styles.dropDown_item} onClick={() => handleSelect("COMMON")}>
              불꽃
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("RARE")}>
              물
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("SUPER RARE")}>
              풀
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("LEGENDARY")}>
              전기
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("LEGENDARY")}>
              얼음
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("LEGENDARY")}>
              격투
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("LEGENDARY")}>
              독
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("LEGENDARY")}>
              땅
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("LEGENDARY")}>
              기타
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
