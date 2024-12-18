import PhotoCard from "../Common/PhotoCard/PhotoCard";
import styles from "./MyShopList.module.css";

export default function MyShopList({ mySales = [], profile }) {
  return (
    <div className={styles.card_list}>
      {mySales.map((card, i) => (
        <div key={i}>
          <PhotoCard data={card} profile={profile} type="내판매카드" />
        </div>
      ))}
    </div>
  );
}
