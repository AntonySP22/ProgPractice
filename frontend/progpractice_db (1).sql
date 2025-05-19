-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 18-05-2025 a las 19:26:55
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `progpractice_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre`, `descripcion`, `imagen`) VALUES
(1, 'Python', 'Curso de introducción a Python', 'pythonf.png'),
(2, 'Java', 'Curso de Java', 'java.png'),
(3, 'HTML', 'Curso de HTML', 'html.png'),
(4, 'Swift', 'Curso de Swift', 'swift.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desafios`
--

DROP TABLE IF EXISTS `desafios`;
CREATE TABLE IF NOT EXISTS `desafios` (
  `id_desafio` int NOT NULL AUTO_INCREMENT,
  `id_curso` int NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descripcion` text NOT NULL,
  `lenguaje` enum('Python','JavaScript','C++','Java','HTML','Swift') NOT NULL,
  `dificultad` enum('Facil','Media','Dificil') NOT NULL,
  `tipo_ejercicio` enum('completar_codigo','seleccion_multiple','arrastrar_soltado') NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_desafio`),
  KEY `id_curso` (`id_curso`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `desafios`
--

INSERT INTO `desafios` (`id_desafio`, `id_curso`, `titulo`, `descripcion`, `lenguaje`, `dificultad`, `tipo_ejercicio`, `fecha_creacion`, `estado`) VALUES
(1, 3, 'Etiqueta básica', '¿Cuál es la etiqueta para un título principal en HTML?', 'HTML', 'Facil', 'seleccion_multiple', '2025-05-18 09:09:19', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logros`
--

DROP TABLE IF EXISTS `logros`;
CREATE TABLE IF NOT EXISTS `logros` (
  `id_logro` int NOT NULL AUTO_INCREMENT,
  `nombre_logro` varchar(100) NOT NULL,
  `descripcion` text,
  `icono` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_logro`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logros_usuarios`
--

DROP TABLE IF EXISTS `logros_usuarios`;
CREATE TABLE IF NOT EXISTS `logros_usuarios` (
  `id_usuario` int NOT NULL,
  `id_logro` int NOT NULL,
  `fecha_obtencion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`,`id_logro`),
  KEY `id_logro` (`id_logro`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_ayuda`
--

DROP TABLE IF EXISTS `mensajes_ayuda`;
CREATE TABLE IF NOT EXISTS `mensajes_ayuda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `subject` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mensaje` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mensajes_ayuda`
--

INSERT INTO `mensajes_ayuda` (`id`, `id_usuario`, `subject`, `nombre`, `email`, `mensaje`, `created_at`) VALUES
(1, 3, 'Cambio de Imagen ', 'Rebeca Arévalo', 'ana@example.com', 'No me deja actualizar la foto de perfil ', '2025-05-18 18:21:59'),
(2, 2, 'Cambio de Imagen ', 'Rebeca Arévalo', 'marcela@example.com', 'tarda en cambiar la imagen de perfil ', '2025-05-18 18:24:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones_desafio`
--

DROP TABLE IF EXISTS `opciones_desafio`;
CREATE TABLE IF NOT EXISTS `opciones_desafio` (
  `id_opcion` int NOT NULL AUTO_INCREMENT,
  `id_desafio` int DEFAULT NULL,
  `texto_opcion` text NOT NULL,
  `es_correcta` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_opcion`),
  KEY `id_desafio` (`id_desafio`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `opciones_desafio`
--

INSERT INTO `opciones_desafio` (`id_opcion`, `id_desafio`, `texto_opcion`, `es_correcta`) VALUES
(1, 1, '<h1>', 1),
(2, 1, '<p>', 0),
(3, 1, '<title>', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso_usuarios`
--

DROP TABLE IF EXISTS `progreso_usuarios`;
CREATE TABLE IF NOT EXISTS `progreso_usuarios` (
  `id_usuario` int NOT NULL,
  `id_curso` int NOT NULL,
  `progreso` enum('Por Comenzar','En Progreso','Completado') DEFAULT 'Por Comenzar',
  `ultima_actualizacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`,`id_curso`),
  KEY `id_curso` (`id_curso`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `progreso_usuarios`
--

INSERT INTO `progreso_usuarios` (`id_usuario`, `id_curso`, `progreso`, `ultima_actualizacion`) VALUES
(1, 3, 'Completado', '2025-05-18 09:09:19'),
(2, 1, 'En Progreso', '2025-05-18 12:23:22'),
(2, 2, 'En Progreso', '2025-05-18 13:24:16'),
(2, 3, 'Por Comenzar', '2025-05-18 09:16:21'),
(2, 4, 'Por Comenzar', '2025-05-18 09:16:21'),
(3, 1, 'En Progreso', '2025-05-18 10:25:19'),
(3, 2, 'Por Comenzar', '2025-05-18 09:20:21'),
(3, 3, 'En Progreso', '2025-05-18 11:12:48'),
(3, 4, 'Por Comenzar', '2025-05-18 09:20:21'),
(4, 1, 'Por Comenzar', '2025-05-18 09:24:38'),
(4, 2, 'Por Comenzar', '2025-05-18 09:24:38'),
(4, 3, 'En Progreso', '2025-05-18 09:47:31'),
(4, 4, 'Por Comenzar', '2025-05-18 09:24:38'),
(5, 1, 'Por Comenzar', '2025-05-18 13:25:05'),
(5, 2, 'Por Comenzar', '2025-05-18 13:25:05'),
(5, 3, 'Por Comenzar', '2025-05-18 13:25:05'),
(5, 4, 'Por Comenzar', '2025-05-18 13:25:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntajes`
--

DROP TABLE IF EXISTS `puntajes`;
CREATE TABLE IF NOT EXISTS `puntajes` (
  `id_usuario` int NOT NULL,
  `puntaje_total` int DEFAULT '0',
  `nivel` int DEFAULT '1',
  `ultima_actualizacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
CREATE TABLE IF NOT EXISTS `respuestas` (
  `id_respuesta` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_desafio` int DEFAULT NULL,
  `respuesta` text NOT NULL,
  `correcta` tinyint(1) DEFAULT NULL,
  `fecha_respuesta` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_respuesta`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_desafio` (`id_desafio`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secciones_curso`
--

DROP TABLE IF EXISTS `secciones_curso`;
CREATE TABLE IF NOT EXISTS `secciones_curso` (
  `id_seccion` int NOT NULL AUTO_INCREMENT,
  `id_curso` int NOT NULL,
  `tipo` enum('introduccion','teoria','ejercicio') NOT NULL,
  `titulo` varchar(150) DEFAULT NULL,
  `contenido` text,
  PRIMARY KEY (`id_seccion`),
  KEY `id_curso` (`id_curso`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `secciones_curso`
--

INSERT INTO `secciones_curso` (`id_seccion`, `id_curso`, `tipo`, `titulo`, `contenido`) VALUES
(1, 3, 'introduccion', 'Bienvenida al curso de HTML', 'Aquí aprenderás los fundamentos del HTML.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `biografia` text,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `rol` enum('usuario','administrador') DEFAULT 'usuario',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `contraseña`, `foto_perfil`, `biografia`, `fecha_registro`, `rol`) VALUES
(1, 'usuario1', 'usuario1@email.com', '$2y$10$UeNaBLZmX6gjb0QaHKjd9ewWa8ZqLQAkJxzTjEkVfy1k9sZcMmW8i', NULL, 'Me gusta programar', '2025-05-18 09:09:19', 'usuario'),
(2, 'Marcela', 'Marcela@example.com', '$2y$10$sFdjYrKZQ42xH5.RskUSoOan0q2rH/KKxzY0oEz7Ayn8EFSRRsOLS', 'uploads/profile_682a25b5388dc_4b7f9cfac044b8cde3cbd3ef2a6dbff0.jpg', 'Estoy aprendiendo aun ', '2025-05-18 09:16:21', 'usuario'),
(3, 'Ana Margarita', 'ana20@example.com', '$2y$10$YSoC9jd0djpBe9oaVxFll.nfeonBRyKdSXEhgBwFVtLT7VVFmyDAm', 'uploads/profile_682a24527b4ed_pexels-orlovamaria-4913482.jpg', 'Me encanta la promación de Java y Python ', '2025-05-18 09:20:21', 'usuario'),
(4, 'Carlos', 'carlos@gmail.com', '$2y$10$5SLn.VPuT3j9iZV6Qb.7NOmyROLmuO.24sCY8bX1EdxYIVd980PYS', NULL, NULL, '2025-05-18 09:24:38', 'usuario'),
(5, 'Margarita', 'margarita@gmail.com', '$2y$10$.UT3ENe.2JuRJ1RtP8EsIuyeSOJRbB3mirCsmcCHaknIF6DjNUp0K', NULL, NULL, '2025-05-18 13:25:05', 'usuario');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
