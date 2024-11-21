import Attribute from "../Dropdown/Sort/Attribute.js";
import Rating from "../Dropdown/Sort/Rating.js";
import SearchBar from "../SearchBar/SearchBar.js";
import styles from "./Exchange.module.css";
import { useState } from "react";
import MultiFilterModal from "./MultiFilter.js";
import PhotoCard from "../PhotoCard/PhotoCard.js";

export default function Exchange() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  const closeModal = () => setIsOpen(false);

  const slideCloseModal = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSliding(false);
    }, 300); // 애니메이션 시간과 일치시킴
  };

  if (!isOpen && !isSliding) return null;
  return (
    <>
      <div className={`${styles.container} ${isSliding ? styles.sliding : ""}`}>
        <div className={styles.modal_table}>
          <div className={styles.modal_content}>
            <div className={styles.slidebar_table}>
              <img
                src="/assets/btn_crossbar.png"
                alt="slidebutton"
                className={styles.crossbutton}
                onClick={slideCloseModal}
              />
            </div>
            <div className={styles.mygallery_table}>
              <img src="/assets/icon_mygallery.png" alt="mygallery" className={styles.mygallery} />
              <img
                src="/assets/icon_close.svg"
                alt="close_button"
                className={styles.close_button}
                onClick={closeModal}
              />
            </div>

            <p className={styles.exchange_name}>포토카드 교환하기</p>
            <div className={styles.search_menu}>
              <div className={styles.multi_filter}>
                <MultiFilterModal filterKeys={["등급", "속성"]} />
              </div>
              <div className={styles.searchbar}>
              <SearchBar />
              </div>
              <div className={styles.filter_table}>
                <Rating />
                <Attribute />
              </div>
            </div>
            <div className={styles.photocard_content}>
              <PhotoCard />
              <PhotoCard />
              <PhotoCard />
              <PhotoCard />
              <PhotoCard />
              <PhotoCard />
              <PhotoCard />
              <PhotoCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
