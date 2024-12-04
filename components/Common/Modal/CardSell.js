import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./CardSell.module.css";
import Image from "next/image";
import Dropdown from "../Input/Dropdown";
import Input from "../Input/Input";
import CardSellInfo from "../CardInfo/CardSellInfo";
import { createCardSale } from "@/lib/api/ShopService";

export default function CardSell({ data, closeModal }) {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedType1, setSelectedType1] = useState("");
  const [selectedType2, setSelectedType2] = useState("");
  const [exchange, setExchange] = useState("");
  const [point, setPoint] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const router = useRouter();

  const handlePointChange = (value) => {
    setPoint(value);
  };

  const handleSellClick = async () => {
    try {
      if (!selectedGrade) {
        alert("등급을 선택해주세요.");
        return;
      }
      if (!point || isNaN(Number(point))) {
        alert("가격을 입력해주세요.");
        return;
      }
      if (!selectedQuantity || selectedQuantity < 1) {
        alert("수량을 선택해주세요.");
        return;
      }

      const exchangeTypes = [selectedType1];
      if (selectedType2) {
        exchangeTypes.push(selectedType2);
      }

      const saleData = {
        price: Number(point),
        quantity: parseInt(selectedQuantity),
        exchangeGrade: selectedGrade,
        exchangeType: exchangeTypes,
        exchangeDetails: exchange || "",
        cardId: data.id
      };

      await createCardSale(saleData);

      router.push({
        pathname: "/SuccessFail",
        query: {
          type: "register_success",
          rate: selectedGrade,
          title: data.name,
          count: selectedQuantity
        },
      });
    } catch (error) {
      console.error(error.response?.data || error);
      router.push({
        pathname: "/SuccessFail",
        query: {
          type: "register_fail",
          data: {
            rate: selectedGrade,
            title: data.name,
            count: selectedQuantity
          }
        },
      });
    }
  };

  return (
    <div className={styles.card_info_wrapper}>
      <h1 className={styles.modal_title}>나의 포토카드 판매하기</h1>
      <div className={styles.card_title}>
        <h1>{data.name}</h1>
        <div className={styles.bold_line} />
      </div>
      <div className={styles.card_info}>
        <div className={styles.img_wrap}>
          <Image className={styles.img} src={data.image} fill alt="카드 이미지" />
        </div>
        <CardSellInfo
          data={data}
          point={point}
          setPoint={handlePointChange}
          selectedQuantity={selectedQuantity}
          setSelectedQuantity={setSelectedQuantity}
        />
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
        <button className={styles.cancel} onClick={closeModal}>
          취소하기
        </button>
        <button className={styles.sell} onClick={handleSellClick}>
          판매하기
        </button>
      </div>
    </div>
  );
}
