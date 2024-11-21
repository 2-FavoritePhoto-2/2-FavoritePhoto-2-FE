import Image from "next/image";
import icon_exchange from "@/public/assets/icon_exchange.svg";
import styles from "./QuantityCard.module.css";

export default function QuantityCardSeller() {
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
      <div className={styles.price_container}>
        <div className={styles.price_table}>
          <p className={styles.price_name}>가격</p>
          <p className={styles.price}>4 P</p>
        </div>
        <div className={styles.remaining_contain}>
          <p className={styles.remaining_name}>잔여</p>
          <div className={styles.remaining_table}>
            <p className={styles.quantity_int}>2</p>
            <p className={styles.remaining_card}>{`/ 5`}</p>
          </div>
        </div>
      </div>
      <div >
        <div className={styles.exchange_table}>
          <Image src={icon_exchange} alt="exchange" className={styles.icon_exchange} />
          <p className={styles.exchange_name}>교환 희망 정보</p>
        </div>
        <div className={styles.exchange_card_rating_table}>
          <p className={styles.card_rating}>LEGENDARY</p>
          <p className={styles.card_attribute}>번개</p>
        </div>
      </div>
      <p className={styles.exchange_content}>교환 희망 정보에서의 content 입니다.</p>
      <button className={styles.patch_button}>수정하기</button>
      <button className={styles.dont_sell_button}>판매 내리기</button>
    </div>
  );
}
