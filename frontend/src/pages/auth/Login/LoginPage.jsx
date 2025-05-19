import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import wavesTop from "@assets/images/1-Photoroom.png";
import loginAvatar from "@assets/images/avatar.png";
import avatar from "@assets/images/logo.png";

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    if (usernameOrEmail.trim().length < 5) {
      setUserError("El usuario o correo debe tener al menos 5 caracteres");
      valid = false;
    } else {
      setUserError("");
    }
    if (password.length < 6) {
      setPassError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    } else {
      setPassError("");
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await fetch(
        "http://localhost/ProgPracticeBackend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: usernameOrEmail, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("nombre", data.username);
        alert("Inicio de sesión exitoso");
        navigate("/app/home");
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  return (
    <div className={styles.fullScreenContainer}>
      <div className={styles.avatarFloater}>
        <img src={avatar} alt="User" className={styles.avatarImage} />
      </div>

      <div className={styles.waveBackground}>
        <img
          src={wavesTop}
          alt="Olas decorativas"
          className={styles.responsiveWave}
        />
      </div>

      <main className={styles.loginContent}>
        <div className={styles.loginHeader}>
          <img src={loginAvatar} alt="Avatar" className={styles.userAvatar} />
          <h1 className={styles.loginTitle}>¡Bienvenido a ProgPractice!</h1>
        </div>

        <div className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Usuario o correo electrónico"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            {userError && <span className={styles.errorMsg}>{userError}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              className={styles.formInput}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passError && <span className={styles.errorMsg}>{passError}</span>}
          </div>

          <button onClick={handleLogin} className={styles.loginButton}>
            <span className={styles.buttonLabel}>Iniciar Sesión</span>
          </button>
        </div>

        <div className={styles.extraOptions}>
          <button
            className={styles.registerLink}
            onClick={() => navigate("/app/signup")}
          >
            Crear una cuenta nueva
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
