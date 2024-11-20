import styles from "./PocketPlaceFilter.module.css";
import SearchBar from "../Common/SearchBar/SearchBar";
import Rating from "../Common/Dropdown/Sort/Rating";
import Attribute from "../Common/Dropdown/Sort/Attribute";
import Soldout from "../Common/Dropdown/Sort/Soldout";
import Sort from "../Common/Dropdown/Sort/Sort";
import MultiFilterModal from "../Common/Modal/MultiFilter";

export default function PocketPlaceFilter() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.search_filters}>
          <div className={styles.filters}>
            <SearchBar />
            <div className={styles.desktopOnly}>
              <Rating />
            </div>
            <div className={styles.desktopOnly}>
              <Attribute />
            </div>
            <div className={styles.desktopOnly}>
              <Soldout />
            </div>
            <div className={styles.mobileOnly}>
              <MultiFilterModal filterKeys={["등급", "속성", "매진여부"]} />
            </div>
          </div>
          <div className={styles.sort}>
            <Sort />
          </div>
        </div>
      </div>
    </>
  );
}
