import { useRouter } from "next/router";
import styles from "@/styles/cardDetail.module.css";
import QuantityCardBuyer from "@/components/Common/Quantity/QuantityCard_buyer";

//구매자 기준 상세페이지
export default function CardDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className={styles.details_container}>
        <img src="/assets/icon_poketplace.png" className={styles.poketplace} />
        <div className={styles.title}>우리집 앞마당 {id}</div>
        <div className={styles.card_details_table}>
          <img src="/assets/defaultimg.png" className={styles.card_img} />
          <QuantityCardBuyer />
        </div>
        <div className={styles.exchange_container}>
          <div className={styles.exchange_table}>
            <p className={styles.exchange_name}>교환 희망 정보</p>
            <button className={styles.exchange_button}>포토카드 교환하기</button>
          </div>
          <p className={styles.exchange_content}>교환 희망 정보에서의 content 입니다.</p>
          <div className={styles.exchange_card_rating_table}>
            <p className={styles.card_rating}>RARE</p>
            <p className={styles.card_attribute}>불</p>
          </div>
        </div>
      </div>
    </>
  );
}
