import styles from "./MyGalleryList.module.css";
import PhotoCard from "../Common/PhotoCard/PhotoCard";
import data from "@/public/mockData.json";

export default function MyGalleryList() {
  const count = 30;

  return (
    <div className={styles.card_list}>
      {data.map((card) => (
        <div key={card.id}>
          <PhotoCard card={card} />
        </div>
      ))}
    </div>
  );
}
