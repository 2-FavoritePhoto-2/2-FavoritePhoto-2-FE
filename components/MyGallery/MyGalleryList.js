import styles from "./MyGalleryList.module.css";
import Link from "next/link";
import PhotoCard from "../Common/PhotoCard/PhotoCard";

export default function MyGalleryList({ myCardList = [] }) {
  return (
    <div className={styles.card_list}>
      {myCardList.map((card) => (
        <div key={card.id}>
          <Link href={`/myGallery/${card.id}`}>
            <PhotoCard data={card} type="내카드" />
          </Link>
        </div>
      ))}
    </div>
  );
}
