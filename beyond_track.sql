-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2026 at 04:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beyond_track`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category` enum('racer','spectator','vendor') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `category`, `created_at`, `updated_at`) VALUES
(1, 'mark', 'cabbage', 'tsamark96@gmail.com', '$2y$10$CZr2J0C5TXhE89zRZivjs.zVjRZRdU1TSOBovKrPC10VumqTBuPUK', 'racer', '2026-04-15 14:12:10', '2026-04-15 14:12:10'),
(2, 'john', 'doe', 'admin@gmail.com', '$2y$10$c.qKAuFc0TDVhJDoopH54.dHT.eWFPK5YB1eE8t0RBYmoM6e.VzUa', 'racer', '2026-04-16 06:57:55', '2026-04-16 06:57:55'),
(3, 'manasseh', 'kim', 'kimmanasseh77@gmail.com', '$2y$10$FBs2MgPICo4r2AFsGKOQXeOXL29SmWNm79141jVXGJOTUhEK6Y4MG', 'spectator', '2026-04-16 08:31:23', '2026-04-16 08:31:23'),
(4, 'john', 'doe', 'tsamark22@gmail.com', '$2y$10$wYgKTOW5UpCsYY5maZpQMesAQjkB7he8QMW6k65rfrfCiqQqhhQF2', 'vendor', '2026-04-16 13:37:25', '2026-04-16 13:37:25'),
(5, 'johnn', 'doe', 'tsamark227@gmail.com', '$2y$10$DiIOuGbCTtTl6C.5HbRmruyuk.Bfdtqkdyy1zCNuLW9TvEN.p5u9a', 'vendor', '2026-04-16 13:40:20', '2026-04-16 13:40:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_category` (`category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
