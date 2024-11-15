import styles from "./SearchBar.module.css";
import Image from "next/image";
import icon_search from "@/public/assets/icon_search.svg";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    //todo: 클릭 후 필터되는 로직 작성하기
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
        />
        <Image src={icon_search} alt="검색아이콘" onClick={handleSearchClick} />
      </div>
    </>
  );
}
