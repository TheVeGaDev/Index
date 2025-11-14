<?php
include 'database.php';

header('Content-Type: application/json');

$database = new Database();
$conn = $database->getConnection();

$query = "SELECT * FROM projects WHERE status = 'active' ORDER BY created_at DESC";
$stmt = $conn->prepare($query);
$stmt->execute();

$projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($projects);
?>