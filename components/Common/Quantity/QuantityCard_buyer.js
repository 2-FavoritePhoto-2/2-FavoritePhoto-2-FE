import { useState } from "react";
import Quantity from "./Quantity";
import styles from "./QuantityCard.module.css";
import Notification from "../Modal/Notification";
import axios from "@/lib/api/CommonApi.js";
import { useRouter } from "next/router";
import { getAccessToken } from "@/lib/utils/token";

export default function QuantityCardBuyer({ data }) {
  const accessToken = typeof window !== "undefined" ? getAccessToken() : "";
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [confirmPurchase, setConfirmPurchase] = useState(false);

  const router = useRouter();

  const response = data.card;
  const gradeClass = response.grade;
  const modifiedString = gradeClass.replace(/_/g, " ");

  const isOpenModal = () => {
    setConfirmPurchase(true);
  };

  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  const closeModal = () => setConfirmPurchase(false);

  const totalPrice = selectedQuantity * response.price;

  const handlePurchaseCard = async () => {
    const profile = await axios.get(`/user/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const myPoint = profile.data.point;

    if (myPoint > totalPrice && myPoint > 0) {
      await axios.post(
        `/shop/${data.id}/purchase`,
        {
          quantity: selectedQuantity,
          totalPrice: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      router.push({
        pathname: "/SuccessFail",
        query: {
          type: "purchase_success",
          name: data.card.name,
          quantity: selectedQuantity,
          grade: data.card.grade,
        },
      });
    } else {
      router.push({
        pathname: "/SuccessFail",
        query: {
          type: "purchase_fail",
          name: data.card.name,
          quantity: selectedQuantity,
          grade: data.card.grade,
        },
      });
    }
  };

  return (
    <>
      <div className={styles.card_details}>
        <div className={styles.card_details_header}>
          <div className={styles.card_rating_table}>
            <p className={`${styles.card_rating} ${styles[gradeClass]}`}>{modifiedString}</p>
            <p className={styles.card_attribute}>{response.type.join("ㅣ")}</p>
          </div>
          <p className={styles.card_writer}>{data.seller.nickname}</p>
        </div>
        <div className={styles.description_table}>{response.description}</div>
        <div className={styles.price_contain}>
          <div className={styles.price_table}>
            <p className={styles.price_name}>가격</p>
            <p className={styles.price}>{data.price} P</p>
          </div>
          <div className={styles.remaining_contain}>
            <p className={styles.remaining_name}>잔여</p>
            <div className={styles.remaining_table}>
              <p className={styles.quantity_int}>{data.remainingQuantity}</p>
              <p className={styles.remaining_card}>{`/ ${data.totalQuantity}`}</p>
            </div>
          </div>
        </div>
        <div className={styles.trade_table}>
          <div className={styles.quantity_table}>
            <p className={styles.quantity_font}>구매수량</p>
            <Quantity onChange={handleQuantityChange} maxQuantity={data.remainingQuantity} />
          </div>
          <div className={styles.totalprice_contain}>
            <p className={styles.quantity_font}>총 가격</p>
            <div className={styles.totalprice_table}>
              <p className={styles.price}> {totalPrice} P</p>
              <p className={styles.price_name}>{`(${selectedQuantity}장)`}</p>
            </div>
          </div>
        </div>
        <button className={styles.photocard_button} onClick={isOpenModal}>
          포토카드 구매하기
        </button>
      </div>
      {confirmPurchase && (
        <Notification
          type="purchase"
          data={{ name: data.card.name, grade: data.card.grade, quantity: selectedQuantity }}
          onClose={closeModal}
          onButtonClick={handlePurchaseCard}
        />
      )}
    </>
  );
}
