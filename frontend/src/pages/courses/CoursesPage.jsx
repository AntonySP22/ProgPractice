import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./CoursesPage.module.css";
import {
  FaBook,
  FaHome,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import userAvatar from "@assets/images/avatar.png";

const CoursesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost/ProgPracticeBackend/get_cursos_usuario.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }
        );
        const data = await response.json();
        if (data.success) {
          setCourses(data.courses);
        } else {
          alert("Error al cargar los cursos: " + data.message);
        }
      } catch (error) {
        console.error("Error al obtener cursos:", error);
        alert("Ocurrió un error al conectar con el servidor.");
      }
    };

    fetchCourses();
  }, [userId, location.state?.updatedCourseId]);

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
  const cancelLogout = () => setShowLogoutConfirm(false);

  const handleCourseSelect = (course) => {
    const route = course.title.toLowerCase();
    navigate(`/app/courses/introduction/${route}`, {
      state: { courseId: course.id },
    });
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.fullScreenWrapper}>
      <div className={styles.headerSection}>
        <header className={styles.header}>
          <button
            className={styles.backButton}
            aria-label="Regresar"
            onClick={() => navigate("/app/courses")}
          >
            <FaArrowLeft />
          </button>
          <h2 className={styles.headerTitle}>Cursos</h2>
          <button
            onClick={toggleMenu}
            className={styles.menuButton}
            aria-label="Abrir menú"
          >
            <FaBars />
          </button>
        </header>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar cursos..."
          />
        </div>
      </div>

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

      <main className={styles.mainContent}>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <h2 className={styles.sectionTitle}>Tus cursos</h2>
        <div className={styles.coursesGrid}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className={styles.courseCard}
                onClick={() => handleCourseSelect(course)}
              >
                <img
                  src={`/src/assets/images/${course.image}`}
                  alt={course.title}
                  className={styles.courseIcon}
                  style={{ width: 72, height: 52, marginRight: 12 }}
                />
                <div className={styles.courseInfo}>
                  <h3>{course.title}</h3>
                  <span
                    className={`${styles.status} ${
                      course.progress === "En Progreso"
                        ? styles.inProgress
                        : course.progress === "Completado"
                        ? styles.completed
                        : styles.notStarted
                    }`}
                  >
                    {course.progress}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No hay cursos disponibles</p>
          )}
        </div>
      </main>

      <nav className={styles.bottomNav}>
        <button
          className={`${styles.bottomNavItem}`}
          onClick={() => navigate("/app/home")}
        >
          <FaHome style={{ marginBottom: 4 }} />
          <span style={{ fontSize: "0.8rem" }}>Home</span>
        </button>
        <button
          className={`${styles.bottomNavItem}`}
          onClick={() => navigate("/app/profile")}
        >
          <FaUser style={{ marginBottom: 4 }} />
          <span style={{ fontSize: "0.8rem" }}>Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default CoursesPage;
