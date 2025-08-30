<?php
require_once '../includes/auth.php';
require_once '../includes/data.php';

header('Content-Type: application/json');

if (!isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$user = getCurrentUser();

try {
    $data = [
        'success' => true,
        'availableCredits' => getAvailableCredits(),
        'transactions' => getTransactions(),
        'retiredCredits' => getRetiredCredits()
    ];
    
    // Add user-specific data based on role
    if ($user['role'] === 'buyer') {
        $data['userPurchases'] = getUserPurchases($user['username']);
    }
    
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch data']);
}
?>