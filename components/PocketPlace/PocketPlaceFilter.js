import styles from "./PocketPlaceFilter.module.css";
import Image from "next/image";
import SearchBar from "../Common/SearchBar/SearchBar";
import Rating from "../Common/Dropdown/Sort/Rating";
import Attribute from "../Common/Dropdown/Sort/Attribute";
import Soldout from "../Common/Dropdown/Sort/Soldout";
import Sort from "../Common/Dropdown/Sort/Sort";
import MultiFilterModal from "../Common/Modal/MultiFilter";
import icon_exchange from "@/public/assets/icon_exchange.svg";

export default function PocketPlaceFilter({ onSearch, onFilterChange }) {
  const handleSearch = (term) => {
    onSearch(term);
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
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
              <Rating sortType={(value) => handleFilterChange("rating", value)} />
            </div>
            <div className={styles.desktopOnly}>
              <Attribute sortType={(value) => handleFilterChange("attribute", value)} />
            </div>
            <div className={styles.desktopOnly}>
              <Soldout />
            </div>
          </div>
          <div className={styles.desktopOnly}>
            <Image src={icon_exchange} alt="새로고침" width={20} className={styles.refreshIcon} />
          </div>
          <div className={styles.filters_mobile}>
            <div className={styles.mobileOnly}>
              <MultiFilterModal filterKeys={["등급", "속성", "매진여부"]} />
            </div>
            <div className={styles.sort}>
              <Sort sortType={(value) => handleFilterChange("soldout", value)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
