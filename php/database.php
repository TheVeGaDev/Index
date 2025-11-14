<?php
class Database {
    private $host = "localhost";
    private $db_name = "vega_system";
    private $username = "vega_admin";
    private $password = "secure_password_123";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }

    public function createTables() {
        try {
            $conn = $this->getConnection();
            
            // Projects table
            $sql = "CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                technology VARCHAR(50),
                image VARCHAR(255),
                status VARCHAR(50) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )";
            
            $conn->exec($sql);
            
            // Services table
            $sql = "CREATE TABLE IF NOT EXISTS services (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                icon VARCHAR(100),
                technology VARCHAR(50),
                status VARCHAR(50) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )";
            
            $conn->exec($sql);
            
            // Messages table
            $sql = "CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                service_type VARCHAR(100),
                message TEXT,
                status VARCHAR(50) DEFAULT 'unread',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )";
            
            $conn->exec($sql);
            
            // Team members table
            $sql = "CREATE TABLE IF NOT EXISTS team_members (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                role VARCHAR(255),
                skills TEXT,
                telegram VARCHAR(255),
                avatar VARCHAR(255),
                status VARCHAR(50) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )";
            
            $conn->exec($sql);
            
            // Admin users table
            $sql = "CREATE TABLE IF NOT EXISTS admin_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )";
            
            $conn->exec($sql);
            
            // Insert default admin user
            $this->createDefaultAdmin();
            
        } catch(PDOException $exception) {
            echo "Error creating tables: " . $exception->getMessage();
        }
    }
    
    private function createDefaultAdmin() {
        $conn = $this->getConnection();
        
        // Check if admin already exists
        $query = "SELECT COUNT(*) FROM admin_users WHERE username = 'admin'";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        
        if ($stmt->fetchColumn() == 0) {
            // Create default admin
            $query = "INSERT INTO admin_users (username, password) VALUES (:username, :password)";
            $stmt = $conn->prepare($query);
            
            $username = "admin";
            $password = password_hash("vega2024", PASSWORD_DEFAULT);
            
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":password", $password);
            
            $stmt->execute();
        }
    }
}
?>