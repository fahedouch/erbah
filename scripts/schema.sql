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
  `club_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  PRIMARY KEY (`match_id`),
  KEY `fk_match_tournement1_idx` (`tournement_id`),
  CONSTRAINT `fk_match_tournement_id` FOREIGN KEY (`tournement_id`) REFERENCES `tournement` (`tournement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  PRIMARY KEY (`tournement_id`),
  KEY `fk_tournement_club1_idx` (`club_id`),
  CONSTRAINT `fk_tournement_club_id` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `club_id` int(11) NOT NULL,
  `user_pseudo` varchar(255) NOT NULL,
  `user_status_on` tinyint(1) DEFAULT 0,
  `user_role` varchar(45) DEFAULT 'Player',
  PRIMARY KEY (`user_id`,`user_pseudo`),
  KEY `fk_user_club1_idx` (`club_id`),
  CONSTRAINT `fk_user_club_id` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_footmatch`
--

DROP TABLE IF EXISTS `user_footmatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_footmatch` (
  `user_id` int(11) NOT NULL,
  `user_pseudo` varchar(255) NOT NULL,
  `match_id` int(11) NOT NULL,
  `user_goal` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`user_pseudo`,`match_id`),
  KEY `fk_user_has_footmatch_footmatch1_idx` (`match_id`),
  CONSTRAINT `fk_user_footmatch_match_id` FOREIGN KEY (`match_id`) REFERENCES `footmatch` (`match_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_footmatch_user_id` FOREIGN KEY (`user_id`, `user_pseudo`) REFERENCES `user` (`user_id`, `user_pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_tournement`
--

DROP TABLE IF EXISTS `user_tournement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tournement` (
  `user_id` int(11) NOT NULL,
  `user_pseudo` varchar(255) NOT NULL,
  `tournement_id` int(11) NOT NULL,
  `user_accepted_goal` int(11) DEFAULT NULL,
  `user_defeat` int(11) DEFAULT NULL,
  `user_difference` int(11) DEFAULT NULL,
  `user_goal_by_match` int(11) DEFAULT NULL,
  `user_goal_scored` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_null` int(11) DEFAULT NULL,
  `user_point` int(11) DEFAULT NULL,
  `user_victory` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`user_pseudo`,`tournement_id`),
  KEY `fk_user_tournement_tournement1_idx` (`tournement_id`),
  KEY `fk_user_tournement_user1_idx` (`user_id`,`user_pseudo`),
  CONSTRAINT `fk_user_tournement_tournement_id` FOREIGN KEY (`tournement_id`) REFERENCES `tournement` (`tournement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_tournement_user_id` FOREIGN KEY (`user_id`, `user_pseudo`) REFERENCES `user` (`user_id`, `user_pseudo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-19 20:24:35
