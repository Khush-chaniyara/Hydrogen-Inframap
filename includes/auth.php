<?php
session_start();

function isLoggedIn() {
    return isset($_SESSION['user']);
}

function getCurrentUser() {
    return $_SESSION['user'] ?? null;
}

function login($username, $password) {
    // Simple role-based authentication
    $role = null;
    
    if (stripos($username, 'producer') !== false) {
        $role = 'producer';
    } elseif (stripos($username, 'buyer') !== false) {
        $role = 'buyer';
    } elseif (stripos($username, 'regulator') !== false) {
        $role = 'regulator';
    } else {
        return false;
    }
    
    $_SESSION['user'] = [
        'username' => $username,
        'role' => $role
    ];
    
    return true;
}

function logout() {
    session_destroy();
}

function requireAuth() {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}

function requireRole($role) {
    requireAuth();
    $user = getCurrentUser();
    if ($user['role'] !== $role) {
        header('Location: index.php');
        exit;
    }
}
?>