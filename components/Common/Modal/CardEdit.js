import { useEffect, useState } from "react";
import styles from "./CardEdit.module.css";
import Image from "next/image";
import Dropdown from "../Input/Dropdown";
import Input from "../Input/Input";
import axios from "@/lib/api/CommonApi.js";
import CardEditInfo from "../CardInfo/CardEditInfo";
import { getAccessToken } from "@/lib/utils/token";

const INITIAL_VALUES = {
  price: 0,
  totalQuantity: 1,
  remainingQuantity: 1,
  exchangeGrade: "",
  exchangeType: [],
  exchangeDetails: "",
};

export default function CardEdit({ data, onClose }) {
  const accessToken = typeof window !== "undefined" ? getAccessToken() : "";
  const [values, setValues] = useState(INITIAL_VALUES);
  const [remainingQuantity, setRemainingQuantity] = useState(data.remainingQuantity);
  const [totalQuantity, setTotalQuantity] = useState(data.totalQuantity);
  const [quantity, setQuantity] = useState(data.remainingQuantity); // 초기값 설정

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

  const handleQuantityChange = (newRemaining, newTotal) => {
    setValues((prevValues) => ({
      ...prevValues,
      remainingQuantity: newRemaining,
      totalQuantity: newTotal,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEditExchange = async () => {
    const exchangeType =
      values.exchangeType[0] && values.exchangeType[1]
        ? values.exchangeType
        : values.exchangeType[0]
          ? [values.exchangeType[0]]
          : undefined;
    const body = {
      ...(values.exchangeGrade && { exchangeGrade: values.exchangeGrade }), // 값이 존재할 때만 추가
      ...(exchangeType && { exchangeType }),
      ...(values.totalQuantity && { totalQuantity: values.totalQuantity }),
      ...(values.price && { price: Number(values.price) }),
      ...(values.exchangeDetails && { exchangeDetails: values.exchangeDetails }),
    };
    try {
      await axios.patch(`/shop/${data.id}`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("수정 실패:", error);
    }
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
        <CardEditInfo
          data={data}
          priceValue={values.price}
          onQuantityChange={handleQuantityChange}
          onPriceChange={handleChange}
          remainingQuantity={remainingQuantity}
          setRemainingQuantity={setRemainingQuantity}
          totalQuantity={totalQuantity}
          setTotalQuantity={setTotalQuantity}
          quantity={quantity}
          setQuantity={setQuantity}
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
              name="exchangeGrade"
              value={values.exchangeGrade}
              setValue={(e) =>
                setValues((prev) => ({
                  ...prev,
                  exchangeGrade: e,
                }))
              }
              option="등급"
            />
            <Dropdown
              label="속성 ①"
              name="exchangeType"
              value={values.exchangeType[0] || ""}
              setValue={(e) =>
                setValues((prev) => ({
                  ...prev,
                  exchangeType: [e, prev.exchangeType[1] || ""],
                }))
              }
              option="속성"
            />
            <Dropdown
              label="속성 ②"
              name="exchangeType"
              value={values.exchangeType[1] || ""}
              setValue={(e) =>
                setValues((prev) => ({
                  ...prev,
                  exchangeType: [prev.exchangeType[0] || "", e],
                }))
              }
              option="속성"
            />
          </div>
          <div className={styles.description}>
            <Input
              label="교환 희망 설명"
              type="textarea"
              name="exchangeDetails"
              value={values.exchangeDetails}
              onChange={handleChange}
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
