import styles from "./Sort.module.css";
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import { useState } from "react";

export default function Sort({ sortType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("낮은 가격순");

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
    <div className={`${styles.dropDown_container} ${styles.container_box}`} onClick={handleToggle}>
      <div>{selectValue}</div>
      <div className={styles.downIcon_container}>
        <Image src={isOpen ? icon_up : icon_down} alt="토글아이콘" />
      </div>
      {isOpen && (
        <div className={`${styles.dropDown_wrapper} ${styles.wrapper_box}`}>
          <ul className={styles.dropDown_list}>
            <li className={styles.dropDown_item} onClick={() => handleSelect("최신 순")}>
              최신 순
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("오래된 순")}>
              오래된 순
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("높은 가격순")}>
              높은 가격순
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("낮은 가격순")}>
              낮은 가격순
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
