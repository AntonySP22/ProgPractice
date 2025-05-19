import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Exercise.module.css";
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
import robotImage from "@assets/images/avatar-password.png";

const ExercisePythonCourse = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exercise1, setExercise1] = useState("");
  const [exercise2op, setExercise2op] = useState("");
  const [exercise2print, setExercise2print] = useState("");
  const [feedback, setFeedback] = useState("");
  const [blocks, setBlocks] = useState([
    { id: 1, content: "edad = 20" },
    { id: 2, content: 'print("Mayor de edad")' },
    { id: 3, content: "if edad >= 18:" },
  ]);
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;

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

  const shuffleBlocks = () => {
    const shuffled = [...blocks].sort(() => Math.random() - 0.5);
    setBlocks(shuffled);
  };

  useEffect(() => {
    shuffleBlocks();
  }, []);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("text/plain");
    if (sourceIndex === targetIndex) return;

    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(sourceIndex, 1);
    newBlocks.splice(targetIndex, 0, movedBlock);

    setBlocks(newBlocks);
  };

  const correctBlocks = [
    "edad = 20",
    "if edad >= 18:",
    'print("Mayor de edad")',
  ];

  const handleCheck = () => {
    // Ejercicio 1
    const ex1 = exercise1.trim().replace(/\r\n|\r|\n/g, "\n");
    const correctEx1 = 'variable = "!Hola Mundo!"\nprint(variable)';
    if (ex1 !== correctEx1) {
      setFeedback(
        "Ejercicio 1: El código no es correcto. Revisa la sintaxis y el texto."
      );
      return;
    }

    // Ejercicio 2
    if (
      exercise2op.trim() !== ">=" ||
      exercise2print.trim() !== '"Mayor de edad"'
    ) {
      setFeedback(
        'Ejercicio 2: Debes usar >= y el texto debe ser exactamente "Mayor de edad".'
      );
      return;
    }

    // Ejercicio 3 (drag & drop)
    const blocksContent = blocks.map((b) => b.content);
    for (let i = 0; i < correctBlocks.length; i++) {
      if (blocksContent[i] !== correctBlocks[i]) {
        setFeedback(`Ejercicio 3: El bloque ${i + 1} no es correcto.`);
        return;
      }
    }

    setFeedback("¡Todos los ejercicios están correctos! 🎉");
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
        <h2 className={styles.headerTitle}>
          Ejercicios de Programación con Python
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

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <h2 className={styles.exerciseTitle}>
            Ejercicios de Programación con Python
          </h2>
          <p className={styles.description}>
            Aquí pondrás en práctica todo lo que has aprendido. ¡Comienza ahora
            y conviértete en un experto en Python!{" "}
            <span role="img" aria-label="cohete">
              🚀
            </span>
          </p>

          <div className={styles.exerciseItem}>
            <p className={styles.question}>
              1. Escribir un programa que almacene la cadena ¡Hola Mundo! en una
              variable y luego muestre por pantalla el contenido de la variable:
            </p>
            <div className={styles.inputBox}>
              <textarea
                placeholder="variable.."
                rows={4}
                cols={50}
                value={exercise1}
                onChange={(e) => setExercise1(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.exerciseItem}>
            <p className={styles.question}>
              2. Completa el código para imprimir "Mayor de edad" si la edad es
              18 o más.
            </p>
            <p>edad = 20</p>
            <p>
              if edad{" "}
              <input
                type="text"
                className={styles.inlineInput}
                placeholder="..."
                size={2}
                value={exercise2op}
                onChange={(e) => setExercise2op(e.target.value)}
              />{" "}
              18:
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;print(
              <input
                type="text"
                className={styles.inlineInput}
                placeholder='".."'
                size={15}
                value={exercise2print}
                onChange={(e) => setExercise2print(e.target.value)}
              />
              )
            </p>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.exerciseItem}>
            <p className={styles.question}>
              3. Arrastra los bloques en orden para imprimir "Mayor de edad" si
              la edad es 18 o más.
            </p>
            <div className={styles.dragAndDropArea} onDragOver={handleDragOver}>
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className={styles.draggableBlock}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {block.content}
                </div>
              ))}
            </div>
          </div>
          <br />
          <br />
          <button className={styles.checkButton} onClick={handleCheck}>
            Comprobar
          </button>
          {feedback && <div className={styles.feedback}>{feedback}</div>}
          <div className={styles.robotContainer}>
            <img src={robotImage} alt="Robot" className={styles.robot} />
          </div>
        </div>
      </div>

      <div className={styles.buttonCenter}>
        <button
          className={styles.finishButton}
          onClick={async () => {
            const userId = localStorage.getItem("userId");
            const courseId = 1;

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
                    nuevoEstado: "Completado",
                  }),
                }
              );

              const result = await response.json();

              if (result.success) {
                navigate("/app/courses", { state: { courseId } });
              } else {
                alert("No se pudo actualizar el estado del curso.");
              }
            } catch (error) {
              alert("Error al actualizar progreso");
            }
          }}
        >
          Finalizar curso
        </button>
      </div>

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

export default ExercisePythonCourse;
