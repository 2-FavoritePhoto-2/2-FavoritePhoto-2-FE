import styles from "./SearchBar.module.css";
import Image from "next/image";
import icon_search from "@/public/assets/icon_search.svg";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <>
      <div className={styles.searchBar_container}>
        <input
          placeholder="검색"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.input_container}
          onKeyDown={handleKeyDown}
        />
        <Image src={icon_search} alt="검색아이콘" onClick={handleSearchClick} />
      </div>
    </>
  );
}
