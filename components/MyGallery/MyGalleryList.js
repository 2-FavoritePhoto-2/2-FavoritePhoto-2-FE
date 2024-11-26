import styles from "./MyGalleryList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";

export default function MyGalleryList({ myCardList = [] }) {
  return (
    <div className={styles.card_list}>
      {myCardList.map((card) => (
        <div key={card.id}>
          <PhotoCard data={card} type="내카드" />
        </div>
      ))}
    </div>
  );
}
