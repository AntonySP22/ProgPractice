import React from 'react';
import styles from './GradientButton.module.css';

const GradientButton = ({ children, onClick, disabled = false }) => {
  return (
    <button 
      className={`${styles.button} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.buttonBackground}>
        <span className={styles.buttonText}>{children}</span>
      </div>
    </button>
  );
};

export default GradientButton;