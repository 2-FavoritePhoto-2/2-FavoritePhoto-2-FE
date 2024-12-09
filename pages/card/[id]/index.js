import styles from "@/styles/CardDetail.module.css";
import QuantityCardBuyer from "@/components/Common/Quantity/QuantityCard_buyer";
import QuantityCardSeller from "@/components/Common/Quantity/QuantityCard_seller";
import PhotoCardExchange from "@/components/Common/PhotoCard/PhotoCardExchange";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/lib/api/CommonApi.js";
import PhotoCard from "@/components/Common/PhotoCard/PhotoCard";
import Exchange from "@/components/Common/Modal/Exchange";
import Modal from "@/components/Common/Modal/Modal";
import { useRouter } from "next/router";
import { getAccessToken } from "@/lib/utils/token";

export async function getServerSideProps(context) {
  const shopId = context.params["id"];
  let data;
  try {
    const res = await axios.get(`/shop/${shopId}`);
    data = res.data;
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
}

export default function CardDetail({ data }) {
  const accessToken = typeof window !== "undefined" ? getAccessToken() : "";
  const [isOwner, setIsOwner] = useState(false);
  const [exchangeModal, setExchangeModal] = useState(false);
  const [myCardList, setMyCardList] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [myOffer, setMyOffer] = useState([]);
  const [relatedCards, setRelatedCards] = useState([]); // 관련 카드 상태 추가
  const [myNickName, setMyNickName] = useState();
  const [filters, setFilters] = useState({
    type: "",
    value: "",
  });
  const router = useRouter();
  const card = data.card;
  const exchangeGrade = data.exchangeGrade;

  const fetchMyCards = async () => {
    try {
      const response = await axios.get(`/user/cards`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      setMyCardList(response.data);
      setFilteredCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      
    }
  };
  const fetchExchangeSubmitCard = async () => {
    try {
      const res = await axios.get(`/user/exchanges/${data.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (JSON.stringify(res.data) !== JSON.stringify(myOffer)) {
        setMyOffer(res.data);
      }
    } catch (error) {
      console.error("비상비상오류발생", error);
    }
  };

  const fetchMyState = async () => {
    try {
      const res = await axios.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMyNickName(res.data);
      setIsOwner(() => {
        if (res.data.nickname === data.seller.nickname) {
          return true;
        } else {
          return false;
        }
      });
    } catch (error) {
      console.error("Error fetching cards:", error);
      setIsOwner(false);
    }
  };

  useEffect(() => {
    fetchMyCards();
    fetchMyState();
  }, [isOwner]);

  useEffect(() => {
    fetchExchangeSubmitCard();
  }, []);

  const handleSearch = async (searchTerm) => {
    const newFilters = { type: "keyword", value: searchTerm };
    setFilters(newFilters);
    await fetchFilteredCards(newFilters);
  };
  const handleFilterChange = async (filterType, value) => {
    let type = "";
    switch (filterType) {
      case "attribute":
        type = "type";
        break;
      case "rating":
        type = "grade";
        break;
      default:
        type = filterType;
    }
    const newFilters = { type, value };
    setFilters(newFilters);
    await fetchCards({ filters: newFilters });
  };

  const fetchCards = async (options = {}) => {
    try {
      const { pageNumber, filters } = options;

      if (!filters?.type && !pageNumber) {
        setFilteredCards(myCardList);
        return;
      }

      const params = new URLSearchParams();
      if (pageNumber) params.append("page", pageNumber);

      if (filters?.type) {
        switch (filters.type) {
          case "keyword":
            params.append("keyword", filters.value);
            break;
          case "grade":
            params.append("grade", filters.value);
            break;
          case "type":
            params.append("type", filters.value);
            break;
        }
      }

      const response = await axios.get(`/user/cards?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setFilteredCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchCards({ pageNumber, filters });
  };

  const fetchFilteredCards = (currentFilters) => {
    fetchCards({ filters: currentFilters });
  };

  const exchangeModalOpen = () => setExchangeModal(true);
  const exchangeModalClose = () => {
    setExchangeModal(false);
    setFilteredCards(myCardList); // 필터링된 카드 목록 초기화
    setFilters({ type: "", value: "" }); // 필터 상태 초기화
  };
  const fetchRelatedCards = async () => {
    try {
      const response = await axios.get(
        `/shop?keyword=${encodeURIComponent(card.name)}&available=true&exclude=${data.id}`,
      );
      setRelatedCards(response.data.list); // 검색된 카드 목록을 상태에 저장
    } catch (error) {
      console.error("Error fetching related cards:", error);
    }
  };
  useEffect(() => {
    fetchRelatedCards();
  }, [card.name]); // card.name이 변경될 때마다 호출

  const handleCardClick = (photo) => {
    router.push(`/card/${photo.id}`);
  };
  return (
    <div>
      <div className={styles.details_container}>
        <img src="/assets/icon_poketplace.png" className={styles.poketplace} />
        <div className={styles.title}>{card.name}</div>
        <div className={styles.card_details_table}>
          <div className={styles.image_table}>
            <Image width={300} height={300} src={card.image} className={styles.card_img} />
          </div>
          <div>
            {isOwner ? <QuantityCardSeller data={data} /> : <QuantityCardBuyer data={data} />}
          </div>
        </div>
        <div className={styles.exchange_container}>
          {isOwner ? (
            myOffer &&
            myOffer.length > 0 && (
              <div className={styles.exchange_present_table}>
                <p className={styles.exchange_present}>교환제시 목록</p>
                <div className={styles.exchange_present_list}>
                  {myOffer.map((offer) => (
                    <PhotoCardExchange key={offer.id} type="seller" data={offer ?? {}} />
                  ))}
                </div>
              </div>
            )
          ) : (
            <>
              <div className={styles.exchange_table}>
                <p className={styles.exchange_name}>교환 희망 정보</p>
                <button className={styles.exchange_button} onClick={exchangeModalOpen}>
                  포토카드 교환하기
                </button>
              </div>
              <p className={styles.exchange_content}>{data.exchangeDetails}</p>
              <div className={styles.exchange_card_rating_table}>
                <p className={`${styles.card_rating} ${styles[exchangeGrade]}`}>
                  {exchangeGrade.replace(/_/g, " ")}
                </p>
                <p className={styles.card_attribute}>{data.exchangeType.join("ㅣ")}</p>
              </div>
              <button className={styles.exchange_button_mobile} onClick={exchangeModalOpen}>
                포토카드 교환하기
              </button>
              {myOffer && myOffer.length > 0 && !isOwner && (
                <div className={styles.my_exchange_present_table}>
                  <p className={styles.exchange_present}>내가 제시한 교환 목록</p>
                  <div className={styles.exchange_present_list}>
                    {myOffer.map((offer) => (
                      <PhotoCardExchange key={offer.id} data={offer ?? {}} />
                    ))}
                  </div>
                </div>
              )}
              <div className={styles.recommendcard_table}>
                <p className={styles.recommendcard_name}>비슷한 카드 추천</p>
              </div>
              <div className={styles.recommendcard}>
                {relatedCards.length > 0 ? (
                  relatedCards.map((photo) => (
                    <div
                      key={photo.id}
                      className={styles.relatedcard}
                      onClick={() => handleCardClick(photo)}
                    >
                      <PhotoCard data={photo ?? {}} />
                    </div>
                  ))
                ) : (
                  <p className={styles.nonCardList}>
                    {card.name} 카드와 비슷한 포토카드를 등록해보세요!
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {exchangeModal && (
        <Modal isOpen={exchangeModalOpen} closeModal={exchangeModalClose}>
          <Exchange
            data={filteredCards}
            profile={myNickName}
            shopId={data.id}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onPageChange={handlePageChange}
          />
        </Modal>
      )}
    </div>
  );
}
