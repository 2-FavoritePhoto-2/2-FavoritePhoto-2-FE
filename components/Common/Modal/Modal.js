import { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import Image from "next/image";
import close from "@/public/assets/icon_close.svg";

export default function Modal({ children, isOpen, closeModal }) {
  const [animationClass, setAnimationClass] = useState(styles.modalUp);

  useEffect(() => {
    if (!isOpen) {
      setAnimationClass(styles.modalDown);
    } else {
      setAnimationClass(styles.modalUp);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isOpen) {
      setAnimationClass(styles.modalDown);
    } else {
      closeModal();
    }
  };

  const handleAnimationEnd = () => {
    if (animationClass === styles.modalDown) {
      closeModal();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.container} ${animationClass}`} onAnimationEnd={handleAnimationEnd}>
        <div className={styles.close}>
          <Image src={close} width={32} height={32} onClick={handleClose} alt="x 아이콘" />
        </div>
        <div className={styles.close_wrap}>
          <div className={styles.tablet_mobile_close} onClick={handleClose}></div>
        </div>
        {children}
      </div>
    </div>
  );
}
