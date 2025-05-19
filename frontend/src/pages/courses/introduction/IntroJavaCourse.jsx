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
import javaLogo from "../../../assets/images/java.png";

const IntroJavaCourse = () => {
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
        <h2 className={styles.headerTitle}>Introducción a Java</h2>
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
                src={javaLogo}
                alt="Java Logo"
                className={styles.introLogoSmall}
              />
              <h1 className={styles.introTitle}>
                ¡Bienvenido al Curso de Java!
              </h1>
            </div>
            <p className={styles.introDescription}>
              Java es uno de los lenguajes de programación más utilizados en el
              mundo, conocido por su portabilidad, robustez y seguridad. Es
              ampliamente usado en desarrollo de aplicaciones empresariales,
              móviles (Android), sistemas embebidos y mucho más.
              <br />
              <br />
              En este curso, aprenderás desde los conceptos básicos de Java
              hasta temas avanzados, desarrollando proyectos prácticos y
              resolviendo retos reales. No necesitas experiencia previa en
              programación: este curso está diseñado para principiantes y para
              quienes desean reforzar sus conocimientos.
              <br />
              <br />
              <strong>¿Qué aprenderás?</strong>
              <ul className={styles.introList}>
                <li>
                  Fundamentos de Java: sintaxis, variables, tipos de datos y
                  operadores.
                </li>
                <li>
                  Programación orientada a objetos: clases, objetos, herencia y
                  polimorfismo.
                </li>
                <li>Manejo de excepciones y archivos.</li>
                <li>Desarrollo de aplicaciones sencillas.</li>
                <li>Ejercicios prácticos para afianzar tus conocimientos.</li>
              </ul>
              ¡Comienza tu camino en la programación con Java y abre las puertas
              a un mundo de posibilidades!
            </p>
            <div className={styles.detailsContainer}>
              <div className={styles.detailBox}>
                <strong>10 horas</strong>
                <span>Teoría y práctica</span>
              </div>
              <div className={styles.detailBox}>
                <strong>50</strong>
                <span>Lecturas</span>
              </div>
            </div>
            <div className={styles.buttonCenter}>
              <button
                className={styles.learnButton}
                onClick={async () => {
                  const userId = localStorage.getItem("userId");
                  const courseId = 2;
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
                      navigate("/app/courses/theory/java", {
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

export default IntroJavaCourse;
