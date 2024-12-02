import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './RandomBoxModal.module.css';
import { fetchRandomPoints, fetchLastDrawTime } from '@/lib/api/randomPoints';


const RandomBoxModal = ({ onClose }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isModalOpen, setIsModalOpen] = useState(true); //항상 열려 있도록 설정 상태, 변경은 false 
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

  useEffect(() => {
    const checkLastDrawTime = async () => {
      try {
        const lastDrawTime = await fetchLastDrawTime();
        console.log(lastDrawTime); //자바스크립트 객체로 들어옴. null으로 들어오지 않는다.
        if (!lastDrawTime.lastDrawTime) {
          setCanDraw(true);
          setTimeLeft(3600);
        } else {
          const currentTime = new Date().getTime();
          const drawTime = new Date(lastDrawTime).getTime();
          const timeElapsed = (currentTime - drawTime) / 1000;
          const newTimeLeft = Math.max(3600 - timeElapsed, 0);
          setTimeLeft(newTimeLeft);
          setCanDraw(newTimeLeft <= 0);
        }
      } catch (error) {
        console.error('Error checking last draw time:', error);
      }
    };

    checkLastDrawTime();

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const handleBoxClick = (id) => {
    if (selectedBox === null) {
      const randomPoints = Math.floor(Math.random() * 20) + 1; // 1 to 20 points
      setSelectedBox(id);
      setPoints(randomPoints);
      setVisibleBoxes([id]); 
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