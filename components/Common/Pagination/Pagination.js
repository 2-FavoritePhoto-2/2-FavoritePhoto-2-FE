import styles from './Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        <span>이전</span>
      </button>
      
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
        >
          <div className={styles.centerLine}></div>
          <div className={styles.centerCircle}></div>
          <span>{index + 1}</span>
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        <span>다음</span>
      </button>
    </div>
  );
}
