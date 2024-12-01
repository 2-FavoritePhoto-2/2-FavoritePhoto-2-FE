import { useEffect, useState } from "react";
import styles from "./CardEdit.module.css";
import Image from "next/image";
import Dropdown from "../Input/Dropdown";
import Input from "../Input/Input";
import CardSellInfo from "../CardInfo/CardSellInfo";
import axios from "@/lib/api/api.js";

const INITIAL_VALUES = {
  price: 0,
  totalQuantity: 1,
  remainingQuantity: 1,
  exchangeGrade: "",
  exchangeType: "",//배열로 변경예정
  exchangeDetails: "",
};

export default function CardEdit({ data, onClose }) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  const [values, setValues] = useState(INITIAL_VALUES);
  // const [selectedGrade, setSelectedGrade] = useState("");
  // const [selectedType1, setSelectedType1] = useState("");
  // const [selectedType2, setSelectedType2] = useState("");
  // const [exchange, setExchange] = useState("");
  // const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [price, setPrice] = useState(0);


useEffect(() => {
    const fetchProductItem = async () => {
      try {
        const response = await axios.get(`/shop/${data.id}`); // 상품 정보 가져오기
        const product = response.data;
        setValues({
          price: product.price,
          totalQuantity: product.totalQuantity,
          remainingQuantity: product.remainingQuantity,
          exchangeGrade: product.exchangeGrade,
          exchangeType: product.exchangeType,
          exchangeDetails: product.exchangeDetails,
        });
      } catch (error) {
  
        console.error("상품 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchProductItem();
  }, [data.id]); // id가 변경될 때마다 이펙트 실행

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEditExchange = async () => {
    const body = {
      ...(selectedGrade && { exchangeGrade: selectedGrade }),
      ...(selectedType1 && { exchangeType: selectedType1 }),
      ...(selectedType2 && { selectedType2 }),
      ...(selectedQuantity && { totalQuantity: selectedQuantity }),
      ...(price && { price }),
      ...(exchange && { exchangeDetails: exchange }),
    };

    await axios.patch(`/shop/${data.id}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <div className={styles.card_info_wrapper}>
      <h1 className={styles.modal_title}>수정하기</h1>
      <div className={styles.card_title}>
        <h1>{data.card.name}</h1>
        <div className={styles.bold_line} />
      </div>
      <div className={styles.card_info}>
        <div className={styles.img_wrap}>
          <Image className={styles.img} src={data.card.image} fill alt="카드 이미지" />
        </div>
        <CardSellInfo data={data} setSelectedQuantity={setSelectedQuantity} setPrice={setPrice} />
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
              value={values.exchangeGrade}
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
        <button className={styles.cancel} onClick={onClose}>
          취소하기
        </button>
        <button className={styles.edit} onClick={handleEditExchange}>
          수정하기
        </button>
      </div>
    </div>
  );
}
