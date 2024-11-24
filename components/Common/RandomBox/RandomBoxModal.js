import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './RandomBoxModal.module.css';

const RandomBoxModal = ({ onClose }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isModalOpen, setIsModalOpen] = useState(false); //항상 열려 있도록 설정 변경은 false 

  const boxes = [
    { id: 1, image: '/assets/box_blue.svg' },
    { id: 2, image: '/assets/box_purple.svg' },
    { id: 3, image: '/assets/box_red.svg' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsModalOpen(true);
    }, 3600000); 

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (selectedBox !== null) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setSelectedBox(null); 
            return 3600;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedBox]);

  const handleBoxClick = (id) => {
    if (selectedBox === null) {
      const randomPoints = Math.floor(Math.random() * 16) + 5; // 5 to 20 points
      setSelectedBox(id);
      setPoints(randomPoints);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}분 ${secs}초`;
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
            <div key={box.id} className={styles.box} onClick={() => handleBoxClick(box.id)}>
              <Image src={box.image} width={278} height={198} layout="fixed" alt={`Box ${box.id}`} />
            </div>
          ))}
        </div>
        {selectedBox !== null && <p>축하합니다! {points} 포인트를 획득하셨습니다!</p>}
        </div>
      </div>
    )
  );
};

export default RandomBoxModal;