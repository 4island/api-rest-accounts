-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-06-2022 a las 21:33:15
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `api_banco`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `numero_de_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`numero_de_cliente`) VALUES
(1),
(2);
--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`numero_de_cliente`);
COMMIT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta`
--

CREATE TABLE `cuenta` (
  `numero_de_cuenta` int(11) NOT NULL,
  `numero_de_cliente` int(11) NOT NULL,
  `monto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuenta`
--

INSERT INTO `cuenta` (`numero_de_cuenta`, `numero_de_cliente`, `monto`) VALUES
(1, 1, 0),
(2, 1, 100000);
(3, 1, 300),
(4, 1, 500),
(5, 1, 30000),
(6, 1, 50000),
(7, 1, 300),
(8, 2, 100000);

--
-- Indices de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`numero_de_cuenta`),
  ADD KEY `numero_de_cliente` (`numero_de_cliente`) USING BTREE;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD CONSTRAINT `cuenta_ibfk_1` FOREIGN KEY (`numero_de_cliente`) REFERENCES `cliente` (`numero_de_cliente`);
COMMIT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transferencia`
--

CREATE TABLE `transferencia` (
  `numero_transferencia` int(11) NOT NULL,
  `numero_cuenta_origen` int(11) NOT NULL,
  `numero_cuenta_destino` int(11) NOT NULL,
  `numero_de_cliente` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Índices para tablas volcadas
--
--
-- Volcado de datos para la tabla `transferencia`
--

INSERT INTO `transferencia` (`numero_transferencia`, `numero_cuenta_origen`, `numero_cuenta_destino`, `numero_de_cliente`, `monto`, `timestamp`) VALUES
(1, 2, 1, 1, 50000, '2022-06-06 17:35:35'),
(2, 1, 2, 1, 500, '2022-06-10 18:41:33'),
(3, 1, 2, 1, 500, '2022-06-10 18:43:40'),
(4, 1, 2, 1, 200, '2022-06-13 22:10:56');

--
-- Indices de la tabla `transferencia`
--
ALTER TABLE `transferencia`
  ADD PRIMARY KEY (`numero_transferencia`),
  ADD KEY `numero_cuenta_destino` (`numero_cuenta_destino`),
  ADD KEY `numero_cuenta_origen` (`numero_cuenta_origen`),
  ADD KEY `id_cliente` (`numero_de_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `transferencia`
--
ALTER TABLE `transferencia`
  MODIFY `numero_transferencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `transferencia`
--
ALTER TABLE `transferencia`
  ADD CONSTRAINT `transferencia_ibfk_1` FOREIGN KEY (`numero_de_cliente`) REFERENCES `cliente` (`numero_de_cliente`),
  ADD CONSTRAINT `transferencia_ibfk_2` FOREIGN KEY (`numero_cuenta_destino`) REFERENCES `cuenta` (`numero_de_cuenta`),
  ADD CONSTRAINT `transferencia_ibfk_3` FOREIGN KEY (`numero_cuenta_origen`) REFERENCES `cuenta` (`numero_de_cuenta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLI