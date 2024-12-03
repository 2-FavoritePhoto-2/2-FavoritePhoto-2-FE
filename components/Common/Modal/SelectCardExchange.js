import { useState } from "react";
import styles from "./SelectCardExchange.module.css";
import PhotoCard from "../PhotoCard/PhotoCard";
import Input from "../Input/Input";
import axios from "@/lib/api/api.js";
import { useRouter } from "next/router";

export default function SelectCardExchange({ data, profile, shopId, onClose }) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  const handleSubmitExchange = async () => {
    try {
      const requestData = {
        buyerCardId: data.id,
        description: inputValue,
      };

      await axios.post(`/cards/${shopId}/exchange`, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      router.push({
        pathname: "/SuccessFail",
        query: {
          type: "exchange_success",
        },
      });
    } catch (error) {
      router.push({
        pathname: "/SuccessFail",
        query: {
          type: "exchange_fail",
        },
      });
      console.error(
        "교환 요청 중 오류 발생:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <>
      <div className={styles.modal_content}>
        <p className={styles.exchange_name}>{data.name}</p>
        <div className={styles.photocard_content}>
          <div className={styles.photocard_size}>
            <PhotoCard type="내카드" profile={profile} data={data ?? {}} exchange={true} />
          </div>
          <div className={styles.select_table}>
            <div className={styles.input_size}>
              <Input
                label="교환 제시 내용"
                value={inputValue}
                onChange={handleChange}
                name="post"
                type="textarea"
                placeholder="내용을 입력해 주세요."
                exchange={true}
              />
            </div>
            <div className={styles.button_table}>
              <button className={styles.button_cancel} onClick={onClose}>
                취소하기
              </button>
              <button className={styles.button_exchange} onClick={handleSubmitExchange}>
                교환하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
