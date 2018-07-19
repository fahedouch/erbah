-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: erbah
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.4-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES (1,'riadh5');
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `footmatch`
--

LOCK TABLES `footmatch` WRITE;
/*!40000 ALTER TABLE `footmatch` DISABLE KEYS */;
INSERT INTO `footmatch` VALUES (1,'1234','1234',1),(2,'1234','1234',2),(3,'1234','1234',2);
/*!40000 ALTER TABLE `footmatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tournement`
--

LOCK TABLES `tournement` WRITE;
/*!40000 ALTER TABLE `tournement` DISABLE KEYS */;
INSERT INTO `tournement` VALUES (1,'12/10/2017','12/12/2019',1),(2,'12/10/2017','12/12/2018',1);
/*!40000 ALTER TABLE `tournement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'fahedouch','fahed.dorgaa@gmail.com','fahedouch',1,'fahedouch',1,'Player'),(2,'saidouch','fahed.dorgaa@gmail.com','aebc3ffd',1,'saidouch',1,'Player'),(3,'yoldes','fahed.dorgaa@gmail.com','aebc3ffd',1,'yoldesouch',1,'Player'),(4,'ahmed','fahed.dorgaa@gmail.com','aebc3ffd',1,'ahmedouch',0,'Player'),(5,'karim','fahed.dorgaa@gmail.com','aebc3ffd',1,'karimouch',1,'Player');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_footmatch`
--

LOCK TABLES `user_footmatch` WRITE;
/*!40000 ALTER TABLE `user_footmatch` DISABLE KEYS */;
INSERT INTO `user_footmatch` VALUES (1,'fahedouch',1,3),(1,'fahedouch',3,0),(2,'saidouch',1,1),(3,'yoldesouch',2,1),(4,'ahmedouch',2,0),(4,'ahmedouch',3,0);
/*!40000 ALTER TABLE `user_footmatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_tournement`
--

LOCK TABLES `user_tournement` WRITE;
/*!40000 ALTER TABLE `user_tournement` DISABLE KEYS */;
INSERT INTO `user_tournement` VALUES (1,'fahedouch',1,1,1,1,1,1,'1',1,1,0),(2,'saidouch',2,1,1,1,1,1,'1',1,1,0);
/*!40000 ALTER TABLE `user_tournement` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-19 20:26:19
