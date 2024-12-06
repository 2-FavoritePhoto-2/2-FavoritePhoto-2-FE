import { useState, useEffect } from "react";
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import styles from "./Sort.module.css";

export default function Attribute({ sortType, reset, isOpen, onToggle }) {

  const [selectValue, setSelectValue] = useState("속성");

  const attributes = [
    "노말", "불꽃", "물", "풀", "전기", "얼음", "격투", "독",
    "땅", "비행", "에스퍼", "벌레", "바위", "고스트",
    "드래곤", "악", "강철", "페어리"
  ];

  const handleSelect = (value) => {
    setSelectValue(value);
    if (sortType) {
      sortType(value);
    }
    onToggle();
  };

  useEffect(() => {
    if (reset) {
      setSelectValue("속성");
    }
  }, [reset]);

  return (
    <div className={styles.dropDown_container} onClick={onToggle}>
      <div>{selectValue}</div>
      <div className={styles.downIcon_container}>
        <Image src={isOpen ? icon_up : icon_down} alt="토글아이콘" />
      </div>
      {isOpen && (
        <div className={styles.dropDown_wrapper}>
          <ul className={styles.dropDown_list}>
            {attributes.map((attribute) => (
              <li
                key={attribute}
                className={styles.dropDown_item}
                onClick={() => handleSelect(attribute)}
              >
                {attribute}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
