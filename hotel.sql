-- Markben Hotel database
-- Import with phpMyAdmin (Import tab) or:  mysql -u root < hotel.sql

CREATE DATABASE IF NOT EXISTS hotel
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE hotel;

CREATE TABLE IF NOT EXISTS hotelbooks (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname    VARCHAR(100) NOT NULL,
  lastname     VARCHAR(100) NOT NULL,
  arrival      DATE         NOT NULL,
  departure    DATE         NOT NULL,
  adults       TINYINT UNSIGNED NOT NULL DEFAULT 1,
  children     TINYINT UNSIGNED NOT NULL DEFAULT 0,
  rooms        TINYINT UNSIGNED NOT NULL DEFAULT 1,
  roompackage  VARCHAR(50)  NOT NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
