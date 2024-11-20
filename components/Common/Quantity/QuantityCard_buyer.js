import { useState } from "react";
import Quantity from "./Quantity";
import styles from "./QuantityCard.module.css";

export default function QuantityCardBuyer() {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const maxQuantity = 5; //임의 max값 설정

  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  return (
    <div className={styles.card_details}>
      <div className={styles.card_details_header}>
        <div className={styles.card_rating_table}>
          <p className={styles.card_rating}>LEGENDARY</p>
          <p className={styles.card_attribute}>번개</p>
        </div>
        <p className={styles.card_writer}>한지우</p>
      </div>
      <div className={styles.description_table}>
        포켓몬스터 포토 카드 거래 예시 입니다.
        <br />
        지금 이공간은 description 공간입니다.
        <br />
        예시로 작성하는 상세 내용글 입니다.
      </div>
      <div className={styles.price_contain}>
        <div className={styles.price_table}>
          <p className={styles.price_name}>가격</p>
          <p className={styles.price}>4 P</p>
        </div>
        <div className={styles.remaining_contain}>
          <p className={styles.remaining_name}>잔여</p>
          <div className={styles.remaining_table}>
            <p className={styles.quantity_int}>{selectedQuantity}</p>
            <p className={styles.remaining_card}>{`/ ${maxQuantity}`}</p>
          </div>
        </div>
      </div>
      <div className={styles.trade_table}>
        <div className={styles.quantity_table}>
          <p className={styles.quantity_font}>구매수량</p>
          <Quantity onChange={handleQuantityChange} maxQuantity={maxQuantity} />
        </div>
        <div className={styles.totalprice_contain}>
          <p className={styles.quantity_font}>총 가격</p>
          <div className={styles.totalprice_table}>
            <p className={styles.price}> 8 P</p>
            <p className={styles.price_name}>{`(${selectedQuantity}장)`}</p>
          </div>
        </div>
      </div>
      <button className={styles.photocard_button}>포토카드 구매하기</button>
    </div>
  );
}
