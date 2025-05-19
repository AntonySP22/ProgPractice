import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Theory.module.css";
import {
  FaBook,
  FaHome,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import userAvatar from "../../../assets/images/avatar.png";
import swiftLogo from "../../../assets/images/swift.png";
import robotImage from "@assets/images/login-avatar.png";

const TheorySwiftCourse = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateTo = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
    setIsMenuOpen(false);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/welcome");
    }, 1500);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className={styles.fullScreenWrapper}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          aria-label="Regresar"
          onClick={() => navigate("/app/courses/introduction/swift")}
        >
          <FaArrowLeft />
        </button>
        <h2 className={styles.headerTitle}>Teoría básica de Swift</h2>
        <button
          onClick={toggleMenu}
          className={styles.menuButton}
          aria-label="Abrir menú"
        >
          <FaBars />
        </button>
      </header>

      {isMenuOpen && (
        <div className={styles.menuOverlay} onClick={toggleMenu}>
          <div
            className={styles.menuContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.menuHeader}>
              <img
                src={userAvatar}
                alt="avatar"
                className={styles.menuAvatar}
              />
              <span className={styles.menuUsername}>Usuario</span>
            </div>
            <button
              onClick={() => navigateTo("/app/home")}
              className={styles.menuItem}
            >
              <FaHome className={styles.menuIcon} /> Inicio
            </button>
            <button
              onClick={() => navigateTo("/app/courses")}
              className={styles.menuItem}
            >
              <FaBook className={styles.menuIcon} /> Cursos
            </button>
            <button
              onClick={() => navigateTo("/app/profile")}
              className={styles.menuItem}
            >
              <FaUser className={styles.menuIcon} /> Perfil
            </button>
            <button
              onClick={() => navigateTo("/app/help")}
              className={styles.menuItem}
            >
              <FaQuestionCircle className={styles.menuIcon} /> Ayuda
            </button>
            <hr className={styles.menuDivider} />
            <button
              onClick={handleLogout}
              className={`${styles.menuItem} ${styles.menuLogout}`}
            >
              <FaSignOutAlt className={styles.menuIcon} /> Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <label className={styles.confirmLabel}>¿Desea cerrar sesión?</label>
            <div className={styles.confirmButtons}>
              <button className={styles.confirmYes} onClick={confirmLogout}>
                Sí
              </button>
              <button className={styles.confirmNo} onClick={cancelLogout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingBox}>
            <span className={styles.loadingText}>Cerrando sesión...</span>
          </div>
        </div>
      )}

      <main className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.rowWithLogo}>
            <img
              src={swiftLogo}
              alt="Swift Logo"
              className={styles.smallLogo}
            />
            <h3 className={styles.subtitle}>¿Qué es Swift?</h3>
          </div>
          <p className={styles.description}>
            Swift es un lenguaje de programación moderno y seguro creado por
            Apple para desarrollar aplicaciones en iOS, macOS, watchOS y tvOS.
          </p>
          <h3 className={styles.subtitle}>Hola mundo en Swift</h3>
          <p className={styles.textContent}>
            El clásico primer programa en Swift se ve así:
            <br />
            <code>print("Hola Mundo")</code>
          </p>
          <h3 className={styles.subtitle}>Crear variables</h3>
          <p className={styles.textContent}>
            Puedes crear variables y constantes en Swift usando <code>var</code>{" "}
            y <code>let</code>:
            <br />
            <code>var nombre = "Juan"</code>
            <br />
            <code>let edad = 27</code>
          </p>
        </div>

        <div className={styles.rightColumn}>
          <h3 className={styles.subtitle}>Estructura if-else</h3>
          <p className={styles.description}>
            La estructura <code>if-else</code> se usa para ejecutar código según
            una condición:
            <br />
            <code>
              {`if edad > 18 {
  print("Eres mayor de edad")
} else {
  print("Eres menor de edad")
}`}
            </code>
          </p>
          <div className={styles.robotContainer}>
            <img src={robotImage} alt="Robot" className={styles.robot} />
          </div>
          <div className={styles.buttonCenter}>
            <button
              className={styles.learnButton}
              onClick={() => navigate("/app/EjercicioSwift")}
            >
              Aprender
            </button>
          </div>
        </div>
      </main>

      <nav className={styles.bottomNav}>
        <button
          className={`${styles.bottomNavItem} ${
            location.pathname === "/app/home" ? styles.active : ""
          }`}
          onClick={() => navigate("/app/home")}
        >
          <FaHome style={{ marginBottom: 4 }} />
          <span style={{ fontSize: "0.8rem" }}>Home</span>
        </button>
        <button
          className={`${styles.bottomNavItem} ${
            location.pathname === "/app/profile" ? styles.active : ""
          }`}
          onClick={() => navigate("/app/profile")}
        >
          <FaUser style={{ marginBottom: 4 }} />
          <span style={{ fontSize: "0.8rem" }}>Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default TheorySwiftCourse;
