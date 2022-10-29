
CREATE TABLE `costumers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `customer_profile_id` varchar(255) DEFAULT NULL,
  `customer_documents_id` varchar(45) DEFAULT NULL,
  
  `phone` bigint DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  
  `created_date_time` datetime DEFAULT NULL,
  `updated_date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Employees
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zipcode` varchar(255) NOT NULL,
  `date_of_joining` date NOT NULL,
  `designation` varchar(255) NOT NULL,
  `salary` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Invoices
CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custumer_id` int NOT NULL,
  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  `invoice_number` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `payment_date` date NOT NULL,
  `payment_order_id` varchar(255) NOT NULL,
  `invoice_provider_id` varchar(255) NOT NULL,    -- Employee ID
  `invoice_provider_name` varchar(255) NOT NULL,  -- Employee Name
  `created_by` varchar(255) NOT NULL,
  `created_date_time` datetime NOT NULL,
  `updated_date_time` datetime NOT NULL,
  `comment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`custumer_id`) REFERENCES `costumers` (`id`),
  FOREIGN KEY (`invoice_provider_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contracts
CREATE TABLE `contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custumer_id` int NOT NULL,
  `amount` int NOT NULL,
  `payment_date` date NOT NULL,
  `payment_order_id` varchar(255) NOT NULL,
  `invoice_provider_id` varchar(255) NOT NULL,    -- Employee id
  `invoice_provider_name` varchar(255) NOT NULL,  -- Employee name
  `created_by` varchar(255) NOT NULL,
  `created_date_time` datetime NOT NULL,
  `updated_date_time` datetime NOT NULL,
  `comment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`custumer_id`) REFERENCES `costumers` (`id`),
  FOREIGN KEY (`invoice_provider_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
