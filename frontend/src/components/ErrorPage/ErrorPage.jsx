import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.container}>
      <h1>¡Oops! Error 404</h1>
      <p>La página que buscas no existe o no está disponible.</p>
      <p className={styles.errorMessage}>
        {error.statusText || error.message}
      </p>
      <div className={styles.actions}>
        <Link to="/" className={styles.button}>
          Volver al inicio
        </Link>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.button}
        >
          Recargar página
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;