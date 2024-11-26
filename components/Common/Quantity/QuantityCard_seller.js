import Image from "next/image";
import icon_exchange from "@/public/assets/icon_exchange.svg";
import styles from "./QuantityCard.module.css";

export default function QuantityCardSeller({ data }) {
  const card = data.card;
  const gradeClass = card.grade;
  const modifiedString = gradeClass.replace(/_/g, " ");
  const exchangeGrade = data.exchangeGrade;

  return (
    <div className={styles.card_details}>
      <div className={styles.card_details_header}>
        <div className={styles.card_rating_table}>
          <p className={`${styles.card_rating} ${styles[gradeClass]}`}>{modifiedString}</p>
          <p className={styles.card_attribute}>{card.type}</p>
        </div>
        <p className={styles.card_writer}>{data.seller.nickname}</p>
      </div>
      <div className={styles.description_table}>{card.description}</div>
      <div className={styles.price_container}>
        <div className={styles.price_table}>
          <p className={styles.price_name}>가격</p>
          <p className={styles.price}>{card.price} P</p>
        </div>
        <div className={styles.remaining_contain}>
          <p className={styles.remaining_name}>잔여</p>
          <div className={styles.remaining_table}>
            <p className={styles.quantity_int}>{card.remainingQuantity}</p>
            <p className={styles.remaining_card}>{`/ ${card.totalQuantity}`}</p>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.exchange_table}>
          <Image src={icon_exchange} alt="exchange" className={styles.icon_exchange} />
          <p className={styles.exchange_name}>교환 희망 정보</p>
        </div>
        <div className={styles.exchange_card_rating_table}>
          <p className={`${styles.card_rating} ${styles[exchangeGrade]}`}>{exchangeGrade}</p>
          <p className={styles.card_attribute}>{data.exchangeType}</p>
        </div>
      </div>
      <p className={styles.exchange_content}>{data.exchangeDetails}</p>
      <button className={styles.patch_button}>수정하기</button>
      <button className={styles.dont_sell_button}>판매 내리기</button>
    </div>
  );
}
