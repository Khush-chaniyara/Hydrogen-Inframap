<?php
require_once 'includes/auth.php';

// Redirect to appropriate dashboard if logged in
if (isLoggedIn()) {
    $user = getCurrentUser();
    header('Location: ' . $user['role'] . '-dashboard.php');
    exit;
} else {
    // Redirect to login if not logged in
    header('Location: login.php');
    exit;
}
?>