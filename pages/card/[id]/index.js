import Quantity from "@/components/Common/Quantity/Quantity";
import { useRouter } from "next/router";
import styles from "@/styles/cardDetail.module.css";

export default function () {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className={styles.container}>
        <img src="/assets/icon_poketplace.png" className={styles.poketplace} />
        <div className={styles.title}>우리집 앞마당 {id}</div>
        <div className={styles.card_details_table}>
          <img src="/assets/defaultimg.png" className={styles.card_img} />
          <div className={styles.card_details}>
            <div className={styles.card_details_header}>
              <div className={styles.card_rating_table}>
                <p className={styles.card_rating}>LEGENDARY</p>
                <p className={styles.card_attribute}>번개</p>
              </div>
              <p className={styles.card_writer}>한지우</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
