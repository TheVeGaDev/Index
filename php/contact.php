<?php
include 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $service_type = $_POST['service'] ?? '';
    $message = $_POST['message'] ?? '';
    
    $database = new Database();
    $conn = $database->getConnection();
    
    $query = "INSERT INTO messages (name, email, service_type, message) 
              VALUES (:name, :email, :service_type, :message)";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':service_type', $service_type);
    $stmt->bindParam(':message', $message);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'تم إرسال رسالتك بنجاح']);
    } else {
        echo json_encode(['success' => false, 'message' => 'حدث خطأ في الإرسال']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'طريقة غير مسموحة']);
}
?>