import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './RandomBoxModal.module.css';
import { fetchRandomPoints, fetchLastDrawTime } from '@/lib/api/randomPoints';


const RandomBoxModal = ({ onClose }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isModalOpen, setIsModalOpen] = useState(true); 
  const [visibleBoxes, setVisibleBoxes] = useState([1, 2, 3]);
  const [canDraw, setCanDraw] = useState(false);
  const [error, setError] = useState('');

  const boxes = [
    { id: 1, image: '/assets/box_blue.png', className: styles.boxBlue },
    { id: 2, image: '/assets/box_purple.png', className: styles.boxPurple },
    { id: 3, image: '/assets/box_red.png', className: styles.boxRed },
  ];

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  


  const handleBoxClick = async (id) => {
    if (selectedBox === null) {
      try {
        const result = await fetchRandomPoints();
        console.log('API 응답:', result); // 응답 데이터 확인
        if (result.error) {
          setError(result.error);
          console.log('에러 메시지:', result.error); // 에러 메시지 확인
        } else {
          setSelectedBox(id);
          setPoints(result.randomPoints); 
          setVisibleBoxes([id]);
          console.log('포인트:', result.points); // 포인트 확인
        }
      } catch (error) {
        setError('포인트를 가져오는 중 오류가 발생했습니다.');
        console.error('API 호출 오류:', error); // API 호출 오류 확인
      }
    }
  };

  return (
    isModalOpen && (
    <div className={styles.modal}>
      <div className={styles.content}>
      <button onClick={() => { setIsModalOpen(false); onClose(); }} className={styles.closeButton}>
      <Image src="/assets/icon_close.svg" width={32} height={32} alt="Close" />
          </button>
          <div className={styles.title}>
            <span className={styles.random}>랜덤</span>
            <span className={styles.point}>포인트</span>
          </div>
          <div className={styles.description}>
            1시간마다 돌아오는 기회! <br /> 랜덤 상자 뽑기를 통해 포인트를 획득하세요!</div>
          <div className={styles.timer}>
          <span className={styles.timerText}>다음 기회까지 남은 시간</span>
          <span className={styles.timerValue}>{formatTime(timeLeft)}</span>
          </div>
        <div className={styles.boxContainer}>
          {boxes.map((box) => (
            visibleBoxes.includes(box.id) && ( // 현재 보이는 박스만 렌더링
              <div key={box.id} className={`${styles.box} ${box.className}`} onClick={() => handleBoxClick(box.id)}>
                <Image src={box.image} width={230} height={200} layout="fixed" alt={`Box ${box.id}`} />
              </div>
            )
          ))}
        </div>
        {selectedBox !== null && (
          <p className={styles.congratulations}>
            <span className={styles.congratulationsText}>🎉 축하합니다! </span>
            <span className={styles.point}>{points} </span>
            <span className={styles.congratulationsEndText}> 포인트를 획득하셨습니다!</span>
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default RandomBoxModal;