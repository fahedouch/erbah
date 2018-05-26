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
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club` (
  `club_id` int(11) NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`club_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footmatch`
--

DROP TABLE IF EXISTS `footmatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `footmatch` (
  `match_id` int(11) NOT NULL AUTO_INCREMENT,
  `match_date_start` varchar(45) DEFAULT NULL,
  `match_date_end` varchar(45) DEFAULT NULL,
  `tournement_id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  PRIMARY KEY (`match_id`,`club_id`),
  KEY `fk_match_tournement1_idx` (`tournement_id`),
  KEY `fk_footmatch_club1_idx` (`club_id`),
  CONSTRAINT `fk_footmatch_club_id` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_tournement_id` FOREIGN KEY (`tournement_id`) REFERENCES `tournement` (`tournement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footmatch`
--

LOCK TABLES `footmatch` WRITE;
/*!40000 ALTER TABLE `footmatch` DISABLE KEYS */;
INSERT INTO `footmatch` VALUES (1,'1234','1234',1,0),(2,'1234','1234',2,0),(3,'1234','1234',1,0);
/*!40000 ALTER TABLE `footmatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournement`
--

DROP TABLE IF EXISTS `tournement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournement` (
  `tournement_id` int(11) NOT NULL AUTO_INCREMENT,
  `tournement_date_start` varchar(45) DEFAULT NULL,
  `tournement_date_end` varchar(45) DEFAULT NULL,
  `club_id` int(11) NOT NULL,
  PRIMARY KEY (`tournement_id`,`club_id`),
  KEY `fk_tournement_club1_idx` (`club_id`),
  CONSTRAINT `fk_tournement_club_id` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournement`
--

LOCK TABLES `tournement` WRITE;
/*!40000 ALTER TABLE `tournement` DISABLE KEYS */;
INSERT INTO `tournement` VALUES (1,'12/10/2017','12/12/2019',0),(2,'12/10/2017','12/12/2018',0);
/*!40000 ALTER TABLE `tournement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `user_email` varchar(45) DEFAULT NULL,
  `user_password` varchar(45) DEFAULT NULL,
  `club_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`club_id`),
  KEY `fk_user_club1_idx` (`club_id`),
  CONSTRAINT `fk_user_club_id` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'fahed','fahed.dorgaa@gmail.com','kiki',0),(2,'said','fahed.dorgaa@gmail.com','kiki',0),(3,'yoldes','fahed.dorgaa@gmail.com','kiki',0),(4,'ahmed','fahed.dorgaa@gmail.com','kiki',0),(5,'karim','fahed.dorgaa@gmail.com','kiki',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_footmatch`
--

DROP TABLE IF EXISTS `user_footmatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_footmatch` (
  `user_id` int(11) NOT NULL,
  `match_id` int(11) NOT NULL,
  `user_goal` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`match_id`),
  KEY `fk_user_has_match_match1_idx` (`match_id`),
  KEY `fk_user_has_match_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_match_match_id` FOREIGN KEY (`match_id`) REFERENCES `footmatch` (`match_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_match_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_footmatch`
--

LOCK TABLES `user_footmatch` WRITE;
/*!40000 ALTER TABLE `user_footmatch` DISABLE KEYS */;
INSERT INTO `user_footmatch` VALUES (1,1,0),(1,3,2),(2,1,1),(3,2,1),(4,2,1),(4,3,0);
/*!40000 ALTER TABLE `user_footmatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tournement`
--

DROP TABLE IF EXISTS `user_tournement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tournement` (
  `user_id` int(11) NOT NULL,
  `tournement_id` int(11) NOT NULL,
  `user_point` int(11) DEFAULT NULL,
  `user_victory` int(11) DEFAULT NULL,
  `user_null` int(11) DEFAULT NULL,
  `user_defeat` int(11) DEFAULT NULL,
  `user_goal_scored` int(11) DEFAULT NULL,
  `user_difference` int(11) DEFAULT NULL,
  `user_goal_by_match` float DEFAULT NULL,
  `user_accepted_goal` int(11) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`tournement_id`),
  KEY `fk_user_has_tournement_tournement1_idx` (`tournement_id`),
  KEY `fk_user_has_tournement_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_tournement_tournement_id` FOREIGN KEY (`tournement_id`) REFERENCES `tournement` (`tournement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_tournement_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tournement`
--

LOCK TABLES `user_tournement` WRITE;
/*!40000 ALTER TABLE `user_tournement` DISABLE KEYS */;
INSERT INTO `user_tournement` VALUES (1,1,15,2,1,0,1,0,2,1,'fahed'),(2,1,10,2,1,0,1,0,2,1,'said'),(3,2,18,2,1,0,1,0,2,1,'ahmed'),(4,2,4,2,1,0,1,0,2,1,'yoldes');
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

-- Dump completed on 2018-04-14 22:37:57
