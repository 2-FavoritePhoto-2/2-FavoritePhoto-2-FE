import { useState } from "react";
import styles from "./SelectCardExchange.module.css";
import PhotoCard from "../PhotoCard/PhotoCard";
import Input from "../Input/Input";

export default function SelectCardExchange({ data, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const slideCloseModal = () => {
    setIsSliding(true);
    setTimeout(() => {
      onClose();
      setIsOpen(false);
      setIsSliding(false);
    }, 300); // 애니메이션 시간과 일치시킴
  };

  if (!isOpen && !isSliding) return null;
  return (
    <>
      <div className={`${styles.container} ${isSliding ? styles.sliding : ""}`}>
        <div className={styles.modal_table}>
          <div className={styles.modal_content}>
            <div className={styles.mobile_header}>
              <img
                src="/assets/btn_backarrow.png"
                alt="backarrow"
                className={styles.backarrow}
                onClick={closeModal}
              />
              <img src="/assets/icon_photofont.png" alt="photofont" className={styles.photofont} />
            </div>
            <div className={styles.slidebar_table}>
              <img
                src="/assets/btn_crossbar.png"
                alt="slidebutton"
                className={styles.crossbutton}
                onClick={slideCloseModal}
              />
            </div>
            <div className={styles.photoexchange_table}>
              <img
                src="/assets/icon_photoexchange.png"
                alt="photoexchange"
                className={styles.photoexchange}
              />
              <img
                src="/assets/icon_close.svg"
                alt="close_button"
                className={styles.close_button}
                onClick={closeModal}
              />
            </div>
            <p className={styles.exchange_name}>{data.name}</p>
            <div className={styles.photocard_content}>
              <div className={styles.photocard_size}>
                <PhotoCard type="내카드" data={data ?? {}} exchange={true} />
              </div>
              <div className={styles.select_table}>
                <div className={styles.input_size}>
                  <Input
                    label="교환 제시 내용"
                    name="post"
                    type="textarea"
                    placeholder="내용을 입력해 주세요."
                    exchange={true}
                  />
                </div>
                <div className={styles.button_table}>
                  <button className={styles.button_cancel} onClick={closeModal}>
                    취소하기
                  </button>
                  <button className={styles.button_exchange}>교환하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
