-- -- Customer Documents
-- CREATE TABLE `users` (
--   `user_id` int NOT NULL AUTO_INCREMENT,
--   `user_name` varchar(255) DEFAULT NULL,
--   `email` varchar(255) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `customer_profile_id` varchar(255) DEFAULT NULL,
--   `customer_documents_id` varchar(45) DEFAULT NULL,
--   `user_role_id` varchar(255) DEFAULT NULL,
--   `phone` bigint DEFAULT NULL,
--   `city` varchar(255) DEFAULT NULL,
--   `state` varchar(45) DEFAULT NULL,
--   `pincode` int DEFAULT NULL,
--   `country` varchar(45) DEFAULT NULL,
--   `profile_url` varchar(255) DEFAULT NULL,
--   `created_date_time` datetime DEFAULT NULL,
--   `updated_date_time` datetime DEFAULT NULL,
--   PRIMARY KEY (`user_id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,

  `customer_profile_id` int DEFAULT NULL,
  `customer_documents_id` varchar(45) DEFAULT NULL,
  

  `created_date_time` datetime DEFAULT NULL,
  `updated_date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Employees
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,

  `date_of_joining` date NOT NULL,
  `designation` varchar(255) NOT NULL,
  `salary` int NOT NULL,

  `created_date_time` datetime DEFAULT NULL,
  `updated_date_time` datetime DEFAULT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contracts
CREATE TABLE `contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `amount` int NOT NULL,
  
  `isApproved` tinyint NOT NULL,
  `comment` varchar(255) NOT NULL,


  `payment_date` date NOT NULL,
  `payment_order_id` varchar(255) NOT NULL,
  `invoice_provider_id` int NOT NULL,    -- Employee id
  `invoice_provider_name` varchar(255) NOT NULL,  -- Employee name
  `created_by` varchar(255) NOT NULL,

  `created_date_time` datetime NOT NULL,
  `updated_date_time` datetime NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  FOREIGN KEY (`invoice_provider_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Invoices
CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `contract_id` int NOT NULL,

  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  `comment` varchar(255) NOT NULL,

  `invoice_number` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `payment_date` date NOT NULL,
  `payment_order_id` varchar(255) NOT NULL,
  
  `invoice_provider_id` int NOT NULL,    -- Employee ID
  `invoice_provider_name` varchar(255) NOT NULL,  -- Employee Name
  
  `created_by` varchar(255) NOT NULL,
  `created_date_time` datetime NOT NULL,
  `updated_date_time` datetime NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  FOREIGN KEY (`invoice_provider_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- -- create dummy users with random names and emails.
-- INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `user_name`, `email`, `password`, `customer_profile_id`, `customer_documents_id`, `user_role_id`, `phone`, `city`, `state`, `pincode`, `country`, `profile_url`, `created_date_time`, `updated_date_time`, `user_role`) VALUES
-- (6, 'Neel', 'Aakash', 'Neel', 'neel@gmail.com', '$2a$10$CBPGh2/P8.Uk/lvCbKGHj.ViVdRozMGZkOAWyZoDx92VssKzWf2jW', NULL, NULL, NULL, 9874569856, 'Chennai', 'TamilNadu', 89568, 'India', NULL, NULL, NULL, 'client'),
-- (7, NULL, NULL, NULL, 'admin@finlo.com', '$2a$10$KErdE46lY5I1QkuW3QI3YOpFDx4a8gRI3CMjNXngEJUmgdyWcUNMa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin'),
-- (10, 'John', 'Martin', 'Martin', 'john@gmail.com', '$2a$10$lmhVjUCAYbHcB0kUeUiz3eRFNs46OQJKrLb9j8izyMOh3gZ4M0cry', NULL, NULL, NULL, 8896589632, 'Chennai', 'TamilNadu', 26166, 'India', NULL, NULL, NULL, 'client'),
-- (11, 'Max', 'Morris', 'Max Morris', 'm.morris@randatamail.com', '', NULL, NULL, NULL, 308211493, 'Anvile', 'Asjfilo', 892343, 'United Kingdom', NULL, NULL, NULL, 'client'),
-- (12, 'Mister', 'Morris', 'Max Morris', 'm.morris@gaamil.com', '', NULL, NULL, NULL, 98368974625, 'Fongl', 'Infksa', 321201, 'Finland', NULL, NULL, NULL, 'client');

-- create dummy employees with random names and emails.
INSERT INTO `employees` (`id`, `user_id`, `date_of_joining`, `designation`, `salary`, `created_date_time`, `updated_date_time`) VALUES
(1, 7, '2020-01-01', 'CEO', 100000, '2020-01-01 00:00:00', '2020-01-01 00:00:00'),
(2, 6, '2020-01-01', 'Manager', 50000, '2020-01-01 00:00:00', '2020-01-01 00:00:00'),
(3, 10, '2020-01-01', 'Manager', 50000, '2020-01-01 00:00:00', '2020-01-01 00:00:00');

-- create dummy customers with random names and emails.
INSERT INTO `customers` (`id`, `user_id`, `created_date_time`, `updated_date_time`) VALUES
(1, 11, '2020-01-01 00:00:00', '2020-01-01 00:00:00'),
(2, 12, '2020-01-01 00:00:00', '2020-01-01 00:00:00');

-- create dummy contracts with random names and emails.
INSERT INTO `contracts` (`id`, `customer_id`, `amount`, `isApproved`, `comment`, `payment_date`, `payment_order_id`, `invoice_provider_id`, `invoice_provider_name`, `created_by`, `created_date_time`, `updated_date_time`) VALUES
(1, 1, 10000, 1, 'Approved', '2020-01-01', '123456789', 2, 'Neel Aakash', 'Neel', '2020-01-01 00:00:00', '2020-01-01 00:00:00'),
(2, 2, 10000, 1, 'Approved', '2020-01-01', '123456789', 3, 'John Martin', 'John', '2020-01-01 00:00:00', '2020-01-01 00:00:00');

-- create dummy invoices with random names and emails.
INSERT INTO `invoices` (`id`, `customer_id`, `contract_id`, `isApproved`, `comment`, `invoice_number`, `amount`, `payment_date`, `payment_order_id`, `invoice_provider_id`, `invoice_provider_name`, `created_by`, `created_date_time`, `updated_date_time`) VALUES
(1, 1, 1, 1, 'Approved', '123456789', 10000, '2020-01-01', '123456789', 2, 'Neel Aakash', 'Neel', '2020-01-01 00:00:00', '2020-01-01 00:00:00'),
(2, 2, 2, 1, 'Approved', '123456789', 10000, '2020-01-01', '123456789', 3, 'John Martin', 'John', '2020-01-01 00:00:00', '2020-01-01 00:00:00');
