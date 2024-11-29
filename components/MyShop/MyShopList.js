import styles from "./MyShopList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";

export default function MyShopList({ data }) {
  return (
    <div className={styles.card_list}>
      {data.map((card) => (
        <div key={card.id}>
          <PhotoCard data={card} type="내카드" />
        </div>
      ))}
    </div>
  );
}
