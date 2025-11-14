<?php
include 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['projectName'] ?? '';
    $description = $_POST['projectDescription'] ?? '';
    $technology = $_POST['projectTech'] ?? '';
    
    $database = new Database();
    $conn = $database->getConnection();
    
    $query = "INSERT INTO projects (name, description, technology) 
              VALUES (:name, :description, :technology)";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':technology', $technology);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'تم حفظ المشروع بنجاح']);
    } else {
        echo json_encode(['success' => false, 'message' => 'حدث خطأ في حفظ المشروع']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'طريقة غير مسموحة']);
}
?>