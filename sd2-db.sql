-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 30, 2022 at 09:54 AM
-- Server version: 8.0.24
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sd2-db`
--

-- --------------------------------------------------------

-- Create Platforms Table
CREATE TABLE IF NOT EXISTS platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create Tags Table
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Insert Platform Data
INSERT INTO platforms (name) VALUES
    ('Windows'),
    ('Android'),
    ('Game Boy'),
    ('Game Boy Color'),
    ('Game Boy Advance'),
    ('Nintendo 64'),
    ('Nintendo GameCube'),
    ('Nintendo Wii'),
    ('Nintendo Wii U'),
    ('Nintendo Switch'),
    ('PlayStation'),
    ('PlayStation 2'),
    ('PlayStation 3'),
    ('PlayStation 4'),
    ('PlayStation 5'),
    ('Xbox'),
    ('Xbox 360'),
    ('Xbox One'),
    ('Xbox Series X/S'),
    ('Nintendo DS'),
    ('Nintendo 3DS'),
    ('New Nintendo 3DS'),
    ('PlayStation Portable'),
    ('PlayStation Vita'),
    ('Sega Genesis'),
    ('Sega Saturn'),
    ('Sega Dreamcast'),
    ('Sega Game Gear'),
    ('Sega Master System'),
    ('Sega CD'),
    ('Sega 32X'),


-- Insert Tag Data (Extracted from your screenshot)
INSERT INTO tags (name) VALUES
    ('Action'),
    ('Action Adventure'),
    ('Adventure'),
    ('Hardware'),
    ('Miscellaneous'),
    ('Puzzle'),
    ('Racing'),
    ('Role-Playing'),
    ('Simulation'),
    ('Sports'),
    ('Strategy')