# ProgPractice

**ProgPractice** es una aplicación web interactiva diseñada para facilitar el aprendizaje de la programación mediante ejercicios prácticos, evaluaciones automáticas e interactivas.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Problema y Solución](#problema-y-solución)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura](#arquitectura)
- [Instalación y Uso](#instalación-y-uso)
- [Contribuidores](#contribuidores)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Descripción del Proyecto

**ProgPractice** permite a los usuarios practicar programación con ejercicios interactivos como arrastrar y soltar, completar código y selección múltiple, brindando retroalimentación inmediata.

## Problema y Solución

### Problema

Las plataformas de aprendizaje tradicionales suelen enfocarse solo en la teoría, lo que puede resultar desmotivador para principiantes. La falta de prácticas interactivas y retroalimentación inmediata afecta la comprensión.

### Solución

**ProgPractice** integra ejercicios interactivos con evaluaciones automáticas, facilitando un aprendizaje dinámico y entretenido.

## Características

- **Ejercicios Interactivos:** Métodos de arrastrar y soltar, completar código y selección múltiple.
- **Retroalimentación Inmediata:** Sistema de evaluación automática.
- **Multilenguaje:** Soporte para Python, JavaScript, C++ y más.
- **Interfaz Intuitiva:** Fácil de usar y accesible.

## Tecnologías Utilizadas

- **Backend:** PHP
- **Frontend:** React
- **Base de Datos:** MySQL
- **Servidor:** Apache

## Arquitectura

El proyecto usa el modelo **MVC** (Modelo-Vista-Controlador):

- **Modelo:** Gestiona la lógica de negocio y la base de datos.
- **Vista:** Presentación de la interfaz de usuario.
- **Controlador:** Procesa las solicitudes del usuario y actualiza la vista.

## Instalación y Uso

### Requisitos

- PHP
- Apache
- MySQL
- Node.js y npm (para React)

### Pasos de Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/AntonySP22/ProgPractice.git
   ```

2. **Configurar el Backend (PHP):**

   - Dentro de la carpeta `backend`, encontrarás la subcarpeta `ProgPracticeBackend`.
   - Debes mover la carpeta `ProgPracticeBackend` a la carpeta correspondiente de tu servidor local, como por ejemplo:

     - `htdocs` si usas **XAMPP**
     - `www` si usas **WAMP**

3. **Configurar la Base de Datos:**

   - Dentro del repositorio, encontrarás el archivo `progpractice_db.sql`.
   - Abre **phpMyAdmin** y crea una nueva base de datos.
   - Luego, importa el archivo `progpractice_db.sql` para crear las tablas necesarias en la base de datos.

4. **Configurar el Frontend (React):**

   - Navega a la carpeta `ProgPractice/frontend` y corre el siguiente comando para instalar las dependencias:

     ```bash
     npm install
     ```

5. **Ejecutar el Proyecto:**

   - Para el Backend: Inicia el servidor Apache desde tu entorno local (XAMPP o WAMP).
   - Para el Frontend: En la carpeta `frontend`, ejecuta el siguiente comando para iniciar el servidor de desarrollo de React:

     ```bash
     npm run dev
     ```

   - Accede a la aplicación desde tu navegador en `http://localhost:5173` (o el puerto que React asigne por defecto).

¡Listo! Ahora puedes interactuar con el proyecto y probar sus funcionalidades.

## Contribuidores

- **Adán José Ruano Fuentes** – RF240346
- **Andrea Marcela López Rosales** – LR232978
- **Blanca Esmeralda Maravilla Cruz** – MC240030
- **Elmer Antonio Cruz García** – CG240032
- **Rebeca Marcela Orozco Arévalo** – OA241153

## Licencia

Este proyecto se distribuye bajo la [Licencia MIT](LICENSE).

## Contacto

Para más información o colaboración, puedes contactar a los integrantes del equipo o escribir a:

- **Programador:** Elmer Antonio Cruz
- **Correo electrónico:** \[[elmer06.cruz@gmail.com](mailto:elmer06.cruz@gmail.com)]
