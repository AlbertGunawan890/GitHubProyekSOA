/*
SQLyog Community v13.1.9 (64 bit)
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

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

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
  `status_user` int(2) DEFAULT NULL,
  PRIMARY KEY (`username_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id_user`,`nama_user`,`username_user`,`password_user`,`nik_user`,`alamat_user`,`notelp_user`,`tipe_user`,`saldo_user`,`status_user`) values 
('U001','a','aa','a','123123','a','123123','user',20000,0),
('A002','a','qwe','a123','123123','a','123123','admin',0,NULL),
('C003','a','shawn','a123','123123','a','123123','user',0,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
