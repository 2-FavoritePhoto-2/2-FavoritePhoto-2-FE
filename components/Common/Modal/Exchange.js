import Attribute from "../Dropdown/Sort/Attribute.js";
import Rating from "../Dropdown/Sort/Rating.js";
import SearchBar from "../SearchBar/SearchBar.js";
import styles from "./Exchange.module.css";
import { useState } from "react";
import MultiFilterModal from "./MultiFilter.js";
import PhotoCard from "../PhotoCard/PhotoCard.js";
import SelectCardExchange from "./SelectCardExchange.js";
import Pagination from '../Pagination/Pagination';

export default function Exchange({ data, onClose, onFilterChange, onSearch, onPageChange }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.totalCount / itemsPerPage);

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm);
  };

  const handleToggleModal = () => {
    setIsToggle(!isToggle);
  };

  const slideCloseModal = () => {
    setIsSliding(true);
    setIsOpen(false);
    setIsSliding(false);
    onClose();
    setTimeout(() => {
    }, 300); // 애니메이션 시간과 일치시킴
  };

  const handleSelectPhoto = (photo) => {
    setSelectPhoto(photo); // 선택된 데이터 저장
    setIsToggle(true); // SelectCardExchange 모달 열기
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    await onPageChange(pageNumber);
  };

  if (!isOpen && !isSliding) return null;
  return (
    <>
      <div className={`${styles.container} ${isSliding ? styles.sliding : ""}`}>
        <div className={styles.modal_table}> 
          <div className={styles.modal_content}>
            <div className={styles.slidebar_table}>
              <img
                src="/assets/btn_crossbar.png"
                alt="slidebutton"
                className={styles.crossbutton}
                onClick={slideCloseModal}
              />
            </div>
            <div className={styles.mygallery_table}>
              <img src="/assets/icon_mygallery.png" alt="mygallery" className={styles.mygallery} />
              <img
                src="/assets/icon_close.svg"
                alt="close_button"
                className={styles.close_button}
                onClick={onClose}
              />
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
                <Rating sortType={(value) => handleFilterChange("rating", value)} />
                <Attribute sortType={(value) => handleFilterChange("attribute", value)} />
              </div>
            </div>
            <div className={styles.photocard_content}>
              {data.card.map((photo) => (
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
         </div>
      </div> 
      {isToggle && <SelectCardExchange data={selectPhoto} onClose={handleToggleModal} />}
    </>
  );
}
