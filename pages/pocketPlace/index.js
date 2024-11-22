import PocketPlaceTitle from "@/components/PocketPlace/PocketPlaceTitle";
import PocketPlaceFilter from "@/components/PocketPlace/PocketPlaceFilter";
import PocketPlaceList from "@/components/PocketPlace/PocketPlaceList";
import styles from "./pocketPlace.module.css";
import { useState } from "react";

export default function () {
  const [ratingFilter, setRatingFilter] = useState("");

  const handleRatingFilterChange = (value) => {
    setRatingFilter(value);
  };

  return (
    <>
      <div className={styles.pocketPlace_container}>
        <div className={styles.header}>
          <PocketPlaceTitle />
          <PocketPlaceFilter sortType={handleRatingFilterChange} />
        </div>
        <PocketPlaceList ratingFilter={ratingFilter} />
      </div>
    </>
  );
}
