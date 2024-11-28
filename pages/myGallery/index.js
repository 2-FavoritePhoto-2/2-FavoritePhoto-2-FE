import styles from "@/styles/MyGallery.module.css";
import MyGalleryTitle from "@/components/MyGallery/MyGalleryTitle";
import MyOwnedCards from "@/components/MyGallery/MyOwnedCards";
import MyGalleryFilter from "@/components/MyGallery/MyGalleryFilter";
import MyGalleryList from "@/components/MyGallery/MyGalleryList";
import { getMyPhotoCardList } from "@/lib/api/UserService";

export async function getServerSideProps() {
  try {
    const myCardList = await getMyPhotoCardList({ page: 1, pageSize: 6, filter: "", keyword: "" });

    return {
      props: {
        myCardList,
      },
    };
  } catch (err) {
    console.error("데이터를 불러오는 중 문제가 발생하였습니다.", err);
    throw new Error("서버에서 데이터를 가져오는 중 문제가 발생했습니다." + err.message);
  }
}

export default function MyGallery({ myCardList }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MyGalleryTitle />
        <MyOwnedCards />
        <MyGalleryFilter />
      </div>
      <MyGalleryList myCardList={myCardList.card || []} />
    </div>
  );
}
