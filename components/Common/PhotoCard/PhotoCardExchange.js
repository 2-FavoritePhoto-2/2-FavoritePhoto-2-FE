import styles from "./PhotoCardExchange.module.css";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import Grade from "../Grade/Grade";

export default function PhotoCardExchange({ data, type = "buyer" }) {
  const buttonType = type === "seller";

  return (
    <div className={styles.card_container}>
      <div className={styles.img_wrap}>
        <Image className={styles.img} src={logo} fill alt="카드 이미지" priority />
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_header}>
          <h1>{data.name}</h1>
          <div className={styles.meta_info}>
            <div className={styles.category}>
              <Grade grade={data.grade} />
              <p className={styles.vert_line}>|</p>
              <p className={styles.type}>{data.type[0]}</p>
              {data.type[1] ? (
                <>
                  <p className={styles.vert_line}>|</p>
                  <p>{data.type[1]}</p>
                </>
              ) : (
                ""
              )}
            </div>
            <div className={styles.point_seller}>
              <p className={styles.bought}>
                <span className={styles.point}>{data.price} P</span> 에 구매
              </p>
              <p className={styles.seller}>{data.seller.nickname}</p>
            </div>
          </div>
        </div>
        <div className={styles.card_line}></div>
        <div className={styles.card_description}>
          <p>{data.exchangeDetails}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        {buttonType ? (
          <>
            <button className={styles.refuse}></button>
            <button className={styles.approve}></button>
          </>
        ) : (
          <button className={styles.cancel}>취소하기</button>
        )}
      </div>
    </div>
  );
}
