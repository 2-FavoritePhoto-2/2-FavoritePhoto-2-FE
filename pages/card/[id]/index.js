import { useRouter } from "next/router";
import styles from "@/styles/cardDetail.module.css";
import QuantityCardBuyer from "@/components/Common/Quantity/QuantityCard_buyer";
import QuantityCardSeller from "@/components/Common/Quantity/QuantityCard_seller";
import PhotoCardExchange from "@/components/Common/PhotoCard/PhotoCardExchange";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/contexts/UserContext";

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   const post = await fetchPostById(id); // 포스트 데이터를 가져오는 함수

//   return {
//     props: {
//       post,
//     },
//   };
// }

//구매자 기준 상세페이지
export default function CardDetail() {
  const [isOwner, setIsOwner] = useState(false);
  // const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   if (user && post) {
  //     setIsOwner(user.id === post.authorId); // 유저 ID와 글 작성자 ID 비교
  //   }
  // }, [user, post]);

  return (
    <>
      <div className={styles.details_container}>
        <img src="/assets/icon_poketplace.png" className={styles.poketplace} />
        <div className={styles.title}>우리집 앞마당 {id}</div>
        <div className={styles.card_details_table}>
          <img src="/assets/defaultimg.png" className={styles.card_img} />
          {isOwner ? <QuantityCardSeller /> : <QuantityCardBuyer />}
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
                <button className={styles.exchange_button}>포토카드 교환하기</button>
              </div>
              <p className={styles.exchange_content}>교환 희망 정보에서의 content 입니다.</p>
              <div className={styles.exchange_card_rating_table}>
                <p className={styles.card_rating}>RARE</p>
                <p className={styles.card_attribute}>불</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
