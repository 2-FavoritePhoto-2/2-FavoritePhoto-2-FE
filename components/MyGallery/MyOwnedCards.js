import Grade from "../Common/Grade/Grade";
import styles from "./MyOwnedCards.module.css";
import { useState, useEffect } from "react";
import { getUserProfile } from "@/lib/api/UserService";

export default function MyOwnedCards({ myCardList }) {
  const grades = ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"];
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

  const gradeCount = {
    COMMON: 0,
    RARE: 0,
    SUPER_RARE: 0,
    LEGENDARY: 0,
  };

  myCardList.forEach((card) => {
    if (gradeCount[card.grade] !== undefined) {
      gradeCount[card.grade]++;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.owner}>{profile.nickname}님이 보유한 포토카드</p>
        <p className={styles.total_count}>({myCardList.length}장)</p>
      </div>
      <div className={styles.grade_count}>
        {grades.map((grade, index) => (
          <div key={index}>
            <Grade grade={grade} quantity={gradeCount[grade] || 0} border={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
