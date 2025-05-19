import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpPage.module.css";
import wavesTop from "@assets/images/1-Photoroom.png";
import loginAvatar from "@assets/images/avatar.png";
import avatar from "@assets/images/logo.png";
import signupAvatar from "@assets/images/Avatar-check.png";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username.trim() || username.trim().length < 5) {
      newErrors.username = "El usuario debe tener al menos 5 caracteres";
    }
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }
    if (!password || password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    try {
      const response = await fetch(
        "http://localhost/ProgPracticeBackend/signup.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        }
        alert("Registro exitoso. Ahora inicia sesión.");
        navigate("/app/home");
      } else {
        alert(data.message || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
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

      <main className={styles.signupContent}>
        <div className={styles.signupHeader}>
          <img src={signupAvatar} alt="Avatar" className={styles.userAvatar} />
          <h1 className={styles.signupTitle}>Crea tu cuenta en ProgPractice</h1>
        </div>

        <div className={styles.signupForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <span className={styles.errorMsg}>{errors.username}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              className={styles.formInput}
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className={styles.errorMsg}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              className={styles.formInput}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className={styles.errorMsg}>{errors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              className={styles.formInput}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <span className={styles.errorMsg}>{errors.confirmPassword}</span>
            )}
          </div>

          <button onClick={handleSignUp} className={styles.signupButton}>
            <span className={styles.buttonLabel}>Registrarse</span>
          </button>
        </div>

        <div className={styles.extraOptions}>
          <button
            className={styles.loginLink}
            onClick={() => navigate("/app/login")}
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </button>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
