import { useState } from "react";
import Quantity from "./Quantity";
import styles from "./QuantityCard.module.css";
import Notification from "../Modal/Notification";

export default function QuantityCardBuyer({ data }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [confirmPurchase, setConfirmPurchase] = useState(false);
  
  const card = data.card
  const gradeClass = card.grade;
  const modifiedString = gradeClass.replace(/_/g, " ");

  const isOpenModal = () => {
    setConfirmPurchase(true);
  };

  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  const closeModal = () => setConfirmPurchase(false);
  



  return (
    <>
      <div className={styles.card_details}>
        <div className={styles.card_details_header}>
          <div className={styles.card_rating_table}>
            <p className={`${styles.card_rating} ${styles[gradeClass]}`}>{modifiedString}</p>
            <p className={styles.card_attribute}>{card.type.join("/")}</p>
          </div>
          <p className={styles.card_writer}>{data.seller.nickname}</p>
        </div>
        <div className={styles.description_table}>{card.description}</div>
        <div className={styles.price_contain}>
          <div className={styles.price_table}>
            <p className={styles.price_name}>가격</p>
            <p className={styles.price}>{card.price} P</p>
          </div>
          <div className={styles.remaining_contain}>
            <p className={styles.remaining_name}>잔여</p>
            <div className={styles.remaining_table}>
              <p className={styles.quantity_int}>{selectedQuantity}</p>
              <p className={styles.remaining_card}>{`/ ${card.remainingQuantity}`}</p>
            </div>
          </div>
        </div>
        <div className={styles.trade_table}>
          <div className={styles.quantity_table}>
            <p className={styles.quantity_font}>구매수량</p>
            <Quantity onChange={handleQuantityChange} maxQuantity={card.remainingQuantity} />
          </div>
          <div className={styles.totalprice_contain}>
            <p className={styles.quantity_font}>총 가격</p>
            <div className={styles.totalprice_table}>
              <p className={styles.price}> {selectedQuantity * card.price} P</p>
              <p className={styles.price_name}>{`(${selectedQuantity}장)`}</p>
            </div>
          </div>
        </div>
        <button className={styles.photocard_button} onClick={isOpenModal}>
          포토카드 구매하기
        </button>
      </div>
      {confirmPurchase && <Notification type={"purchase"} onClose={closeModal} />}
    </>
  );
}
