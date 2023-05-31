-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2023 at 09:34 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_proyek_soa`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `Id_barang` varchar(12) NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `id_jenis` varchar(12) NOT NULL,
  `harga` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`Id_barang`, `nama_barang`, `id_jenis`, `harga`) VALUES
('B0001', 'initestuploadbarang', 'T0001', 1000000),
('B0002', 'initestuploadbarang', 'T0001', 1000000),
('B0003', 'initestuploadbarang', 'T0001', 1000000),
('B0004', 'initestuploadbarang', 'T0001', 1000000);

-- --------------------------------------------------------

--
-- Table structure for table `jenis`
--

CREATE TABLE `jenis` (
  `id_jenis` varchar(12) NOT NULL,
  `nama_jenis` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jenis`
--

INSERT INTO `jenis` (`id_jenis`, `nama_jenis`) VALUES
('M0001', 'Mobil'),
('T0001', 'Test');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` varchar(10) DEFAULT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `username_user` varchar(255) NOT NULL,
  `password_user` varchar(255) DEFAULT NULL,
  `nik_user` varchar(16) DEFAULT NULL,
  `alamat_user` varchar(255) DEFAULT NULL,
  `notelp_user` varchar(15) DEFAULT NULL,
  `tipe_user` varchar(30) DEFAULT NULL,
  `saldo_user` int(255) DEFAULT NULL,
  `status_user` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `nama_user`, `username_user`, `password_user`, `nik_user`, `alamat_user`, `notelp_user`, `tipe_user`, `saldo_user`, `status_user`) VALUES
('U001', 'a', 'aa', 'a', '123123', 'a', '123123', 'user', 20000, 0),
('A002', 'a', 'qwe', 'a123', '123123', 'a', '123123', 'admin', 0, NULL),
('C003', 'a', 'shawn', 'a123', '123123', 'a', '123123', 'user', 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`Id_barang`),
  ADD KEY `id_jenis` (`id_jenis`);

--
-- Indexes for table `jenis`
--
ALTER TABLE `jenis`
  ADD PRIMARY KEY (`id_jenis`),
  ADD UNIQUE KEY `id_jenis` (`id_jenis`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username_user`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `id_jenis` FOREIGN KEY (`id_jenis`) REFERENCES `jenis` (`id_jenis`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
