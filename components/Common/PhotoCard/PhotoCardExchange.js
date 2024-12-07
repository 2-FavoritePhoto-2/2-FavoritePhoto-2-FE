import styles from "./PhotoCardExchange.module.css";
import Image from "next/image";
import Grade from "../Grade/Grade";
import axios from "@/lib/api/CommonApi.js";
import { useState } from "react";
import Notification from "../Modal/Notification";
import { getAccessToken } from "@/lib/utils/token";

export default function PhotoCardExchange({ data, type = "buyer" }) {
  const accessToken = typeof window !== "undefined" ? getAccessToken() : "";
  const buttonType = type === "seller";
  const [notificationModal, setNotificationModal] = useState(false);
  const [refuseModal, setRefuseModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);

  const toggleNotification = () => {
    setNotificationModal(!notificationModal);
  };
  const toggleRefuseModal = () => {
    setRefuseModal(!refuseModal);
  };
  const toggleApproveModal = () => {
    setApproveModal(!approveModal);
  };

  const handleCancelClick = async () => {
    await axios.delete(`/cards/exchange/${data.id}/cancel`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    window.location.reload();
  };

  const handleRefuse = async () => {
    await axios.delete(`/cards/exchange/${data.id}/refuse`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    window.location.reload();
  };

  const handleApprove = async () => {
    await axios.post(
      `/cards/exchange/${data.id}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    window.location.reload();
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.img_wrap}>
        <Image className={styles.img} src={data.buyerCard.image} fill alt="카드 이미지" priority />
      </div>
      <div className={styles.card_info}>
        <div className={styles.card_header}>
          <h1>{data.buyerCard.name}</h1>
          <div className={styles.meta_info}>
            <div className={styles.category}>
              <Grade grade={data.buyerCard.grade} />
              <p className={styles.vert_line}>|</p>
              {data.buyerCard.type.map((types, index) => (
                <p key={index} className={styles.type}>
                  {types}
                </p>
              ))}
            </div>
            <div className={styles.point_seller}>
              <p className={styles.bought}>
                <span className={styles.point}>{data.buyerCard.price} P</span> 에 구매
              </p>
              <p className={styles.seller}>{data.buyerCard.buyerNickname}</p>
            </div>
          </div>
        </div>
        <div className={styles.card_line}></div>
        <div className={styles.card_description}>
          <p>{data.description}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        {buttonType ? (
          <>
            <button className={styles.refuse} onClick={toggleRefuseModal}></button>
            <button className={styles.approve} onClick={toggleApproveModal}></button>
          </>
        ) : (
          <button className={styles.cancel} onClick={toggleNotification}>
            취소하기
          </button>
        )}
      </div>
      {notificationModal && (
        <Notification
          type="exchange_cancel"
          data={{ name: data.buyerCard.name, grade: data.buyerCard.grade }}
          onClose={toggleNotification}
          onButtonClick={handleCancelClick}
        />
      )}
      {refuseModal && (
        <Notification
          type="exchange_reject"
          data={{ name: data.buyerCard.name, grade: data.buyerCard.grade }}
          onClose={toggleRefuseModal}
          onButtonClick={handleRefuse}
        />
      )}
      {approveModal && (
        <Notification
          type="exchange_accept"
          data={{ name: data.buyerCard.name, grade: data.buyerCard.grade }}
          onClose={toggleApproveModal}
          onButtonClick={handleApprove}
        />
      )}
    </div>
  );
}
