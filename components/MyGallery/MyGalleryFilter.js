import styles from "./MyGalleryFilter.module.css";
import SearchBar from "../Common/SearchBar/SearchBar";
import Rating from "../Common/Dropdown/Sort/Rating";
import Attribute from "../Common/Dropdown/Sort/Attribute";
import MultiFilterModal from "../Common/Modal/MultiFilter";

export default function MyGalleryFilter() {
  return (
    <div className={styles.container}>
      <div className={styles.line}></div>
      <div className={styles.search_filters}>
        <div className={styles.mobile_filter}>
          <MultiFilterModal filterKeys={["등급", "속성"]} />
        </div>
        <div className={styles.search}>
          <SearchBar />
        </div>
        <div className={styles.filters}>
          <Rating />
          <Attribute />
        </div>
      </div>
    </div>
  );
}
