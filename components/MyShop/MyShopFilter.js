import styles from "./MyShopFilter.module.css";
import SearchBar from "../Common/SearchBar/SearchBar";
import Rating from "../Common/Dropdown/Sort/Rating";
import Attribute from "../Common/Dropdown/Sort/Attribute";
import Sale from "../Common/Dropdown/Sort/Sale";
import Soldout from "../Common/Dropdown/Sort/Soldout";
import MultiFilterModal from "../Common/Modal/MultiFilter";

export default function MyShopFilter() {
  return (
    <div className={styles.container}>
      <div className={styles.line}></div>
      <div className={styles.search_filters}>
        <div className={styles.mobile_filter}>
          <MultiFilterModal filterKeys={["등급", "속성", "판매여부", "매진여부"]} />
        </div>
        <SearchBar />
        <div className={styles.filters}>
          <Rating />
          <Attribute />
          <Sale />
          <Soldout />
        </div>
      </div>
    </div>
  );
}
