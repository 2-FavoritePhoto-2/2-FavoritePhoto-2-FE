import styles from "./PhotoCardExchange.module.css";
import Image from "next/image";
import Grade from "../Grade/Grade";
import axios from "@/lib/api/api.js";


export default function PhotoCardExchange({ data, type = "buyer" }) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  const buttonType = type === "seller";

  const handleCancelClick = async () => {
    const res = await axios.delete(`/cards/exchange/${data.id}/cancel`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.img_wrap}>
        <Image className={styles.img} src={data.buyerCard.image} fill alt="카드 이미지" priority />
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_header}>
          <h1>{data.buyerCard.name}</h1>
          <div className={styles.meta_info}>
            <div className={styles.category}>
              <Grade grade={data.buyerCard.grade} />
              <p className={styles.vert_line}>|</p>
              {data.buyerCard.type.map((types) => (
                <p className={styles.type}>{types}</p>
              ))}
            </div>
            <div className={styles.point_seller}>
              <p className={styles.bought}>
                <span className={styles.point}>{data.buyerCard.price} P</span> 에 구매
              </p>
              <p className={styles.seller}>{data.buyerCard.buyerNickname}</p>
            </div>
          </div>
        </div>
        <div className={styles.card_line}></div>
        <div className={styles.card_description}>
          <p>{data.description}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        {buttonType ? (
          <>
            <button className={styles.refuse}></button>
            <button className={styles.approve}></button>
          </>
        ) : (
          <button className={styles.cancel} onClick={handleCancelClick}>
            취소하기
          </button>
        )}
      </div>
    </div>
  );
}
