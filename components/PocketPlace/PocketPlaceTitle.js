import styles from "./PocketPlaceTitle.module.css";
import { useState } from "react";
import CardList from "../Common/Modal/CardList";
import Modal from "../Common/Modal/Modal";

export default function PocketPlaceTitle() {
  const [showCardList, setShowCardList] = useState(false);

  const handleClickList = () => {
    setShowCardList(true);
  };

  const closeModal = () => {
    setShowCardList(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_button}>
        <div>
          <h1 className={styles.title}>포켓플레이스</h1>
        </div>
        <div className={styles.button}>
          <button onClick={handleClickList}>나의 포토카드 판매하기</button>
        </div>
      </div>
      <div className={styles.line}></div>
      {showCardList && (
        <Modal isOpen={showCardList} closeModal={closeModal}>
          <CardList />
        </Modal>
      )}
    </div>
  );
}
