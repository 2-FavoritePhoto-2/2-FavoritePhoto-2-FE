import Attribute from "../Dropdown/Sort/Attribute.js";
import Rating from "../Dropdown/Sort/Rating.js";
import SearchBar from "../SearchBar/SearchBar.js";
import styles from "./Exchange.module.css";
import { useState, useEffect } from "react";
import MultiFilterModal from "./MultiFilter.js";
import PhotoCard from "../PhotoCard/PhotoCard.js";
import SelectCardExchange from "./SelectCardExchange.js";
import Pagination from "../Pagination/Pagination";
import Modal from "./Modal.js";
import Image from "next/image.js";
import icon_exchange from "@/public/assets/icon_exchange.svg";

export default function Exchange({ data, shopId, onFilterChange, onSearch, onPageChange }) {
  const [isToggle, setIsToggle] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data.card);
  const [filters, setFilters] = useState({
    grade: null,
    type: null,
    search: ""
  });
  const [reset, setReset] = useState(false);

  const handleResetFilters = () => {
    setFilters({
      grade: null,
      type: null,
      search: ""
    });
    setReset(true);  
    setTimeout(() => {
      setReset(false);
    }, 100);
  };

  useEffect(() => {
    if (reset) {
      setFilteredData(data.card);
    }
  }, [reset, data.card]);
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.totalCount / itemsPerPage);

  useEffect(() => {
    let result = [...data.card];

    if (filters.grade) {
      result = result.filter(card => card.grade === filters.grade);
    }

    if (filters.type) {
      result = result.filter(card => card.type.includes(filters.type));
    }

    if (filters.search) {
      result = result.filter(card => 
        card.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredData(result);
  }, [filters, data.card]);

  

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }));
    setCurrentPage(1);
    onSearch(searchTerm);
  };

  const handleToggleModal = () => {
    setIsToggle(!isToggle);
  };

  const handleSelectPhoto = (photo) => {
    setSelectPhoto(photo); // 선택된 데이터 저장
    setIsToggle(true); // SelectCardExchange 모달 열기
  };

  const handleFilterChange = (filterType, value) => {

    const newValue = value === "등급" || value === "속성" ? null : value;
    
    setFilters(prev => ({
      ...prev,
      [filterType]: newValue
    }));
  };

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    await onPageChange(pageNumber);
  };

  

  return (
    <>
      <div className={`${isToggle ? "modal-open" : ""}`}>
        <div className={styles.modal_content}>
          <div className={styles.mygallery_table}>
            <img src="/assets/icon_mygallery.png" alt="mygallery" className={styles.mygallery} />
          </div>

          <p className={styles.exchange_name}>포토카드 교환하기</p>
          <div className={styles.search_menu}>
            <div className={styles.multi_filter}>
              <MultiFilterModal filterKeys={["등급", "속성"]} />
            </div>
            <div className={styles.searchbar}>
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.filter_table}>
              <Rating sortType={(value) => handleFilterChange("grade", value)} reset={reset}/>
              <Attribute sortType={(value) => handleFilterChange("type", value)} reset={reset}/>
              <Image
              src={icon_exchange}
              alt="새로고침"
              width={20}
              className={styles.refreshIcon}
              onClick={handleResetFilters}
            />
            </div>
          </div>
          <div className={styles.photocard_content}>
            {filteredData.map((photo) => (
              <div key={photo.id} onClick={() => handleSelectPhoto(photo)}>
                <PhotoCard type="내카드" data={photo} />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {isToggle && (
          <Modal isOpen={isToggle} closeModal={handleToggleModal}>
            <SelectCardExchange data={selectPhoto} shopId={shopId} onClose={handleToggleModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
