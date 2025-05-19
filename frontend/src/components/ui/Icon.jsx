import React from 'react';
import styles from './Icon.module.css';

const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  return (
    <span 
      className={`material-icons ${styles.icon}`} 
      style={{ fontSize: size, color }}
    >
      {name}
    </span>
  );
};

export default Icon;