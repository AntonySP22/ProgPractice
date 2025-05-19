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
import html5Logo from "../../../assets/images/html.png";
import robotImage from "@assets/images/login-avatar.png";

const TheoryHTMLCourse = () => {
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
          onClick={() => navigate("/app/courses/introduction/html")}
        >
          <FaArrowLeft />
        </button>
        <h2 className={styles.headerTitle}>Teoría básica de HTML</h2>
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
              src={html5Logo}
              alt="HTML5 Logo"
              className={styles.smallLogo}
            />
            <h3 className={styles.subtitle}>¿Qué es HTML?</h3>
          </div>
          <p className={styles.description}>
            El Lenguaje de Marcado de Hipertexto (<b>HTML</b>) es el código que
            se utiliza para estructurar y desplegar una página web y sus
            contenidos.
          </p>
          <h3 className={styles.subtitle}>Anatomía de un archivo HTML</h3>
          <p className={styles.textContent}>
            Ahora verás cómo los elementos individuales son combinados para
            formar una página HTML entera.
            <br />
            <code>&lt;!DOCTYPE html&gt;</code>
            <br />
            <code>&lt;html&gt;</code>
            <br />
            <code>&lt;head&gt;</code>
            <br />
            <code>&lt;meta charset="utf-8" /&gt;</code>
            <br />
            <code>&lt;title&gt;Mi página de prueba&lt;/title&gt;</code>
            <br />
            <code>&lt;/head&gt;</code>
            <br />
            <code>&lt;body&gt;</code>
            <br />
            <code>
              &lt;img src="images/firefox-icon.png" alt="Mi imagen de prueba"
              /&gt;
            </code>
            <br />
            <code>&lt;/body&gt;</code>
            <br />
            <code>&lt;/html&gt;</code>
          </p>
          <div className={styles.buttonCenter}>
            <button
              className={styles.learnButton}
              onClick={() => navigate("/app/EjercicioHTML")}
            >
              Aprender
            </button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h3 className={styles.subtitle}>Etiquetas de Texto</h3>
          <ul className={styles.description}>
            <li>
              <code>&lt;h1&gt;</code> a <code>&lt;h6&gt;</code>: Encabezados (de
              mayor a menor importancia).
            </li>
            <li>
              <code>&lt;p&gt;</code>: Párrafo de texto.
            </li>
            <li>
              <code>&lt;strong&gt;</code>: Texto en negrita (importancia
              semántica).
            </li>
            <li>
              <code>&lt;em&gt;</code>: Texto en cursiva (énfasis semántico).
            </li>
            <li>
              <code>&lt;br&gt;</code>: Salto de línea.
            </li>
            <li>
              <code>&lt;hr&gt;</code>: Línea horizontal (separador).
            </li>
          </ul>
          <div className={styles.robotContainer}>
            <img src={robotImage} alt="Robot" className={styles.robot} />
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

export default TheoryHTMLCourse;
