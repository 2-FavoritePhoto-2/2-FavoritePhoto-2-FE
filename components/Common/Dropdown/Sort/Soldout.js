import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import styles from "./Sort.module.css";


export default function Soldout({ sortType, reset, isOpen, onToggle }) {
  const [selectValue, setSelectValue] = useState("매진여부");

  const router = useRouter();

  const handleSelect = (value) => {
    setSelectValue(value);
    if (sortType) {
      const availableValue = value === "잔여" ? true : value === "매진" ? false : undefined;
      sortType(availableValue);
    }
    onToggle();
  };

  useEffect(() => {
    if (reset) {
      setSelectValue("매진여부");

      if (sortType && router.pathname === '/pocketPlace') {
        sortType(undefined);
      }
    }
  }, [reset, sortType, router.pathname]);

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