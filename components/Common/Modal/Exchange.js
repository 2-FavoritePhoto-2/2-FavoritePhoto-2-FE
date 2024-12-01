import Attribute from "../Dropdown/Sort/Attribute.js";
import Rating from "../Dropdown/Sort/Rating.js";
import SearchBar from "../SearchBar/SearchBar.js";
import styles from "./Exchange.module.css";
import { useState } from "react";
import MultiFilterModal from "./MultiFilter.js";
import PhotoCard from "../PhotoCard/PhotoCard.js";
import SelectCardExchange from "./SelectCardExchange.js";
import Pagination from "../Pagination/Pagination";
import Modal from "./Modal.js";

export default function Exchange({ data, shopId, onFilterChange, onSearch, onPageChange }) {
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

  const cardData = data;
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
              <Rating sortType={(value) => handleFilterChange("rating", value)} />
              <Attribute sortType={(value) => handleFilterChange("attribute", value)} />
            </div>
          </div>
          <div className={styles.photocard_content}>
            {cardData.card.map((photo) => (
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
