import Quantity from "@/components/Common/Quantity/Quantity";
import { useRouter } from "next/router";
import styles from "@/styles/cardDetail.module.css";
import { useState } from "react";

//구매자 기준 상세페이지
export default function () {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  const maxQuantity = 5; //임의 max값 설정

  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  return (
    <>
      <div className={styles.details_container}>
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
        </div>
        <div className={styles.compare_table}>
          <p className={styles.compare_name}>교환 희망 정보</p>
          <button className={styles.compare_button}>포토카드 교환하기</button>
        </div>
        <p className={styles.compare_content}>교환 희망 정보에서의 content 입니다.</p>
        <div className={styles.card_rating_table}>
          <p className={styles.card_rating}>RARE</p>
          <p className={styles.card_attribute}>불</p>
        </div>
      </div>
    </>
  );
}
