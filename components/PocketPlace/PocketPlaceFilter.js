import styles from "./PocketPlaceFilter.module.css";
import Image from "next/image";
import SearchBar from "../Common/SearchBar/SearchBar";
import Rating from "../Common/Dropdown/Sort/Rating";
import Attribute from "../Common/Dropdown/Sort/Attribute";
import Soldout from "../Common/Dropdown/Sort/Soldout";
import Sort from "../Common/Dropdown/Sort/Sort";
import MultiFilterModal from "../Common/Modal/MultiFilter";
import icon_exchange from "@/public/assets/icon_exchange.svg";
import { useState } from "react";

export default function PocketPlaceFilter({ onSearch, onFilterChange, filterCounts }) {
  const [reset, setReset] = useState(false);

  const handleSearch = (term) => {
    onSearch(term);
  };

  const handleFilterChange = (filterType, value) => {
    setReset((prev) => !prev);
    onFilterChange(filterType, value);
  };

  const handleResetFilters = () => {
    onFilterChange(null, null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.search_filters}>
          <div className={styles.searchBar_container}>
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className={styles.line}></div>
          <div className={styles.filters}>
            <div className={`${styles.desktopOnly} ${styles.rating}`}>
              <Rating sortType={(value) => handleFilterChange("grade", value)} reset={reset} />
            </div>
            <div className={styles.desktopOnly}>
              <Attribute sortType={(value) => handleFilterChange("type", value)} reset={reset} />
            </div>
            <div className={styles.desktopOnly}>
              <Soldout />
            </div>
          </div>
          <div className={styles.desktopOnly}>
            <Image
              src={icon_exchange}
              alt="새로고침"
              width={20}
              className={styles.refreshIcon}
              onClick={handleResetFilters}
            />
          </div>
          <div className={styles.filters_mobile}>
            <div className={styles.mobileOnly}>
              <MultiFilterModal
                filterKeys={["등급", "속성", "매진여부"]}
                filterCounts={filterCounts}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className={styles.sort}>
              <Sort sortType={(value) => handleFilterChange("available", value)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
