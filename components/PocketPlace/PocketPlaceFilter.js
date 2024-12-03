import { useState } from "react";
import SearchBar from "../Common/SearchBar/SearchBar";
import Rating from "../Common/Dropdown/Sort/Rating";
import Attribute from "../Common/Dropdown/Sort/Attribute";
import Soldout from "../Common/Dropdown/Sort/Soldout";
import Sort from "../Common/Dropdown/Sort/Sort";
import MultiFilterModal from "../Common/Modal/MultiFilter";
import Image from "next/image";
import icon_exchange from "@/public/assets/icon_exchange.svg";
import styles from "./PocketPlaceFilter.module.css";


export default function PocketPlaceFilter({ onSearch, onFilterChange, filterCounts }) {
  const [reset, setReset] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 추가

  const handleSearch = (term) => {
    onSearch(term);
  };

  const handleFilterChange = (filterType, value) => {
    setReset(false);
    onFilterChange(filterType, value);
  };

  const handleDropdownToggle = (dropdownName) => { //추가
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleResetFilters = () => {
    setReset(true);
    onFilterChange("type", null);
    onFilterChange("grade", null);
    onFilterChange("available", null);
    onFilterChange("orderBy", "priceLowest");
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
              <Rating sortType={(value) => handleFilterChange("grade", value)}
                reset={reset}
                isOpen={openDropdown === 'grade'} //추가
                onToggle={() => handleDropdownToggle('grade')} />
            </div>
            <div className={styles.desktopOnly}>
              <Attribute sortType={(value) => handleFilterChange("type", value)}
                reset={reset}
                isOpen={openDropdown === 'type'}
                onToggle={() => handleDropdownToggle('type')} />
            </div>
            <div className={styles.desktopOnly}>
              <Soldout sortType={(value) => handleFilterChange("available", value)}
                reset={reset}
                isOpen={openDropdown === 'available'}
                onToggle={() => handleDropdownToggle('available')} />
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
                reset={reset}
              />
            </div>
            <div className={styles.sort}>
              <Sort sortType={(value) => handleFilterChange("orderBy", value)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
