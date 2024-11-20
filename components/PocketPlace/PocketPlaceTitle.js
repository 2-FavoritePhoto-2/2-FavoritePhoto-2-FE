import styles from "./PocketPlaceTitle.module.css";
import { useState } from "react";
import CardSell from "../Common/Modal/CardSell";

export default function PocketPlaceTitle() {
  const [showCardSell, setShowCardSell] = useState(false);

  const handleClickSell = () => {
    setShowCardSell(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_button}>
        <div>
          <h1 className={styles.title}>포켓플레이스</h1>
        </div>
        <div className={styles.button}>
          <button onClick={handleClickSell}>나의 포토카드 판매하기</button>
        </div>
      </div>
      <div className={styles.line}></div>
      {showCardSell && <CardSell />}
    </div>
  );
}
