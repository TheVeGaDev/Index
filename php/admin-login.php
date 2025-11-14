<?php
include 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';
    
    $database = new Database();
    $conn = $database->getConnection();
    
    $query = "SELECT * FROM admin_users WHERE username = :username";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($password, $user['password'])) {
            echo json_encode([
                'success' => true,
                'token' => bin2hex(random_bytes(16)),
                'user' => [
                    'username' => $user['username'],
                    'role' => $user['role']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'كلمة المرور غير صحيحة']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'اسم المستخدم غير موجود']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'طريقة غير مسموحة']);
}
?>