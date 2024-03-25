-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: linkedin_db
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_id` int DEFAULT NULL,
  `following_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `followers_users_FK` (`follower_id`),
  KEY `followers_users_FK_1` (`following_id`),
  CONSTRAINT `followers_users_FK` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followers_users_FK_1` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (9,2,3,'2024-03-24 23:47:21'),(16,2,4,'2024-03-25 11:57:14'),(26,3,1,'2024-03-25 15:27:05'),(28,7,3,'2024-03-25 15:33:06'),(29,3,5,'2024-03-25 15:47:44'),(30,3,4,'2024-03-25 15:47:48'),(33,3,7,'2024-03-25 18:36:15');
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_applications`
--

DROP TABLE IF EXISTS `job_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `applicant_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) DEFAULT 'applied',
  PRIMARY KEY (`id`),
  KEY `job_applications_users_FK` (`applicant_id`),
  KEY `job_applications_jobs_FK` (`job_id`),
  CONSTRAINT `job_applications_jobs_FK` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_applications_users_FK` FOREIGN KEY (`applicant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_applications`
--

LOCK TABLES `job_applications` WRITE;
/*!40000 ALTER TABLE `job_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `company_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `jobs_users_FK` (`company_id`),
  CONSTRAINT `jobs_users_FK` FOREIGN KEY (`company_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Human Resource Manager','Job Summary:\nThe Human Resource Manager will lead and direct the routine functions of the Human Resources (HR) department including hiring and interviewing staff, administering pay, benefits, and leave, and enforcing company policies and practices.\n\n\nSupervisory Responsibilities:\nRecruits, interviews, hires, and trains new staff in the department.\nOversees the daily workflow of the department.\nProvides constructive and timely performance evaluations.\nHandles discipline and termination of employees in accordance with company policy.\nDuties/Responsibilities:\nPartners with the leadership team to understand and execute the organization\'s human resource and talent strategy particularly as it relates to current and future talent needs, recruiting, retention, and succession planning.\nProvides support and guidance to HR generalists, management, and other staff when complex, specialized, and sensitive questions and issues arise; may be required to administer and execute routine tasks in delicate circumstances such as providing reasonable accommodations, investigating allegations of wrongdoing, and terminations.\nManages the talent acquisition process, which may include recruitment, interviewing, and hiring of qualified job applicants, particularly for managerial, exempt, and professional roles; collaborates with departmental managers to understand skills and competencies required for openings.\nAnalyzes trends in compensation and benefits; researches and proposes competitive base and incentive pay programs to ensure the organization attracts and retains top talent.\nCreates learning and development programs and initiatives that provide internal development opportunities for employees.\nOversees employee disciplinary meetings, terminations, and investigations.\nMaintains compliance with federal, state, and local employment laws and regulations, and recommended best practices; reviews policies and practices to maintain compliance.\nMaintains knowledge of trends, best practices, regulatory changes, and new technologies in human resources, talent management, and employment law.\nPerforms other duties as assigned.\nRequired Skills/Abilities:\nExcellent verbal and written communication skills.\nExcellent interpersonal, negotiation, and conflict resolution skills.\nExcellent organizational skills and attention to detail.\nStrong analytical and problem-solving skills.\nAbility to prioritize tasks and to delegate them when appropriate.\nAbility to act with integrity, professionalism, and confidentiality.\nThorough knowledge of employment-related laws and regulations.\nProficient with Microsoft Office Suite or related software.\nProficiency with or the ability to quickly learn the organizations HRIS and talent management systems.\nEducation and Experience:\nBachelor\'s degree in Human Resources, Business Administration, or related field required.\nA minimum of three years of human resource management experience preferred.\nSHRM-CP or SHRM-SCP highly desired.\n\nPhysical Requirements:\nProlonged periods of sitting at a desk and working on a computer.\nMust be able to lift 15 pounds at times.\nMust be able to access and navigate each department at the organization\'s facilities.',2,'2024-03-25 16:39:23'),(2,'Light Keeper','Some light keeper needed here',2,'2024-03-25 16:39:23');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_users_FK` (`user_id`),
  CONSTRAINT `posts_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'This is my first post! I have to write at least 64 characters for it to be accepted, though :(','2024-03-24 19:05:04',3),(2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat tristique est, vel laoreet lorem scelerisque non. Praesent eu turpis et erat gravida blandit vel vel neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus mi mi, hendrerit at nibh eget, ullamcorper volutpat justo. Proin neque leo, porta sit amet purus ac, mattis convallis dolor. Nam lacinia ante sed dui rutrum accumsan. Proin convallis pretium arcu, ac pharetra felis placerat non. Vestibulum nec congue arcu, vel elementum lorem. Maecenas eleifend nec purus sed accumsan. Nulla velit lacus, malesuada id ligula in, facilisis malesuada ipsum.\n\nVestibulum sed sem ut elit dictum euismod. Praesent leo arcu, pulvinar a sem eget, porta viverra nisi. Ut nec feugiat nisi, sit amet imperdiet mi. Curabitur cursus volutpat metus, vel mollis felis tempor ut. Fusce a eros purus. Curabitur bibendum fermentum augue, eu vehicula eros vestibulum sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum eu elit et nulla feugiat facilisis eget eget erat.','2024-03-24 19:11:25',2),(4,'Hey everyone, I\'m Harry!! How is everything going? HMU if you want an awesome programmer! ;)','2024-03-24 20:07:53',4),(5,'Need an office?\nVisit our site at https://beirutdigitaldistrict.com\nOr contact us at +961 01 123 456','2024-03-25 15:33:35',7);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
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
  `email` varchar(255) NOT NULL,
  `is_company` tinyint DEFAULT '0',
  `biography` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) DEFAULT NULL,
  `education` text,
  `skills` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Fr Pruitt','fr.pruitt@gmail.com',0,NULL,'2024-03-23 16:51:37','$2y$10$JnLDYLF31g.ORFYJclUBRuU93IsTen/bQAYrOR1H/AX1jmIdqo5sS',NULL,NULL),(2,'SE Factory','admin@sefactory.io',1,'Want to become a software engineer?\nSEF bootcamps train aspiring programmers to become job-ready, equipping them with the critical skills they need to get hired in the tech industry.','2024-03-23 16:53:40','$2y$10$BQVtZQZSmMSA8HvPjMhGXu4.xPlCIPm3XbeqhrNTKWBTp.FqSmz.q',NULL,NULL),(3,'Anthony','anthony@gmail.com',0,'Hello, my name is Anthony!\nWelcome to my profile.\nI like programming, gaming, and cats!','2024-03-23 17:10:15','$2y$10$BDGm/Q5WZpb.tkoc.faRgOUjvZmpaEKrBwucG1Obr1zQhv54qt3Sa','{\"school\":\"Antonine University\",\"field\":\"Marketing Management\",\"start_year\":\"2020\",\"end_year\":\"2023\"}','[\"PHP\",\"Laravel\",\"JS\",\"CSS\",\"HTML\",\"SQL\",\"NoSQL\",\"React\",\"Next.js\"]'),(4,'Harry','harry@gmail.com',0,'Hey everyone, I\'m Harry!\nI\'m a new programmer!','2024-03-24 20:06:33','$2y$10$lOESSWmMEAr194XMmZhgkur7oGb2rXjaHnxkKLl0FYMKBwcjwDz7a','[]','[\"JS\",\"CSS\",\"HTML\"]'),(5,'Millie','millie@gmail.com',0,NULL,'2024-03-25 12:51:35','$2y$10$gonUL4fioWgyWBQQ10yrUeTaicwUTt.EQQzHfPG1OL3lCU5zYK/qe',NULL,NULL),(6,'Lawrence.smith','lawrence.smith@gmail.com',0,NULL,'2024-03-25 12:53:51','$2y$10$.X.EU75yF3qEOi1lw.I2GOxnXza3mOW2lrGieyidPkFY6kx06oZYa',NULL,NULL),(7,'Beirut Digital District','linkedin@bdd.com',1,NULL,'2024-03-25 14:42:32','$2y$10$Tc0mKm1nwIRbtOKrxsBkW.HII4ZEY8uW85vnNio9y5R/R5Vv5Qn6y',NULL,NULL),(8,'Jennifer Lawrence','jennifer.lawrence192@gmail.com',0,NULL,'2024-03-25 15:39:52','$2y$10$nxBZYrb.drQ7c40z2tZHnOD.pjsEaeFY/ejJAHcGUvxsxCCRaz9ma',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'linkedin_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-25 19:05:59
