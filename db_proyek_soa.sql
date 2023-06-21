/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.27-MariaDB : Database - db_proyek_soa
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_proyek_soa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `db_proyek_soa`;

/*Table structure for table `auction` */

DROP TABLE IF EXISTS `auction`;

CREATE TABLE `auction` (
  `id_auction` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `waktu_awal` time NOT NULL,
  `waktu_akhir` time NOT NULL,
  `id_barang` varchar(255) NOT NULL,
  `minimal_bid` varchar(255) NOT NULL,
  `pemenang` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_auction`),
  KEY `id_barang` (`id_barang`),
  KEY `pemenang` (`pemenang`),
  CONSTRAINT `auction_ibfk_3` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `auction_ibfk_4` FOREIGN KEY (`pemenang`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `auction` */

insert  into `auction`(`id_auction`,`nama`,`tanggal`,`waktu_awal`,`waktu_akhir`,`id_barang`,`minimal_bid`,`pemenang`) values 
('A0001','a','2021-01-05','11:06:30','16:06:30','B0001','1000',NULL);

/*Table structure for table `barang` */

DROP TABLE IF EXISTS `barang`;

CREATE TABLE `barang` (
  `id_barang` varchar(255) NOT NULL,
  `nama_barang` varchar(255) NOT NULL,
  `id_jenis` varchar(255) NOT NULL,
  `harga` varchar(255) NOT NULL,
  `detail_barang` varchar(255) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_barang`),
  KEY `id_jenis` (`id_jenis`),
  CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`id_jenis`) REFERENCES `jenis` (`id_jenis`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `barang` */

insert  into `barang`(`id_barang`,`nama_barang`,`id_jenis`,`harga`,`detail_barang`,`gambar`) values 
('B0001','initestuploadbarang','M0001','10000','',NULL),
('B0002','initestuploadbarang','S0001','1000000','ini cuma test upload barang',NULL),
('B0003','initestuploadbarang','M0001','1000000','ini cuma test upload barang',NULL),
('B0004','initestuploadgambar','M0001','10000000','ini test upload gambar','./uploads/aP7WKxR_460swp.jpg');

/*Table structure for table `jenis` */

DROP TABLE IF EXISTS `jenis`;

CREATE TABLE `jenis` (
  `id_jenis` varchar(255) NOT NULL,
  `nama_jenis` varchar(255) NOT NULL,
  PRIMARY KEY (`id_jenis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `jenis` */

insert  into `jenis`(`id_jenis`,`nama_jenis`) values 
('M0001','Mobil'),
('S0001','Sepeda');

/*Table structure for table `log_auction` */

DROP TABLE IF EXISTS `log_auction`;

CREATE TABLE `log_auction` (
  `id_log` varchar(255) NOT NULL,
  `id_auction` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `bid` varchar(255) NOT NULL,
  `waktu` time NOT NULL,
  PRIMARY KEY (`id_log`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `log_auction` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

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
  `email_user` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id_user`,`nama_user`,`username_user`,`password_user`,`nik_user`,`alamat_user`,`notelp_user`,`tipe_user`,`saldo_user`,`status_user`,`email_user`) values 
('A001','tay','gfhf','$2b$10$KU36thtI8dSak6aqM3GXwOg3ZigPNo1a4rJd.kA7iIUn3ndwy/uTG',123123,'taytduy',2147483647,'admin','0','1','albertgunawanongko890@gmail.com'),
('A002','tay','gfhf','$2b$10$2Gg.hK8DaLxOGNVC/ATbFecBLah5MOabGTYQEuSo2t8eURBDMHyru',123123,'taytduy',2147483647,'admin','0','1','albertgunawanongko890@gmail.com'),
('A003','tay','gfhf','$2b$10$HVEvRWkWif1sZlo/fQLN4e3nA0JkNHZGzE0cVhXjNW034o/4PIhmq',123123,'taytduy',2147483647,'admin','0','1','albertgunawanongko890@gmail.com'),
('A004','tay','gfhf','$2b$10$RU3AKg8r/7yXOowJlZ8D8exp45BNGn1OE82nKLjYl4rQtYIWuaYf2',123123,'taytduy',2147483647,'admin','0','1','albertgunawanongko890@gmail.com');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
