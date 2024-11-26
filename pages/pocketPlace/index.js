import PocketPlaceTitle from "@/components/PocketPlace/PocketPlaceTitle";
import PocketPlaceFilter from "@/components/PocketPlace/PocketPlaceFilter";
import PocketPlaceList from "@/components/PocketPlace/PocketPlaceList";
import styles from "./pocketPlace.module.css";
import { useState } from "react";

export default function PocketPlace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState({ type: null, value: null });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilter({ type: filterType, value });
  };

  return (
    <>
      <div className={styles.pocketPlace_container}>
        <div className={styles.header}>
          <PocketPlaceTitle />
          <PocketPlaceFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>
        <PocketPlaceList searchTerm={searchTerm} activeFilter={activeFilter} />
      </div>
    </>
  );
}
