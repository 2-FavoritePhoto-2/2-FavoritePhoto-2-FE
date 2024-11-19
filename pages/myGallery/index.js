import styles from "@/styles/MyGallery.module.css";
import MyGalleryTitle from "@/components/MyGallery/MyGalleryTitle";
import MyOwnedCards from "@/components/MyGallery/MyOwnedCards";
import MyGalleryFilter from "@/components/MyGallery/MyGalleryFilter";
import MyGalleryList from "@/components/MyGallery/MyGalleryList";
import CardList from "@/components/Common/Modal/CardList";

export default function MyGallery() {
  return (
    <div className={styles.container}>
      <CardList />
      <div className={styles.header}>
        <MyGalleryTitle />
        <MyOwnedCards />
        <MyGalleryFilter />
      </div>
      <MyGalleryList />
    </div>
  );
}
