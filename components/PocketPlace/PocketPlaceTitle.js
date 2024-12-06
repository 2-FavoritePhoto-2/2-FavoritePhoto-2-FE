import { useState } from "react";
import CardList from "../Common/Modal/CardList";
import Modal from "../Common/Modal/Modal";
import Notification from "../Common/Modal/Notification";
import { getAccessToken } from "@/lib/utils/token";
import styles from "./PocketPlaceTitle.module.css";

export default function PocketPlaceTitle() {
  const [showCardList, setShowCardList] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleClickList = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setShowNotification(true);
    } else {
      setShowCardList(true);
    }
  };

  const closeModal = () => {
    setShowCardList(false);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_button}>
        <div>
          <h1 className={styles.title}>포켓플레이스</h1>
        </div>
        <div className={styles.button_wrapper}>
          <button className={styles.button} onClick={handleClickList}>나의 포토카드 판매하기</button>
        </div>
      </div>
      <div className={styles.line}></div>
      {showNotification && (
        <Notification
          type="login"
          onClose={closeNotification}
          onButtonClick={() => (window.location.href = "/auth/login")}
        />
      )}
      {showCardList && (
        <Modal isOpen={showCardList} closeModal={closeModal}>
          <CardList />
        </Modal>
      )}
    </div>
  );
}
