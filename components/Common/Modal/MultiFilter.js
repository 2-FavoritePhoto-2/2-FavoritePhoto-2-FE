import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon_filter from "@/public/assets/icon_filter.svg";
import icon_exchange from "@/public/assets/icon_exchange.svg";
import styles from "./MultiFilter.module.css";

export default function MultiFilterModal({ filterKeys, filterCounts, onFilterChange, reset }) {
  const [activeTab, setActiveTab] = useState("등급");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const resetSelect = () => {
    setSelectedItem(null);
    onFilterChange("grade", null);
    onFilterChange("type", null);
    onFilterChange("sale", null);
    onFilterChange("available", null);
    onFilterChange("orderBy", "priceLowest");
  closeModal();
  };

  // useEffect(() => {
  // console.log("MultiFilterModal", filterCounts);
  // }, [filterCounts]);

  const handleFilterSelect = (item) => {
    setSelectedItem(item);
    const filterType =
      activeTab === "등급"
        ? "grade"
        : activeTab === "속성"
        ? "type"
        : activeTab === "판매방법"
        ? "sale"
        : activeTab === "매진여부"
        ? "available"
        : null;

    const filterValue =
      activeTab === "매진여부" ? (item === "잔여" ? true : item === "매진" ? false : null) : item;

    onFilterChange(filterType, filterValue);
  };

  const filterData = {
    등급: ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"],
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
    매진여부: ["잔여", "매진"],
  };

  const colorMapping = {
    COMMON: "var(--color-main)",
    RARE: "var(--color-blue)",
    SUPER_RARE: "var(--color-purple)",
    LEGENDARY: "var(--color-pink)",
  };

  const activeFilterCounts =
    activeTab === "등급"
      ? filterCounts?.grade || {}
      : activeTab === "속성"
      ? filterCounts?.type || {}
      : activeTab === "판매방법"
      ? filterCounts?.sale || {}
      : activeTab === "매진여부"
      ? { 잔여: filterCounts?.available?.true || 0, 매진: filterCounts?.available?.false || 0 }
      : {};

  //멀티 필터에서 총 개수 계산하는 부분
  const calculateTotalCount = () => {
    if (activeTab === "등급") {
      return Object.values(filterCounts?.grade || {}).reduce((total, count) => total + count, 0);
    }
    if (activeTab === "속성") {
      return Object.values(filterCounts?.type || {}).reduce((total, count) => total + count, 0);
    }
    if (activeTab === "판매방법") {
      return Object.values(filterCounts?.sale || {}).reduce((total, count) => total + count, 0);
    }
    if (activeTab === "매진여부") {
      return Object.values(filterCounts?.available || {}).reduce(
        (total, count) => total + count,
        0,
      );
    }
    return 0;
  };

  const totalCount = calculateTotalCount();

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
                    {filterData[activeTab].map((item, index) => {
                      const itemCount =
                        activeFilterCounts[item] !== undefined ? activeFilterCounts[item] : 0;
                      return (
                        <li
                          key={index}
                          className={selectedItem === item ? styles.selected : ""}
                          style={{ color: colorMapping[item] }}
                          onClick={() => handleFilterSelect(item)}
                        >
                          <div className={styles.item_wrapper}>
                            <div>{item}</div>
                            <div>{itemCount}개</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={styles.button_wrapper}>
                  <Image
                    src={icon_exchange}
                    alt="새로고침"
                    className={styles.reset_button}
                    onClick={resetSelect}
                  />
                  <button className={styles.filterPhoto_button} onClick={closeModal}>
                    {selectedItem
                      ? `${activeFilterCounts[selectedItem] || 0}개 포토보기`
                      : `${totalCount}개 포토보기`}
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
