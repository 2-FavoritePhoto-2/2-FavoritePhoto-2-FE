import styles from "./PhotoCard.module.css";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import soldout from "@/public/assets/soldout.svg";
import Grade from "../Grade/Grade";

export default function PhotoCard({ data, profile, type = "판매카드", exchange }) {
  const exchangeHeaderClass = exchange ? styles.exchange_header : "";
  const exchangeClass = exchange ? styles.exchange : "";
  const exchangeValueClass = exchange ? styles.exchange_value : "";
  const exchangeImgClass = exchange ? styles.exchange_img : "";
  const exchangeLogoClass = exchange ? styles.exchange_logo : "";

  if (!data || !data.type) {
    return null;
  }

  const cardType =
    type === "내판매카드" ? (
      <>
        {data.quantity === 0 ? (
          <div className={styles.soldout}>
            <Image className={styles.img} src={data.image} fill alt="카드 이미지" priority />
            <Image className={styles.soldout_icon} src={soldout} alt="soldout 아이콘" />
          </div>
        ) : (
          <div className={styles.img_wrap}>
            <div
              className={`${styles.badge} ${
                data.mode === "shop" ? styles.shop_badge : styles.exchange_badge
              }`}
            >
              <p>{data.mode === "shop" ? "판매 중" : "교환 제시 대기 중"}</p>
            </div>
            <Image className={styles.img} src={data.image} fill alt="카드 이미지" priority />
          </div>
        )}
        <div className={styles.card_info}>
          <div className={styles.card_header}>
            <h1>{data.cardName}</h1>
            <div className={styles.meta_info}>
              <div className={styles.category}>
                <Grade grade={data.grade} />
                <p className={`${styles.vert_line}`}>|</p>
                <p className={`${styles.type}`}>{data.type[0]}</p>
                {data.type[1] ? (
                  <>
                    <p className={`${styles.vert_line}`}>|</p>
                    <p className={`${styles.type}`}>{data.type[1]}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
              <p className={`${styles.seller}`}>{profile.nickname}</p>
            </div>
          </div>
          <div className={styles.card_line}></div>
          <div className={styles.card_price_quantity}>
            <div className={styles.card_price}>
              <p className={`${styles.label}`}>가격</p>
              <p className={`${styles.point}`}>{data.price}p</p>
            </div>
            <div className={styles.card_quantity}>
              <p className={`${styles.label}`}>수량</p>
              <p className={`${styles.value}`}>{data.quantity}</p>
            </div>
          </div>
        </div>
      </>
    ) : type === "내카드" ? (
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
              <p className={`${styles.seller} ${exchangeClass}`}>{profile.nickname}</p>
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
        {data.card.remainingQuantity === 0 ? (
          <div className={styles.soldout}>
            <Image className={styles.img} src={data.card.image} fill alt="카드 이미지" priority />
            <Image className={styles.soldout_icon} src={soldout} alt="soldout 아이콘" />
          </div>
        ) : (
          <div className={styles.img_wrap}>
            <Image className={styles.img} src={data.card.image} fill alt="카드 이미지" priority />
          </div>
        )}
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
