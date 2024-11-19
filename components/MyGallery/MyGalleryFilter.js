import styles from "./MyGalleryFilter.module.css";
import SearchBar from "../Common/SearchBar/SearchBar";
import Rating from "../Common/Dropdown/Sort/Rating";
import Attribute from "../Common/Dropdown/Sort/Attribute";

export default function MyGalleryFilter() {
  return (
    <div className={styles.container}>
      <div className={styles.line}></div>
      <div className={styles.search_filters}>
        <SearchBar />
        <div className={styles.filters}>
          <Rating />
          <Attribute />
        </div>
      </div>
    </div>
  );
}
