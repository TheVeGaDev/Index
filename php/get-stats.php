<?php
include 'database.php';

header('Content-Type: application/json');

$database = new Database();
$conn = $database->getConnection();

// Get projects count
$query = "SELECT COUNT(*) as count FROM projects WHERE status = 'active'";
$stmt = $conn->prepare($query);
$stmt->execute();
$projects = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

// Get services count
$query = "SELECT COUNT(*) as count FROM services WHERE status = 'active'";
$stmt = $conn->prepare($query);
$stmt->execute();
$services = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

// Get unread messages count
$query = "SELECT COUNT(*) as count FROM messages WHERE status = 'unread'";
$stmt = $conn->prepare($query);
$stmt->execute();
$messages = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

// Get team members count
$query = "SELECT COUNT(*) as count FROM team_members WHERE status = 'active'";
$stmt = $conn->prepare($query);
$stmt->execute();
$team = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

echo json_encode([
    'projects' => $projects,
    'services' => $services,
    'messages' => $messages,
    'team' => $team
]);
?>