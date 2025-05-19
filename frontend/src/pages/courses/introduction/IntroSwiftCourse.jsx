import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Introduction.module.css";
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

const IntroSwiftCourse = () => {
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
          onClick={() => navigate("/app/courses")}
        >
          <FaArrowLeft />
        </button>
        <h2 className={styles.headerTitle}>Introducción a Swift</h2>
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
              <span className={styles.menuUsername}>Menú</span>
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

      <main className={styles.introMain}>
        <section className={styles.introCard}>
          <div className={styles.introRight}>
            <div className={styles.titleRow}>
              <img
                src={swiftLogo}
                alt="Swift Logo"
                className={styles.introLogoSmall}
              />
              <h1 className={styles.introTitle}>
                ¡Bienvenido al Curso de Swift!
              </h1>
            </div>
            <p className={styles.introDescription}>
              Swift es el lenguaje moderno y seguro de Apple para crear
              aplicaciones iOS, macOS, watchOS y tvOS.
              <br />
              <br />
              En este curso, aprenderás desde los conceptos básicos hasta temas
              avanzados, desarrollando proyectos prácticos y resolviendo retos
              reales. No necesitas experiencia previa en programación: este
              curso es ideal para principiantes y para quienes desean reforzar
              sus conocimientos.
              <br />
              <br />
              <strong>¿Qué aprenderás?</strong>
              <ul className={styles.introList}>
                <li>
                  Fundamentos de Swift: variables, tipos de datos, operadores y
                  control de flujo.
                </li>
                <li>Opcionales, estructuras, clases y protocolos.</li>
                <li>Manejo de errores y colecciones.</li>
                <li>Desarrollo de apps sencillas para iOS/macOS.</li>
                <li>Ejercicios prácticos para afianzar tus conocimientos.</li>
              </ul>
              ¡Comienza tu camino en el desarrollo Apple y crea tus propias
              apps!
            </p>
            <div className={styles.detailsContainer}>
              <div className={styles.detailBox}>
                <strong>12 horas</strong>
                <span>Teoría y práctica</span>
              </div>
              <div className={styles.detailBox}>
                <strong>35</strong>
                <span>Lecturas</span>
              </div>
            </div>
            <div className={styles.buttonCenter}>
              <button
                className={styles.learnButton}
                onClick={async () => {
                  const userId = localStorage.getItem("userId");
                  const courseId = 4;
                  if (!userId || !courseId) {
                    alert("Falta información del usuario o del curso.");
                    return;
                  }
                  try {
                    const response = await fetch(
                      "http://localhost/ProgPracticeBackend/actualizar_estado.php",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          userId,
                          courseId,
                          nuevoEstado: "En Progreso",
                        }),
                      }
                    );
                    const result = await response.json();
                    if (result.success) {
                      navigate("/app/courses/theory/swift", {
                        state: { courseId },
                      });
                    } else {
                      alert("No se pudo actualizar el estado del curso.");
                    }
                  } catch (error) {
                    alert("Error al actualizar progreso");
                  }
                }}
              >
                ¡Comenzar ahora!
              </button>
            </div>
          </div>
        </section>
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

export default IntroSwiftCourse;
