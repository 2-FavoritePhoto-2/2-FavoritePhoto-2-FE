import PocketPlaceTitle from "@/components/PocketPlace/PocketPlaceTitle";
import PocketPlaceFilter from "@/components/PocketPlace/PocketPlaceFilter";
import PocketPlaceList from "@/components/PocketPlace/PocketPlaceList";
import styles from "./pocketPlace.module.css";
import { useState } from "react";

export default function PocketPlace() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <div className={styles.pocketPlace_container}>
        <div className={styles.header}>
          <PocketPlaceTitle />
          <PocketPlaceFilter onSearch={handleSearch} />
        </div>
        <PocketPlaceList searchTerm={searchTerm} />
      </div>
    </>
  );
}
