<?php
require_once 'auth.php';
$user = getCurrentUser();

function getRoleBadgeClass($role) {
    switch ($role) {
        case 'producer': return 'bg-success text-white';
        case 'buyer': return 'bg-primary text-white';
        case 'regulator': return 'bg-secondary text-white';
        default: return 'bg-light text-dark';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Green Ledger - Carbon Credit Platform</title>
    <meta name="description" content="Transparent, blockchain-powered carbon credit trading platform for sustainable hydrogen production and environmental compliance.">
    <meta name="keywords" content="carbon credits, hydrogen production, blockchain, sustainability, environmental compliance">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body class="bg-light">
    <header class="border-bottom bg-white shadow-sm">
        <div class="container py-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="bg-success rounded-3 p-2 me-3">
                            <i class="bi bi-leaf text-white fs-5"></i>
                        </div>
                        <div>
                            <h1 class="h4 mb-0 fw-bold">Green Ledger</h1>
                            <small class="text-muted">Carbon Credit Platform</small>
                        </div>
                    </div>
                </div>
                
                <?php if ($user): ?>
                <div class="d-flex align-items-center">
                    <span class="badge <?php echo getRoleBadgeClass($user['role']); ?> me-3">
                        <?php echo ucfirst($user['role']); ?>
                    </span>
                    <span class="text-muted me-3">
                        Welcome, <?php echo htmlspecialchars($user['username']); ?>
                    </span>
                    <a href="api/logout.php" class="btn btn-outline-secondary btn-sm">
                        <i class="bi bi-box-arrow-right me-1"></i>
                        Logout
                    </a>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </header>

    <main class="container my-4">