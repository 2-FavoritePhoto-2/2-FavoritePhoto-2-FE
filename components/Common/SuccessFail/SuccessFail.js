import styles from "./SuccessFail.module.css";
import Image from "next/image";
import icon_close from "@/public/assets/icon_close.svg";
import icon_back from "@/public/assets/icon_back.svg";
import { useState } from "react";

export default function SuccessFail({ type, onButtonClick, data }) {
  const [isOpen, setIsOpen] = useState(true);

  const SuccessFailContent = {
    register_success: {
      title: "판매 등록",
      status: "성공",
      description: "판매 등록에 성공했습니다!",
      //   description: `[${data.rate} | ${data.title}] ${data.count}장\n 판매 등록에 성공했습니다!`,
      buttonText: "나의 판매 포토카드에서 확인하기",
    },
    register_fail: {
      title: "판매 등록",
      status: "실패",
      description: "판매 등록에 실패했습니다.",
      //   description: `[${data.rate} | ${data.title}] ${data.count}장\n 판매 등록에 실패했습니다.`,
      buttonText: "포켓플레이스로 돌아가기",
    },
    purchase_success: {
      title: "구매",
      status: "성공",
      description: "장 구매에 성공했습니다!",
      //   description: `[${data.rate} | ${data.title}] ${data.count}장\n 구매에 성공했습니다!`,
      buttonText: "마이갤러리에서 확인하기",
    },
    purchase_fail: {
      title: "구매",
      status: "실패",
      description: "장 구매에 실패했습니다.",
      //   description: `[${data.rate} | ${data.title}] ${data.count}장\n 구매에 실패했습니다.`,
      buttonText: "포켓플레이스로 돌아가기",
    },
    exchange_success: {
      title: "교환 제시",
      status: "성공",
      description: "포토카드 교환 제시에 성공했습니다!",
      buttonText: "나의 판매 포토카드에서 확인하기",
    },
    exchange_fail: {
      title: "교환 제시",
      status: "실패",
      description: "포토카드 교환 제시에 실패했습니다.",
      buttonText: "포켓플레이스로 돌아가기",
    },
    create_success: {
      title: "포토카드 생성",
      status: "성공",
      description: "포토카드 생성에 성공했습니다!",
      // description: `[${data.rate} | ${data.title}]\n 포토카드 생성에 성공했습니다!`,
      buttonText: "마이갤러리에서 확인하기",
    },
    create_fail: {
      title: "포토카드 생성",
      status: "실패",
      description: "포토카드 생성에 실패했습니다.",
      //   description: `[${data.rate} | ${data.title}]\n 포토카드 생성에 실패했습니다.`,
      buttonText: "마이갤러리로 돌아가기",
    },
  };

  const content = SuccessFailContent[type];

  const closeModal = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay}></div>
      <Image src={icon_back} alt="닫기" className={styles.closeIcon_back} onClick={closeModal} />
      <div className={styles.successFail_container}>
        <div className={styles.closeIcon_wrapper} onClick={closeModal}>
          <Image src={icon_close} alt="닫기" className={styles.closeIcon_x} />
        </div>
        <div className={styles.successFail_wrapper}>
          <div className={styles.successFail_title}>
            <div className={styles.transaction_wrapper}>{content.title}</div>
            <div
              className={`${styles.status_wrapper} ${
                content.status === "실패" ? styles.status_fail : styles.status_success
              }`}
            >
              {content.status}
            </div>
          </div>
          <div className={styles.successFail_description}>{content.description}</div>
          <button className={styles.successFail_button} onClick={onButtonClick}>
            {content.buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
