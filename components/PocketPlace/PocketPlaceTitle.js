import styles from "./PocketPlaceTitle.module.css";
import { useState } from "react";
import CardList from "../Common/Modal/CardList";

export default function PocketPlaceTitle() {
  const [showCardSell, setShowCardSell] = useState(false);

  const handleClickList = () => {
    setShowCardSell(true);
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
      {showCardSell && <CardList />}
    </div>
  );
}
