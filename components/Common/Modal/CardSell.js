import { useState } from "react";
import styles from "./CardSell.module.css";
import Image from "next/image";
import close from "@/public/assets/icon_close.svg";
import Dropdown from "../Input/Dropdown";
import Input from "../Input/Input";

export default function CardSell() {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedType1, setSelectedType1] = useState("");
  const [selectedType2, setSelectedType2] = useState("");
  const [exchange, setExchange] = useState("");

  const grades = ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"];
  const types = [
    "불꽃",
    "물",
    "풀",
    "전기",
    "얼음",
    "격투",
    "독",
    "땅",
    "비행",
    "에스퍼",
    "벌레",
    "바위",
    "고스트",
    "드래곤",
    "악",
    "강철",
    "페어리",
    "기타",
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <Image src={close} width={32} height={32} alt="x 아이콘" />
        <div className={styles.card_info_wrapper}>
          <h1 className={styles.modal_title}>나의 포토카드 판매하기</h1>
          <div className={styles.card_title}>
            <h1>귀여운 피카츄</h1>
            <div className={styles.bold_line} />
          </div>
          <div className={styles.card_info}>
            <div className={styles.img_wrap}>이미지영역</div>
            <div className={styles.card_meta_info}>세부 정보 카드 컴포넌트 영역</div>
          </div>
          <div className={styles.exchange_info}>
            <div className={styles.exchange_title}>
              <h1>교환 희망 정보</h1>
              <div className={styles.bold_line} />
            </div>
            <div className={styles.select_exchange_info}>
              <div className={styles.dropdown}>
                <Dropdown
                  label="등급"
                  name="grade"
                  value={selectedGrade}
                  setValue={setSelectedGrade}
                  options={grades}
                />
                <Dropdown
                  label="속성 ①"
                  name="attribute1"
                  value={selectedType1}
                  setValue={setSelectedType1}
                  options={types}
                />
                <Dropdown
                  label="속성 ② (선택)"
                  name="attribute2"
                  value={selectedType2}
                  setValue={setSelectedType2}
                  options={types}
                />
              </div>
              <Input
                label="교환 희망 설명"
                type="textarea"
                name="exchange"
                value={exchange}
                onChange={(e) => setExchange(e.target.value)}
                placeholder="설명을 입력해 주세요"
              />
            </div>
          </div>
          <div className={styles.thin_line}></div>
          <div className={styles.buttons}>
            <button className={styles.cancel}>취소하기</button>
            <button className={styles.sell}>판매하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
