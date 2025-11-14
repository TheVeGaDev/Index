<?php
include 'database.php';

header('Content-Type: application/json');

$database = new Database();
$conn = $database->getConnection();

$query = "SELECT * FROM messages ORDER BY created_at DESC";
$stmt = $conn->prepare($query);
$stmt->execute();

$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($messages);
?>