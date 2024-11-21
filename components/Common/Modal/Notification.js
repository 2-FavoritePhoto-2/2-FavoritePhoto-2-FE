import styles from "./Notification.module.css";
import Image from "next/image";
import icon_close from "@/public/assets/icon_close.svg";
import { useState } from "react";

export default function Notification({ type, onButtonClick, onClose, data }) {
  const [isOpen, setIsOpen] = useState(true);

  /*TODO
   * data props 받아서 description 바꾸기
   */
  const notificationContent = {
    login: {
      title: "로그인이 필요합니다.",
      description: "로그인하시겠습니까?\n다양한 서비스를 편리하게 이용하실 수 있습니다.",
      buttonText: "확인",
    },
    purchase: {
      title: "포토카드 구매",
      description: `장을 구매하시겠습니까?`,
      // description: `[${data.rate} | ${data.title}] ${data.count}장을 구매하시겠습니까?`,
      buttonText: "구매하기",
    },
    exchange_cancel: {
      title: "교환 제시 취소",
      description: ` 교환 제시를 취소하시겠습니까?`,

      // description: `[${data.rate} | ${data.title}] 교환 제시를 취소하시겠습니까?`,
      buttonText: "취소하기",
    },
    exchange_reject: {
      title: "교환 제시 거절",
      description: ` 카드와의 교환을 거절하시겠습니까?`,

      // description: `[${data.rate} | ${data.title}] 카드와의 교환을 거절하시겠습니까?`,
      buttonText: "거절하기",
    },
    exchange_accept: {
      title: "교환 제시 승인",
      description: `카드와의 교환을 승인하시겠습니까?`,

      // description: `[${data.rate} | ${data.title}] 카드와의 교환을 승인하시겠습니까?`,
      buttonText: "승인하기",
    },
    sale_stop: {
      title: "포토카드 판매 내리기",
      description: "정말로 판매를 중단하시겠습니까?",
      buttonText: "판매 내리기",
    },
  };

  const content = notificationContent[type];

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.alert_container}>
        <div className={styles.closeIcon_wrapper} onClick={onClose}>
          <Image src={icon_close} alt="닫기" />
        </div>
        <div className={styles.alert_wrapper}>
          <div className={styles.alert_title}>{content.title}</div>
          <div className={styles.alert_description}>{content.description}</div>
          <button className={styles.alert_button} onClick={onButtonClick}>
            {content.buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
