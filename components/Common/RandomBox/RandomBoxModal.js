import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './RandomBoxModal.module.css';
import { fetchRandomPoints, fetchLastDrawTime } from '@/lib/api/PointsService';

const RandomBoxModal = ({ onClose }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); 
  const [isModalOpen, setIsModalOpen] = useState(true); 
  const [visibleBoxes, setVisibleBoxes] = useState([1, 2, 3]);
  const [error, setError] = useState('');
  const [canDraw, setCanDraw] = useState(false);
  const modalRef = useRef(null);

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
    if (selectedBox === null && canDraw) {
      try {
        const result = await fetchRandomPoints();
        if (result.error) {
          setError(result.error);
        } else {
          setSelectedBox(id);
          setPoints(result.randomPoints); 
          setVisibleBoxes([id]);
        }
      } catch (error) {
        setError('포인트를 가져오는 중 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    const checkLastDrawTime = async () => {
      try {
        const lastDrawTime = await fetchLastDrawTime();
        if (lastDrawTime.error) {
          setError(lastDrawTime.error);
        } else {
          const lastDrawDate = new Date(lastDrawTime);
          const now = new Date();
          const timeDifference = now - lastDrawDate;
          const remainingTimeInSeconds = Math.max(3600 - Math.floor(timeDifference / 1000), 0);
          setTimeLeft(remainingTimeInSeconds);
          setCanDraw(remainingTimeInSeconds <= 0);
        }
      } catch (error) {
        setError('마지막 뽑기 시간 조회에 실패했습니다.');
      }
    };

    checkLastDrawTime();

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    isModalOpen && (
    <div className={styles.modal}>
      <div className={styles.content} ref={modalRef}>
      <button onClick={handleClose} className={styles.closeButton}>
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