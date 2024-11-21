import { useState } from "react";
import styles from "./MyCardDetail.module.css";
import Grade from "../Grade/Grade";
import Modal from "../Modal/Modal";
import CardList from "@/components/Common/Modal/CardList";
import CardSell from "@/components/Common/Modal/CardSell";

export default function MyCardDetail() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.category}>
          <Grade grade="SUPER RARE" detail={true} />
          <p>|</p>
          <p>전기</p>
          <p>|</p>
          <p>풀</p>
        </div>
        <p className={styles.seller}>판매자</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.description}>
        <p>아주 아주 귀여운 피카츄랍니다.</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.price_quantity}>
        <div className={styles.price}>
          <p className={styles.label}>가격</p>
          <p className={styles.value}>
            4 <span>P</span>
          </p>
        </div>
        <div className={styles.quantity}>
          <p className={styles.label}>보유량</p>
          <p className={styles.value}>5</p>
        </div>
      </div>
      <button className={styles.sell} onClick={handleClick}>
        포토카드 판매하기
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={handleClose}>
          <CardList />
        </Modal>
      )}
    </div>
  );
}
