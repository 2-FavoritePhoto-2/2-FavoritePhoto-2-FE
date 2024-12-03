import Link from "next/link";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import styles from "./MyGalleryList.module.css";

export default function MyGalleryList({ myCardList = [], profile }) {
  return (
    <div className={styles.card_list}>
      {myCardList.map((card) => (
        <div key={card.id}>
          <Link href={`/myGallery/${card.id}`}>
            <PhotoCard data={card} profile={profile} type="내카드" />
          </Link>
        </div>
      ))}
    </div>
  );
}
