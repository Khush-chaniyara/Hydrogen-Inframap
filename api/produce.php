<?php
require_once '../includes/auth.php';
require_once '../includes/data.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

if (!isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$user = getCurrentUser();
if ($user['role'] !== 'producer') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Access denied']);
    exit;
}

$batchId = $_POST['batchId'] ?? '';
$units = $_POST['units'] ?? '';
$date = $_POST['date'] ?? '';

if (empty($batchId) || empty($units) || empty($date)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!is_numeric($units) || $units <= 0) {
    echo json_encode(['success' => false, 'message' => 'Units must be a positive number']);
    exit;
}

try {
    // Simulate processing delay
    usleep(500000); // 0.5 second delay
    
    $transactionHash = addProduction($batchId, $units, $date, $user['username']);
    
    echo json_encode([
        'success' => true,
        'message' => 'Production recorded successfully',
        'transactionHash' => $transactionHash
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to record production']);
}
?>