import styles from "./Modal.module.css";
import Image from "next/image";
import close from "@/public/assets/icon_close.svg";

export default function Modal({ children }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <Image className={styles.close} src={close} width={32} height={32} alt="x 아이콘" />
        <div className={styles.tablet_mobile_close}></div>
        {children}
      </div>
    </div>
  );
}
