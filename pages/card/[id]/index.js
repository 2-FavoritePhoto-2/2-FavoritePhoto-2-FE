import { useRouter } from "next/router";
import styles from "@/styles/cardDetail.module.css";
import QuantityCardBuyer from "@/components/Common/Quantity/QuantityCard_buyer";
import QuantityCardSeller from "@/components/Common/Quantity/QuantityCard_seller";
import PhotoCardExchange from "@/components/Common/PhotoCard/PhotoCardExchange";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/contexts/UserContext";
import axios from "@/lib/api/api.js";
import PhotoCard from "@/components/Common/PhotoCard/PhotoCard";
import Exchange from "@/components/Common/Modal/Exchange";

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
  const response = await axios.get(`/shop`);
  let cardList = response.data;
  // props로 전달할 데이터를 반환합니다.
  return {
    props: {
      data,
      cardList,
    },
  };
}

//구매자 기준 상세페이지
export default function CardDetail({ data, cardList }) {
  const [isOwner, setIsOwner] = useState(false);
  const [myOffer, setMyOffer] = useState(false);
  const [exchangeModal, setExchangeModal] = useState(false);
  const [relatedCards, setRelatedCards] = useState([]); // 관련 카드 상태 추가

  const card = data.card;
  const exchangeGrade = data.exchangeGrade;

  const exchangeModalOpen = () => setExchangeModal(true);
  const exchangeModalClose = () => setExchangeModal(false);

  // card.name을 기반으로 관련 카드 검색
  useEffect(() => {
    const fetchRelatedCards = async () => {
      try {
        const response = await axios.get(
          `/shop?keyword=${encodeURIComponent(card.name)}&exclude=${data.id}`,
        );
        setRelatedCards(response.data.list); // 검색된 카드 목록을 상태에 저장
      } catch (error) {
        console.error("Error fetching related cards:", error);
      }
    };

    fetchRelatedCards();
  }, [card.name]); // card.name이 변경될 때마다 호출

  return (
    <>
      <div className={styles.details_container}>
        <img src="/assets/icon_poketplace.png" className={styles.poketplace} />
        <div className={styles.title}>{card.name}</div>
        <div className={styles.card_details_table}>
          <img src={card.image} className={styles.card_img} />
          {isOwner ? <QuantityCardSeller data={data} /> : <QuantityCardBuyer data={data} />}
        </div>
        <div className={styles.exchange_container}>
          {isOwner ? (
            <div className={styles.exchange_present_table}>
              <p className={styles.exchange_present}>교환제시 목록</p>
              <div className={styles.exchange_present_list}>
                <PhotoCardExchange type="seller" />
              </div>
            </div>
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
                <p className={`${styles.card_rating} ${styles[exchangeGrade]}`}>{exchangeGrade}</p>
                <p className={styles.card_attribute}>{data.exchangeType}</p>
              </div>
              <button className={styles.exchange_button_mobile} onClick={exchangeModalOpen}>
                포토카드 교환하기
              </button>
              {myOffer && (
                <div className={styles.my_exchange_present_table}>
                  <p className={styles.exchange_present}>내가 제시한 교환 목록</p>
                  <div className={styles.exchange_present_list}>
                    <PhotoCardExchange />
                  </div>
                </div>
              )}
              <div className={styles.recommendcard_table}>
                <p className={styles.recommendcard_name}>비슷한 카드 추천</p>
              </div>
              <div className={styles.recommendcard}>
                {relatedCards.length > 0 ? (
                  relatedCards.map((photo) => <PhotoCard key={photo.id} data={photo} />)
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
      {exchangeModal && <Exchange onClose={exchangeModalClose} />}
    </>
  );
}
