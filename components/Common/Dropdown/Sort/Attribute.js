import styles from "./Sort.module.css";
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import { useState, useEffect } from "react";

export default function Attribute({ sortType, reset }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("속성");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setSelectValue(value);
    setIsOpen(false);
    if (sortType) {
      sortType(value);
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectValue("속성");
    }
  }, [reset]);

  return (
    <div className={styles.dropDown_container} onClick={handleToggle}>
      <div>{selectValue}</div>
      <div className={styles.downIcon_container}>
        <Image src={isOpen ? icon_up : icon_down} alt="토글아이콘" />
      </div>
      {isOpen && (
        <div className={styles.dropDown_wrapper}>
          <ul className={styles.dropDown_list}>
            <li className={styles.dropDown_item} onClick={() => handleSelect("노말")}>
              노말
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("불꽃")}>
              불꽃
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("물")}>
              물
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("풀")}>
              풀
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("전기")}>
              전기
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("얼음")}>
              얼음
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("격투")}>
              격투
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("독")}>
              독
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("땅")}>
              땅
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("비행")}>
              비행
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("에스퍼")}>
              에스퍼
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("벌레")}>
              벌레
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("바위")}>
              바위
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("고스트")}>
              고스트
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("드래곤")}>
              드래곤
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("악")}>
              악
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("강철")}>
              강철
            </li>
            <li className={styles.dropDown_item} onClick={() => handleSelect("페어리")}>
              페어리
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
