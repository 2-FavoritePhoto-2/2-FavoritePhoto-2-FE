import styles from "./PocketPlaceFilter.module.css";
import SearchBar from "../Common/SearchBar/SearchBar";
import Rating from "../Common/Dropdown/Sort/Rating";
import Attribute from "../Common/Dropdown/Sort/Attribute";
import Soldout from "../Common/Dropdown/Sort/Soldout";
import Sort from "../Common/Dropdown/Sort/Sort";

export default function PocketPlaceFilter() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.search_filters}>
          <div className={styles.filters}>
            <SearchBar />
            <Rating />
            <Attribute />
            <Soldout />
          </div>
          <div className={styles.sort}>
            <Sort />
          </div>
        </div>
      </div>
    </>
  );
}
