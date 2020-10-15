-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER','2020-10-14 07:56:10','2020-10-14 07:56:10'),(2,'ADMIN','2020-10-14 07:56:10','2020-10-14 07:56:10');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('2020-10-14 08:28:31','2020-10-14 08:28:31',1,7),('2020-10-14 08:28:56','2020-10-14 08:28:56',1,8),('2020-10-14 10:03:09','2020-10-14 10:03:09',1,9),('2020-10-14 11:56:43','2020-10-14 11:56:43',1,10),('2020-10-14 11:58:42','2020-10-14 11:58:42',1,12),('2020-10-14 08:13:52','2020-10-14 08:13:52',2,2),('2020-10-14 11:57:25','2020-10-14 11:57:25',2,11);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `entitlements` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin','admin','admin@gmail.com','$2a$08$nEZvGajoYFs9nFS4WK.BfelyeWUEEIAEt3Oy8MUIt/PMQxxgSiO8q','[\"can_view_users\",\"can_edit_users\",\"can_delete_users\",\"can_view_details\",\"can_view_details_full\",\"can_edit_users_full\"]','2020-10-14 08:13:52','2020-10-14 08:13:52'),(7,'Ivan','ivanov','ii@gmail.com','$2a$08$9J8yh0t0tI6UTs.J28nfNeez7m9rWsFaykkMxI8fb0KdJETUoILBi','[\"can_view_users\",\"can_edit_users\",\"can_view_details\"]','2020-10-14 08:28:31','2020-10-15 12:55:04'),(8,'tom','tom','tom@gmail.com','$2a$08$fPVs0rP6AYmVzPYGHuSHfuoloBNL0lEwXY5WmSVxIV66oz2oemAFC','[\"can_view_users\",\"can_delete_users\"]','2020-10-14 08:28:56','2020-10-14 08:28:56'),(9,'sai','sai','sai@gmail.com','$2a$08$Nxj2XkWoYbOGtv/F6dNM6u8Dpp/ajf3WmEa2bE58m.Gp4tO99znEu','[]','2020-10-14 10:03:09','2020-10-14 10:03:09'),(10,'petro','petro','pp@gmail.com','$2a$08$m4PrNvMMJEfCKef8mD2ec.bKnE.FxjdyGIl2hHzNhSMfDlywkLy.G','\"can_view_users\"','2020-10-14 11:56:43','2020-10-15 10:01:59'),(11,'Alina','ali','aa@gmail.com','$2a$08$wKLxtJduU5z2Z/bHPJdUh.sLmHHJIBL2of/lSy4SWjBOd/ckUu/nS','[\"can_view_users\",\"can_edit_users\",\"can_delete_users\",\"can_view_details\",\"can_view_details_full\",\"can_edit_users_full\"]','2020-10-14 11:57:25','2020-10-14 11:57:25'),(12,'olia','olia','oo@gmail.com','$2a$08$JLf//FI1Xuz9hWnvQQUWqeMqjaEudYAzuSnnieVqqpGp5KgEwh9Om','[]','2020-10-14 11:58:42','2020-10-14 11:58:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-15 14:55:55
