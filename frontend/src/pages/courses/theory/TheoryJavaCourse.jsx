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
import javaLogo from "../../../assets/images/java.png";
import robotImage from "@assets/images/login-avatar.png";

const TheoryJavaCourse = () => {
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
          onClick={() => navigate("/app/courses/introduction/java")}
        >
          <FaArrowLeft />
        </button>
        <h2 className={styles.headerTitle}>Teoría básica de Java</h2>
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
            <img src={javaLogo} alt="Java Logo" className={styles.smallLogo} />
            <h3 className={styles.subtitle}>¿Qué es Java?</h3>
          </div>
          <p className={styles.description}>
            Java es un lenguaje de programación orientado a objetos, ampliamente
            utilizado en aplicaciones empresariales, móviles y sistemas
            embebidos. Su lema "escribe una vez, ejecuta en cualquier lugar"
            refleja su portabilidad y robustez.
          </p>
          <h3 className={styles.subtitle}>Declarando variables en Java</h3>
          <p className={styles.textContent}>
            Las variables en Java se declaran especificando el tipo seguido del
            nombre:
            <br />
            <code>int edad = 25;</code>
            <br />
            <code>String nombre = "Juan";</code>
            <br />
            <code>double promedio = 8.5;</code>
          </p>
          <h3 className={styles.subtitle}>Tipos de datos primitivos</h3>
          <p className={styles.textContent}>
            Java ofrece varios tipos de datos primitivos:
            <br />
            <code>int, long, float, double, boolean, char</code>
          </p>
        </div>

        <div className={styles.rightColumn}>
          <h3 className={styles.subtitle}>Operador de Asignación</h3>
          <p className={styles.description}>
            El operador de asignación <code>=</code> se utiliza para asignar
            valores a las variables.
            <br />
            <code>int numero = 10;</code>
          </p>
          <h3 className={styles.subtitle}>Ejemplo de impresión</h3>
          <p className={styles.description}>
            Para mostrar información en pantalla, usamos:
            <br />
            <code>System.out.println("¡Hola Mundo!");</code>
          </p>
          <div className={styles.robotContainer}>
            <img src={robotImage} alt="Robot" className={styles.robot} />
          </div>
          <div className={styles.buttonCenter}>
            <button
              className={styles.learnButton}
              onClick={() => navigate("/app/EjercicioJava")}
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

export default TheoryJavaCourse;
