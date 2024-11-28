import PocketPlaceTitle from "@/components/PocketPlace/PocketPlaceTitle";
import PocketPlaceFilter from "@/components/PocketPlace/PocketPlaceFilter";
import PocketPlaceList from "@/components/PocketPlace/PocketPlaceList";
import styles from "./pocketPlace.module.css";
import { useState } from "react";

export default function PocketPlace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState({
    type: null,
    value: null,
    orderBy: "priceLowest",
  });
  const [filterCounts, setFilterCounts] = useState({ grade: {}, type: {} });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilter((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleFilterCountChange = (counts) => {
    setFilterCounts(counts);
  };

  return (
    <>
      <div className={styles.pocketPlace_container}>
        <div className={styles.header}>
          <PocketPlaceTitle />
          <PocketPlaceFilter
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filterCounts={filterCounts}
          />
        </div>
        <PocketPlaceList
          searchTerm={searchTerm}
          activeFilter={activeFilter}
          onFilterCountChange={handleFilterCountChange}
          filterCounts={filterCounts}
        />
      </div>
    </>
  );
}
