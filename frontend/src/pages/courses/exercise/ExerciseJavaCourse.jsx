import React, { useState } from "react";
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

const ExerciseJavaCourse = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exercise1Answer, setExercise1Answer] = useState("");
  const [exercise2Code, setExercise2Code] = useState("");
  const [exercise3Code, setExercise3Code] = useState("");
  const [feedback, setFeedback] = useState("");
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

  const handleCheck = () => {
    // Ejercicio 1
    if (exercise1Answer.trim() !== "Verdadero") {
      setFeedback(
        'Ejercicio 1: La declaración del método main no es correcta, por lo que la respuesta es "Verdadero".'
      );
      return;
    }

    // Ejercicio 2
    const correctedCode = exercise2Code.trim().replace(/\r\n|\r|\n/g, "\n");
    const correctCode = `public class Main {  
      public static void main(String[] args) {  
          double precio = 19.99;  
          int precioEntero = (int) precio;  
          System.out.println(precioEntero);  
      }
    }`;
    if (correctedCode !== correctCode) {
      setFeedback(
        "Ejercicio 2: El código corregido no es el correcto. Recuerda que debes realizar un casting de double a int."
      );
      return;
    }

    // Ejercicio 3
    const forLoopCode = exercise3Code.trim().replace(/\r\n|\r|\n/g, "\n");
    const correctForLoopCode = `public class Numeros {
      public static void main(String[] args) {
          for (int i = 1; i <= 5; i++) {
              System.out.println(i);
          }
      }
    }`;
    if (forLoopCode !== correctForLoopCode) {
      setFeedback(
        "Ejercicio 3: El código del bucle for no es correcto. Asegúrate de imprimir los números del 1 al 5."
      );
      return;
    }

    setFeedback("¡Todos los ejercicios están correctos! 🎉");
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
        <h2 className={styles.headerTitle}>
          Ejercicios de Programación con Java
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
            Ejercicios de Programación con Java
          </h2>
          <p className={styles.description}>
            Aquí pondrás en práctica todo lo que has aprendido. ¡Comienza ahora
            y conviértete en un experto en Java!{" "}
            <span role="img" aria-label="cohete">
              🚀
            </span>
          </p>

          <div className={styles.exerciseItem}>
            <p className={styles.question}>
              1. ¿Es correcta la declaración del método main?
            </p>
            <div className={styles.draggableBlock}>
              <pre>{`public class Main {
  public static void main(String[] args) {
    System.out.println("Hola Mundo");} }`}</pre>
            </div>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button
                className={styles.optionButtonVerdadero}
                onClick={() => setExercise1Answer("Verdadero")}
              >
                Verdadero
              </button>
              <button
                className={styles.optionButtonFalso}
                onClick={() => setExercise1Answer("Falso")}
              >
                Falso
              </button>
            </div>
          </div>

          <div className={styles.exerciseItem}>
            <p className={styles.question}>
              2. Encuentra y corrige el error en el siguiente código.
            </p>
            <div className={styles.draggableBlock}>
              <pre>{`public class Main {  
  public static void main(String[] args) {  
      double precio = 19.99;  
      int precioEntero = precio;  
      System.out.println(precioEntero);  }
}`}</pre>
            </div>
            <div className={styles.inputBox}>
              <textarea
                placeholder="// Escribe aquí el código corregido"
                rows={5}
                cols={50}
                value={exercise2Code}
                onChange={(e) => setExercise2Code(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.exerciseItem}>
            <p className={styles.question}>
              3. Escribe un programa que imprima los números del 1 al 5 usando
              un bucle for.
            </p>
            <div className={styles.inputBox}>
              <textarea
                placeholder={`
    // Escribe tu código aquí
}`}
                rows={7}
                cols={50}
                value={exercise3Code}
                onChange={(e) => setExercise3Code(e.target.value)}
              />
            </div>
            <button
              className={styles.checkButton}
              style={{ marginTop: "1rem" }}
              onClick={handleCheck}
            >
              Comprobar
            </button>
            {feedback && <div className={styles.feedback}>{feedback}</div>}
          </div>

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
                  headers: {
                    "Content-Type": "application/json",
                  },
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

export default ExerciseJavaCourse;
