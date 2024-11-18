import SearchBar from "@/components/Common/SearchBar/SearchBar";
import styles from "./pocketPlace.module.css";
import Rating from "@/components/Common/Dropdown/Sort/Rating";
import Attribute from "@/components/Common/Dropdown/Sort/Attribute";
import Soldout from "@/components/Common/Dropdown/Sort/Soldout";
import Sort from "@/components/Common/Dropdown/Sort/Sort";
import PhotoCard from "@/components/PhotoCard/PhotoCard";
export default function () {
  return (
    <>
      <div className={styles.pocketPlace_container}>
        <div className={styles.title_wrapper}>
          <div className={styles.pocketPlace_title}>포켓플레이스</div>
          <button className={styles.register_button}>나의 포토카드 판매하기</button>
        </div>
        <hr />
        <div className={styles.filter_container}>
          <div className={styles.search_dropdown_wrapper}>
            <SearchBar />
            <Rating />
            <Attribute />
            <Soldout />
          </div>
          <Sort />
        </div>
        <div className={styles.card_container}>
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
        </div>
      </div>
    </>
  );
}
