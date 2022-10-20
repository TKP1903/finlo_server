-- Customer Documents
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `customer_profile_id` varchar(255) DEFAULT NULL,
  `customer_documents_id` varchar(45) DEFAULT NULL,
  `user_role_id` varchar(255) DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `created_date_time` datetime DEFAULT NULL,
  `updated_date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- User Folders

CREATE TABLE `client_folders` (
  `client_folders_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `folder_name` varchar(255) NOT NULL,
  `folder_location` varchar(255) DEFAULT NULL,
  `created_date_time` datetime DEFAULT NULL,
  `updated_date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`client_folders_id`,`user_id`),
  UNIQUE KEY `folder_name_UNIQUE` (`folder_name`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- User Table

CREATE TABLE `users` (
  `id` int NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
