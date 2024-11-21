import styles from "./CardList.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Rating from "../Dropdown/Sort/Rating";
import Attribute from "../Dropdown/Sort/Attribute";
import PhotoCard from "@/components/Common/PhotoCard/PhotoCard";
import MultiFilterModal from "./MultiFilter";

export default function CardList({ cardList }) {
  const count = 10;
  return (
    <div className={styles.list_wrapper}>
      <div className={styles.list_header}>
        <h1 className={styles.modal_title}>마이갤러리</h1>
        <div className={styles.list_title}>
          <h1>나의 포토카드 판매하기</h1>
          <div className={styles.line}></div>
        </div>
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
      <div className={styles.card_list_wrapper}>
        <div className={styles.card_list}>
          {Array.from({ length: count }).map((_, index) => (
            <PhotoCard key={index} />
          ))}
        </div>
        {/* {cardList.map((card) => (
            <div className={styles.card_list} key={card.id}>
              <PhotoCard card={card} />
            </div>
          ))} */}
      </div>
    </div>
  );
}
