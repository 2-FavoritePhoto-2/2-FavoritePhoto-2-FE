import styles from "./CardList.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Rating from "../Dropdown/Sort/Rating";
import Attribute from "../Dropdown/Sort/Attribute";
import PhotoCard from "@/components/Common/PhotoCard/PhotoCard";
import MultiFilterModal from "./MultiFilter";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import CardSell from "./CardSell";
import { getMyPhotoCardList, getUserProfile } from "@/lib/api/UserService";

export default function CardList() {
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardSell, setShowCardSell] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchProfile = await getUserProfile();
        setProfile(fetchProfile);
      } catch (err) {
        console.error("프로필 정보를 불러오는데 실패했습니다.", err);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowCardSell(true);
  };

  const closeModal = () => {
    setShowCardSell(false);
    setSelectedCard(null);
  };

  // 검색어 변경 시 처리 함수
  const handleSearch = async (keyword) => {
    setSearchTerm(keyword);
  };

  // 등급 필터 변경 처리 함수
  const handleGradeFilter = (grade) => {
    setGradeFilter(grade);
    setTypeFilter("");
  };

  // 속성 필터 변경 처리 함수
  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    setGradeFilter("");
  };

  // 마이갤러리 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchCardData = await getMyPhotoCardList({
          page: 1,
          pageSize: 50,
          grade: gradeFilter,
          type: typeFilter,
          keyword: searchTerm,
        });
        setCardData(fetchCardData.card);
      } catch (err) {
        setError("상품 목록을 불러오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, [searchTerm, gradeFilter, typeFilter]);

  return (
    <div className={styles.list_wrapper}>
      <div className={styles.list_header}>
        <h1 className={styles.modal_title}>마이갤러리</h1>
        <div className={styles.list_title}>
          <h1>나의 포토카드 판매하기</h1>
          <div className={styles.line}></div>
        </div>
        <div className={styles.search_filters}>
          <div className={styles.mobile_filter}>
            <MultiFilterModal filterKeys={["등급", "속성"]} />
          </div>
          <div className={styles.search}>
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className={styles.filters}>
            <Rating sortType={handleGradeFilter} />
            <Attribute sortType={handleTypeFilter} />
          </div>
        </div>
      </div>
      <div className={styles.card_list_wrapper}>
        <div className={styles.card_list}>
          {cardData.map((card) => (
            <div key={card.id} onClick={() => handleCardClick(card)}>
              <PhotoCard type="내카드" data={card} profile={profile} />
            </div>
          ))}
        </div>
      </div>
      {showCardSell && (
        <Modal isOpen={showCardSell} closeModal={closeModal}>
          <CardSell data={selectedCard} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
