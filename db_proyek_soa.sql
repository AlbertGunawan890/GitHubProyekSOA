-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2023 at 09:15 AM
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
-- Table structure for table `auction`
--

CREATE TABLE `auction` (
  `id_auction` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `waktu_awal` time NOT NULL,
  `waktu_akhir` time NOT NULL,
  `id_barang` varchar(255) NOT NULL,
  `minimal_bid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auction`
--

INSERT INTO `auction` (`id_auction`, `nama`, `tanggal`, `waktu_awal`, `waktu_akhir`, `id_barang`, `minimal_bid`) VALUES
('A0001', 'a', '2021-01-05', '11:06:30', '16:06:30', 'B0001', '1000');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id_barang` varchar(255) NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `id_jenis` varchar(255) NOT NULL,
  `harga` varchar(255) NOT NULL,
  `detail_barang` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `nama_barang`, `id_jenis`, `harga`, `detail_barang`) VALUES
('B0001', 'initestuploadbarang', 'M0001', '10000', ''),
('B0002', 'initestuploadbarang', 'S0001', '1000000', 'ini cuma test upload barang'),
('B0003', 'initestuploadbarang', 'M0001', '1000000', 'ini cuma test upload barang'),
('B0004', 'initestuploadbarang', 'M0001', '1000000', 'ini cuma test upload barang');

-- --------------------------------------------------------

--
-- Table structure for table `jenis`
--

CREATE TABLE `jenis` (
  `id_jenis` varchar(255) NOT NULL,
  `nama_jenis` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jenis`
--

INSERT INTO `jenis` (`id_jenis`, `nama_jenis`) VALUES
('M0001', 'Mobil'),
('S0001', 'Sepeda');

-- --------------------------------------------------------

--
-- Table structure for table `log_auction`
--

CREATE TABLE `log_auction` (
  `id_log` varchar(255) NOT NULL,
  `id_auction` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `bid` varchar(255) NOT NULL,
  `waktu` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` varchar(255) NOT NULL,
  `nama_user` varchar(255) NOT NULL,
  `username_user` varchar(255) NOT NULL,
  `password_user` varchar(255) NOT NULL,
  `nik_user` int(11) NOT NULL,
  `alamat_user` varchar(255) NOT NULL,
  `notelp_user` int(11) NOT NULL,
  `tipe_user` varchar(255) NOT NULL,
  `saldo_user` varchar(255) NOT NULL,
  `status_user` varchar(255) NOT NULL,
  `email_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `nama_user`, `username_user`, `password_user`, `nik_user`, `alamat_user`, `notelp_user`, `tipe_user`, `saldo_user`, `status_user`, `email_user`) VALUES
('A001', 'tay', 'gfhf', '$2b$10$KU36thtI8dSak6aqM3GXwOg3ZigPNo1a4rJd.kA7iIUn3ndwy/uTG', 123123, 'taytduy', 2147483647, 'admin', '0', '1', 'albertgunawanongko890@gmail.com'),
('A002', 'tay', 'gfhf', '$2b$10$2Gg.hK8DaLxOGNVC/ATbFecBLah5MOabGTYQEuSo2t8eURBDMHyru', 123123, 'taytduy', 2147483647, 'admin', '0', '1', 'albertgunawanongko890@gmail.com'),
('A003', 'tay', 'gfhf', '$2b$10$HVEvRWkWif1sZlo/fQLN4e3nA0JkNHZGzE0cVhXjNW034o/4PIhmq', 123123, 'taytduy', 2147483647, 'admin', '0', '1', 'albertgunawanongko890@gmail.com'),
('A004', 'tay', 'gfhf', '$2b$10$RU3AKg8r/7yXOowJlZ8D8exp45BNGn1OE82nKLjYl4rQtYIWuaYf2', 123123, 'taytduy', 2147483647, 'admin', '0', '1', 'albertgunawanongko890@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auction`
--
ALTER TABLE `auction`
  ADD PRIMARY KEY (`id_auction`),
  ADD KEY `id_barang` (`id_barang`);

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`),
  ADD KEY `id_jenis` (`id_jenis`);

--
-- Indexes for table `jenis`
--
ALTER TABLE `jenis`
  ADD PRIMARY KEY (`id_jenis`);

--
-- Indexes for table `log_auction`
--
ALTER TABLE `log_auction`
  ADD PRIMARY KEY (`id_log`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auction`
--
ALTER TABLE `auction`
  ADD CONSTRAINT `auction_ibfk_1` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`id_jenis`) REFERENCES `jenis` (`id_jenis`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
