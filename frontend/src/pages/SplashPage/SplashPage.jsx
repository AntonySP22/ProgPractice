import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/images/logo.png';
import styles from './SplashPage.module.css';

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/app/welcome');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.fullScreenContainer}>
      <div className={styles.contentWrapper}>
        <img src={logo} alt="ProgPractice Logo" className={styles.fullScreenLogo} />
        <h1 className={styles.fullScreenTitle}>ProgPractice</h1>
        <p className={styles.fullScreenSubtitle}>La plataforma definitiva para practicar programación</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>
    </div>
  );
}