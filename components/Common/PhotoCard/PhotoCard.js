import styles from "./PhotoCard.module.css";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import Grade from "../Grade/Grade";

export default function PhotoCard({ card, type = "quantity" }) {
  const selectType = type === "left";

  return (
    <div className={styles.card_container}>
      <div className={styles.img_wrap}>
        <Image className={styles.img} src={card.image} fill alt="카드 이미지" priority />
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_header}>
          <h1>{card.name}</h1>
          <div className={styles.meta_info}>
            <div className={styles.category}>
              <Grade grade={card.grade} />
              <p className={styles.vert_line}>|</p>
              <p className={styles.type}>{card.type[0]}</p>
            </div>
            <p className={styles.seller}>판매자</p>
          </div>
        </div>
        <div className={styles.card_line}></div>
        <div className={styles.card_price_quantity}>
          <div className={styles.card_price}>
            <p className={styles.label}>가격</p>
            <p className={styles.point}>{card.price}p</p>
          </div>
          <div className={styles.card_quantity}>
            {selectType ? (
              <p className={styles.label}>잔여</p>
            ) : (
              <p className={styles.label}>수량</p>
            )}
            <p className={styles.value}>
              <span>{card.remainingQuantity}</span>/{card.totalQuantity}
            </p>
          </div>
        </div>
      </div>
      <Image className={styles.logo} src={logo} width={99} height={18} alt="사이트 로고" priority />
    </div>
  );
}
