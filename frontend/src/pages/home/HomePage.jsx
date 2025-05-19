import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./HomePage.module.css";
import userAvatar from "@assets/images/avatar.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  FaBook,
  FaHome,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("Usuario");
  const [cursosProgreso, setCursosProgreso] = useState([]);
  const [cursosCompletados, setCursosCompletados] = useState([]);
  const [porcentaje, setPorcentaje] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login"); // Si no hay sesión activa
        return;
      }

      try {
        const response = await fetch(
          "http://localhost/ProgPracticeBackend/update_course_progress.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await response.json();

        if (data.success) {
          setUsername(data.username); // Aquí se actualiza el nombre del usuario
          setCursosProgreso(
            Array.isArray(data.cursosEnProgreso) ? data.cursosEnProgreso : []
          );
          setCursosCompletados(
            Array.isArray(data.cursosCompletados) ? data.cursosCompletados : []
          );
          setPorcentaje(data.progreso);
        } else {
          alert("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

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
      localStorage.clear(); // limpiar datos de sesión
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
        <h2 className={styles.headerTitle}>
          {" "}
          ¡Bienvenido de nuevo, {username}!
        </h2>
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
      <br />
      <br />
      <br />
      <div className={styles.mainContent}>
        <div className={styles.welcomeMessage}>
          <p className={styles.welcomeText}>
            Aquí puedes ver tu progreso en los cursos que estás tomando. Podrás
            consultar tanto los cursos que has completado como aquellos que
            tienes en curso actualmente. ¡Sigue avanzando y mantén el ritmo para
            lograr todos tus objetivos de aprendizaje!
          </p>
        </div>

        <div className={styles.topSection}>
          <div className={styles.courseSection}>
            <h2 className={styles.sectionTitle}>
              Cursos pendientes y en progreso
            </h2>
            <div className={styles.courseList}>
              {cursosProgreso.length === 0 && (
                <p>No tienes cursos en progreso aún.</p>
              )}
              {cursosProgreso.map((course) => (
                <div key={course.id} className={styles.courseItem}>
                  <span className={styles.courseName}>{course.title}</span>
                  <span className={styles.courseStatus}>{course.progress}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.progressSection}>
            <h2 className={styles.sectionTitle}>Tu progreso en programación</h2>
            <div className={styles.circularProgressWrapper}>
              <CircularProgressbar
                value={porcentaje}
                text={`${porcentaje}%`}
                styles={buildStyles({
                  textColor: "#052659",
                  pathColor: "#3A86FF",
                  trailColor: "#C1E8FF",
                })}
              />
            </div>
          </div>
        </div>

        <div className={styles.courseSection}>
          <h2 className={styles.sectionTitle}>Cursos completados</h2>
          <div className={styles.courseList}>
            {cursosCompletados.length === 0 && (
              <p>No has completado cursos todavía.</p>
            )}
            {cursosCompletados.map((course) => (
              <div key={course.id} className={styles.courseItem}>
                <span className={styles.courseName}>{course.title}</span>
                <span className={styles.courseStatus}>{course.progress}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className={styles.bottomNav}>
        <button
          className={`${styles.bottomNavItem} ${
            location.pathname === "/home" ? styles.active : ""
          }`}
          onClick={() => navigate("/app/home")}
        >
          <FaHome style={{ marginBottom: 4 }} />
          <span style={{ fontSize: "0.8rem", marginTop: 6 }}>Home</span>
        </button>
        <button
          className={`${styles.bottomNavItem} ${
            location.pathname === "/profile" ? styles.active : ""
          }`}
          onClick={() => navigate("/app/profile")}
        >
          <FaUser style={{ marginBottom: 4 }} />
          <span style={{ fontSize: "0.8rem", marginTop: 6 }}>Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;
