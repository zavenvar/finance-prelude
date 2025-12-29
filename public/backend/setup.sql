-- Pinnacle Financial Database Setup
-- Run this SQL on your MySQL server to create the required tables

CREATE DATABASE IF NOT EXISTS pinnacle_financial;
USE pinnacle_financial;

-- Site content table
CREATE TABLE IF NOT EXISTS site_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_key VARCHAR(255) UNIQUE NOT NULL,
    content_value LONGTEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Dynamic pages table
CREATE TABLE IF NOT EXISTS dynamic_pages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    status ENUM('Published', 'Draft') DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Static page overrides table
CREATE TABLE IF NOT EXISTS static_page_overrides (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    status ENUM('Published', 'Draft') DEFAULT 'Published',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status ENUM('New', 'Read', 'Replied') DEFAULT 'New',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    role ENUM('Admin', 'Editor') DEFAULT 'Editor',
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (username: admin, password: admin123)
INSERT INTO admin_users (username, password_hash, name, email, role, status)
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@example.com', 'Admin', 'Active')
ON DUPLICATE KEY UPDATE username = username;

-- Index for faster queries
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_dynamic_pages_path ON dynamic_pages(path);
CREATE INDEX idx_static_overrides_path ON static_page_overrides(path);
