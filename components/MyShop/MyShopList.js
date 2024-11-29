import styles from "./MyShopList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";

export default function MyShopList({ mySales = [] }) {
  return (
    <div className={styles.card_list}>
      {mySales.map((card, i) => (
        <div key={i}>
          <PhotoCard data={card} type="내카드" />
        </div>
      ))}
    </div>
  );
}
