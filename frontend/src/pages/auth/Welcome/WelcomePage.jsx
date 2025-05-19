import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";
import wavesTop from "@assets/images/1-Photoroom.png";
import logo from "@assets/images/logo.png";
import avatar from "@assets/images/avatar.png";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.fullScreenWrapper}>
      <div className={styles.avatarFloater}>
        <img src={avatar} alt="User" className={styles.avatarImage} />
      </div>

      <div className={styles.waveBackground}>
        <img
          src={wavesTop}
          alt="Olas decorativas"
          className={styles.responsiveWave}
        />
      </div>

      <main className={styles.mainContent}>
        <div className={styles.brandHero}>
          <img src={logo} alt="ProgPractice" className={styles.megaLogo} />
          <h1 className={styles.appTitle}>ProgPractice</h1>
          <p className={styles.appSubtitle}>
            La plataforma definitiva para programadores
          </p>
        </div>

        <div className={styles.actionButtons}>
          <button
            onClick={() => navigate("/app/login")}
            className={styles.mainAction}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => navigate("/app/signup")}
            className={styles.secondaryAction}
          >
            Registrarse
          </button>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
