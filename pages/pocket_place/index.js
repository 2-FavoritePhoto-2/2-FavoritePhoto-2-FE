import PocketPlaceTitle from "@/components/PocketPlace/PocketPlaceTitle";
import PocketPlaceFilter from "@/components/PocketPlace/PocketPlaceFilter";
import PocketPlaceList from "@/components/PocketPlace/PocketPlaceList";
import styles from "./pocketPlace.module.css";

export default function () {
  return (
    <>
      <div className={styles.pocketPlace_container}>
        <div className={styles.header}>
          <PocketPlaceTitle />
          <PocketPlaceFilter />
        </div>
        <PocketPlaceList />
      </div>
    </>
  );
}
