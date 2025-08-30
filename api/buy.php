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
if ($user['role'] !== 'buyer') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Access denied']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$creditId = $input['creditId'] ?? '';

if (empty($creditId)) {
    echo json_encode(['success' => false, 'message' => 'Credit ID is required']);
    exit;
}

// Check if credit exists and is available
$credits = getCredits();
$credit = null;
foreach ($credits as $c) {
    if ($c['id'] === $creditId) {
        $credit = $c;
        break;
    }
}

if (!$credit) {
    echo json_encode(['success' => false, 'message' => 'Credit not found']);
    exit;
}

if ($credit['status'] !== 'available') {
    echo json_encode(['success' => false, 'message' => 'Credit is not available for purchase']);
    exit;
}

try {
    // Simulate processing delay
    usleep(500000); // 0.5 second delay
    
    $transactionHash = buyCredit($creditId, $user['username']);
    
    echo json_encode([
        'success' => true,
        'message' => 'Credit purchased successfully',
        'transactionHash' => $transactionHash
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to purchase credit']);
}
?>