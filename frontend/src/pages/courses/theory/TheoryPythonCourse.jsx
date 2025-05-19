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
import pythonLogo from "../../../assets/images/pythonf.png";
import robotImage from "@assets/images/login-avatar.png";

const TheoryPythonCourse = () => {
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
          onClick={() => navigate("/app/courses/introduction/python")}
        >
          <FaArrowLeft />
        </button>
        <h2 className={styles.headerTitle}>Teoría básica de Python</h2>
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
              src={pythonLogo}
              alt="Python Logo"
              className={styles.smallLogo}
            />
            <h3 className={styles.subtitle}>¿Qué es Python?</h3>
          </div>
          <p className={styles.description}>
            Python es un lenguaje de programación potente y fácil de aprender.
            Tiene estructuras de datos de alto nivel eficientes y un simple pero
            efectivo sistema de programación orientado a objetos.
          </p>
          <h3 className={styles.subtitle}>Hola mundo en Python</h3>
          <p className={styles.textContent}>
            Si ejecutas el siguiente código, habrás cumplido el primer hito de
            la programación en Python.
            <br />
            <code>print("Hola Mundo")</code>
          </p>
          <h3 className={styles.subtitle}>Crear variables</h3>
          <p className={styles.textContent}>
            Las variables en Python se pueden crear asignando un valor a un
            nombre sin necesidad de declararla antes.
            <br />
            <code>x = 10</code>
            <br />
            <code>y = "Nombre"</code>
            <br />
            <code>z = 3.9</code>
          </p>
        </div>

        <div className={styles.rightColumn}>
          <h3 className={styles.subtitle}>Sumando variables en Python</h3>
          <p className={styles.description}>
            Vamos a sumar dos variables e imprimir su valor. Lo primero vamos a
            declararlas, con nombres <b>a</b> y <b>b</b>. Declarar una variable
            significa "crearla".
            <br />
            <code>a = 3</code>
            <br />
            <code>b = 7</code>
          </p>
          <p className={styles.description}>
            Podemos hacer uso de <b>+</b> para sumarlos, y una vez más de{" "}
            <code>print()</code> para mostrar su valor por pantalla.
            <br />
            <code>print(a+b)</code>
          </p>
          <div className={styles.robotContainer}>
            <img src={robotImage} alt="Robot" className={styles.robot} />
          </div>
          <div className={styles.buttonCenter}>
            <button
              className={styles.learnButton}
              onClick={() => navigate("/app/EjercicioPython")}
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

export default TheoryPythonCourse;
