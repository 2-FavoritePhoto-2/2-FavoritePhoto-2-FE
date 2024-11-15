import styles from "./Notification.module.css";
import Image from "next/image";
import icon_close from "@/public/assets/icon_close.svg";

export default function Notification() {
  return (
    <>
      <div className={styles.alert_container}>
        <div className={styles.closeIcon_wrapper}>
          <Image src={icon_close} alt="닫기" />
        </div>
        <div className={styles.alert_wrapper}>
          <div className={styles.alert_title}>로그인이 필요합니다.</div>
          <div className={styles.alert_description}>
            로그인하시겠습니까? 다양한 서비스를 편리하게 이용하실 수 있습니다.
          </div>
          <button className={styles.alert_button}>확인</button>
        </div>
      </div>
    </>
  );
}
