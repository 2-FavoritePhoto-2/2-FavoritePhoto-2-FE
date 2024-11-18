import { useState } from "react";
import styles from "./CardSell.module.css";
import Image from "next/image";
import close from "@/public/assets/icon_close.svg";
import Dropdown from "../Input/Dropdown";

export default function CardSell() {
  const [selectedGrade, setSelectedGrade] = useState("");

  const grades = ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"];

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <Image src={close} width={32} height={32} alt="x 아이콘" />
        <div className={styles.card_info_wrapper}>
          <h1 className={styles.modal_title}>나의 포토카드 판매하기</h1>
          <div className={styles.card_title}>
            <h1>귀여운 피카츄</h1>
            <div className={styles.line}></div>
          </div>
          <div className={styles.card_info}>
            <div className={styles.img_wrap}>이미지영역</div>
            <div className={styles.card_meta_info}>세부 정보 카드 컴포넌트 영역</div>
          </div>
          <div className={styles.exchange_info}>
            <h1 className={styles.exchange_title}>교환 희망 정보</h1>
            <div className={styles.select_exchange_info}>
              <Dropdown
                label="등급"
                name="grade"
                value={selectedGrade}
                onChange={handleGradeChange}
                options={grades}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
