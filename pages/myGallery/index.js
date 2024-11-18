import styles from "@/styles/MyGallery.module.css";
import MyGalleryTitle from "@/components/MyGallery/MyGalleryTitle";
import MyOwnedCards from "@/components/MyGallery/MyOwnedCards";

export default function MyGallery() {
  return (
    <div>
      <MyGalleryTitle />
      <MyOwnedCards />
    </div>
  );
}
