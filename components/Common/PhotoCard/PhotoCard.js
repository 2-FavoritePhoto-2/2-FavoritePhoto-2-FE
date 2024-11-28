import styles from "./PhotoCard.module.css";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import Grade from "../Grade/Grade";

export default function PhotoCard({ data, type = "판매카드", exchange }) {
  const exchangeHeaderClass = exchange ? styles.exchange_header : "";
  const exchangeClass = exchange ? styles.exchange : "";
  const exchangeValueClass = exchange ? styles.exchange_value : "";
  const exchangeImgClass = exchange ? styles.exchange_img : "";
  const exchangeLogoClass = exchange ? styles.exchange_logo : "";

  const cardType =
    type === "내카드" ? (
      <>
        <div className={`${styles.img_wrap} ${exchangeImgClass}`}>
          <Image className={styles.img} src={data.image} fill alt="카드 이미지" priority />
        </div>
        <div className={styles.card_info}>
          <div className={styles.card_header}>
            <h1 className={exchangeHeaderClass}>{data.name}</h1>
            <div className={styles.meta_info}>
              <div className={styles.category}>
                <Grade className={exchangeClass} grade={data.grade} />
                <p className={`${styles.vert_line} ${exchangeClass}`}>|</p>
                <p className={`${styles.type} ${exchangeClass}`}>{data.type[0]}</p>
                {data.type[1] ? (
                  <>
                    <p className={`${styles.vert_line} ${exchangeClass}`}>|</p>
                    <p className={`${styles.type} ${exchangeClass}`}>{data.type[1]}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
              {/* 수정필요 */}
              <p className={`${styles.seller} ${exchangeClass}`}>판매자</p>
            </div>
          </div>
          <div className={styles.card_line}></div>
          <div className={styles.card_price_quantity}>
            <div className={styles.card_price}>
              <p className={`${styles.label} ${exchangeClass}`}>가격</p>
              <p className={`${styles.point} ${exchangeValueClass}`}>{data.price}p</p>
            </div>
            <div className={styles.card_quantity}>
              <p className={`${styles.label} ${exchangeClass}`}>수량</p>
              <p className={`${styles.value} ${exchangeValueClass}`}>{data.quantity}</p>
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className={styles.img_wrap}>
          <Image className={styles.img} src={data.card.image} fill alt="카드 이미지" priority />
        </div>
        <div className={styles.card_info}>
          <div className={styles.card_header}>
            <h1>{data.card.name}</h1>
            <div className={styles.meta_info}>
              <div className={styles.category}>
                <Grade grade={data.card.grade} />
                <p className={styles.vert_line}>|</p>
                <p className={styles.type}>{data.card.type[0]}</p>
                {data.card.type[1] ? (
                  <>
                    <p className={styles.vert_line}>|</p>
                    <p>{data.card.type[1]}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
              <p className={styles.seller}>{data.seller.nickname}</p>
            </div>
          </div>
          <div className={styles.card_line}></div>
          <div className={styles.card_price_quantity}>
            <div className={styles.card_price}>
              <p className={styles.label}>가격</p>
              <p className={styles.point}>{data.card.price}p</p>
            </div>
            <div className={styles.card_quantity}>
              <p className={styles.label}>잔여</p>
              <p className={styles.value}>
                {data.remainingQuantity}
                <span>/{data.totalQuantity}</span>
              </p>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div className={styles.card_container}>
      {cardType}
      <div className={styles.logo_wrap}>
        <Image
          className={`${styles.logo} ${exchangeLogoClass}`}
          src={logo}
          fill
          alt="사이트 로고"
        />
      </div>
    </div>
  );
}
