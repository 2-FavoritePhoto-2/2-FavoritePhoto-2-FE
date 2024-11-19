import styles from "./PhotoCardExchange.module.css";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import Grade from "../Grade/Grade";

export default function PhotoCardExchange() {
  const division = "seller";
  const buttonType = division === "seller";

  return (
    <div className={styles.card_container}>
      <div className={styles.img_wrap}>
        <Image src={logo} fill alt="카드 이미지" priority />
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_header}>
          <h1>정말 귀여운 피카츄</h1>
          <div className={styles.meta_info}>
            <div className={styles.category}>
              <Grade grade="LEGENDARY" />
              <p className={styles.vert_line}>|</p>
              <p className={styles.type}>전기</p>
              <p className={styles.vert_line}>|</p>
            </div>
            <div className={styles.point_seller}>
              <p className={styles.bought}>
                <span className={styles.point}>4 P</span> 에 구매
              </p>
              <p className={styles.seller}>판매자</p>
            </div>
          </div>
        </div>
        <div className={styles.card_line}></div>
        <div className={styles.card_description}>
          <p>아주 귀여운 피카츄군요, 가지고 싶습니다.</p>
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
