import { useState } from "react";
import styles from "./CardEdit.module.css";
import Image from "next/image";
import Dropdown from "../Input/Dropdown";
import Input from "../Input/Input";
import CardSellInfo from "../CardInfo/CardSellInfo";
import data from "@/public/mockData.json";

export default function CardEdit() {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedType1, setSelectedType1] = useState("");
  const [selectedType2, setSelectedType2] = useState("");
  const [exchange, setExchange] = useState("");

  return (
    <div className={styles.card_info_wrapper}>
      <h1 className={styles.modal_title}>수정하기</h1>
      <div className={styles.card_title}>
        <h1>{data[0].name}</h1>
        <div className={styles.bold_line} />
      </div>
      <div className={styles.card_info}>
        <div className={styles.img_wrap}>
          <Image className={styles.img} src={data[0].image} fill alt="카드 이미지" />
        </div>
        <CardSellInfo />
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
              option="등급"
            />
            <Dropdown
              label="속성 ①"
              name="attribute1"
              value={selectedType1}
              setValue={setSelectedType1}
              option="속성"
            />
            <Dropdown
              label="속성 ②"
              name="attribute2"
              value={selectedType2}
              setValue={setSelectedType2}
              option="속성"
            />
          </div>
          <div className={styles.description}>
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
      </div>
      <div className={styles.thin_line}></div>
      <div className={styles.buttons}>
        <button className={styles.cancel}>취소하기</button>
        <button className={styles.edit}>수정하기</button>
      </div>
    </div>
  );
}
