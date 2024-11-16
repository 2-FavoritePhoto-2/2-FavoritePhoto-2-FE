import Quantity from "@/components/Common/Quantity/Quantity";
import { useRouter } from "next/router";
import styles from "@/styles/cardDetail.module.css";
import { useState } from "react";

export default function () {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  return (
    <>
      <div className={styles.container}>
        <img src="/assets/icon_poketplace.png" className={styles.poketplace} />
        <div className={styles.title}>우리집 앞마당 {id}</div>
        <div className={styles.card_details_table}>
          <img src="/assets/defaultimg.png" className={styles.card_img} />
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
                  <p className={styles.remaining_card}>/5</p>
                </div>
              </div>
            </div>
            <div className={styles.quantity_table}>
              <p className={styles.quantity_font}>구매수량</p>
              <Quantity onChange={handleQuantityChange} />
            </div>
            <div>
              <p>총 가격</p>
              <p> 8 P</p>
              <p>{`(2장)`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
