import styles from "./CardList.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Rating from "../Dropdown/Sort/Rating";
import Attribute from "../Dropdown/Sort/Attribute";
import PhotoCard from "@/components/Common/PhotoCard/PhotoCard";
import MultiFilterModal from "./MultiFilter";
import data from "@/public/mockData.json";
import icon_close from "@/public/assets/icon_close.svg";
import Image from "next/image";

export default function CardList({ closeModal }) {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.list_wrapper}>
        <div className={styles.close} onClick={closeModal}>
          <Image src={icon_close} alt="닫기" className={styles.closeIcon_x} />
        </div>
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
            {data.map((card) => (
              <div key={card.id}>
                <PhotoCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
