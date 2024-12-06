import { useState, useEffect } from "react";
import Image from "next/image";
import icon_up from "@/public/assets/icon_up.svg";
import icon_down from "@/public/assets/icon_down.svg";
import styles from "./Sort.module.css";

export default function Sort({ sortType, initSort = "낮은 가격순" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(initSort);

  const sortOptions = [
    { label: "최신 순", value: "newest" },
    { label: "오래된 순", value: "oldest" },
    { label: "높은 가격순", value: "priceHighest" },
    { label: "낮은 가격순", value: "priceLowest" }
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelectValue(initSort);
  }, [initSort]);

  const handleSelect = (label) => {
    setSelectValue(label);
    setIsOpen(false);

    const selectedOption = sortOptions.find(option => option.label === label);
    if (sortType && selectedOption) {
      sortType(selectedOption.value);
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
            {sortOptions.map(({ label }) => (
              <li
                key={label}
                className={styles.dropDown_item}
                onClick={() => handleSelect(label)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}