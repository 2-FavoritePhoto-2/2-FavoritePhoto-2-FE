import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon_filter from "@/public/assets/icon_filter.svg";
import icon_exchange from "@/public/assets/icon_exchange.svg";
import styles from "./MultiFilter.module.css";

export default function MultiFilterModal({ filterKeys, reset, filterCounts = {}, onFilterChange }) {
  // filterCounts의 기본값을 빈 객체로 설정
  const [activeTab, setActiveTab] = useState("등급");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const resetSelect = () => {
    setSelectedItem(null);
    onFilterChange(null, null);
  };

  const handleFilterSelect = (item) => {
    setSelectedItem(item);
    onFilterChange(activeTab === "등급" ? "rating" : "attribute", item);
  };

  const filterData = {
    등급: ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"],
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
    판매여부: ["판매중", "대기중"],
    매진여부: ["매진", "잔여"],
  };

  const colorMapping = {
    COMMON: "var(--color-main)",
    RARE: "var(--color-blue)",
    "SUPER RARE": "var(--color-purple)",
    LEGENDARY: "var(--color-pink)",
  };

  const activeFilterCounts = filterCounts[activeTab] || {};

  useEffect(() => {
    if (!filterKeys.includes(activeTab)) {
      setActiveTab(filterKeys[0] || "등급");
    }
  }, [filterKeys, activeTab]);

  return (
    <div>
      <div className={styles.filterButton_wrapper}>
        <Image
          src={icon_filter}
          onClick={openModal}
          alt="필터아이콘"
          className={styles.filter_button}
        />
      </div>
      <div className={styles.filterModal_container}>
        {isModalOpen && (
          <>
            <div className={styles.overlay}></div>
            <div className={styles.modal_container}>
              <div className={styles.modal_content}>
                <div className={styles.modal_title}>
                  <h2>필터</h2>
                  <button onClick={closeModal} className={styles.close_button}>
                    X
                  </button>
                </div>
                <div className={styles.filter_tabs}>
                  {filterKeys.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${styles.tab_button} ${activeTab === tab ? styles.active : ""}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className={styles.filter_content}>
                  <ul className={styles.filter_list}>
                    {filterData[activeTab].map((item, index) => (
                      <li
                        key={index}
                        className={selectedItem === item ? styles.selected : ""}
                        style={{ color: colorMapping[item] }}
                        onClick={() => handleFilterSelect(item)}
                      >
                        {item} ({activeFilterCounts[item] || 0})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.button_wrapper}>
                  <Image
                    src={icon_exchange}
                    alt="새로고침"
                    className={styles.reset_button}
                    onClick={resetSelect}
                  />
                  <button className={styles.filterPhoto_button}>
                    {selectedItem
                      ? `(${activeFilterCounts[selectedItem] || 0})개 포토보기`
                      : `포토보기`}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
