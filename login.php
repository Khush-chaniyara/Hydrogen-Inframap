<?php
require_once 'includes/auth.php';

// Redirect if already logged in
if (isLoggedIn()) {
    $user = getCurrentUser();
    header('Location: ' . $user['role'] . '-dashboard.php');
    exit;
}

$error = '';

if ($_POST) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (login($username, $password)) {
        $user = getCurrentUser();
        header('Location: ' . $user['role'] . '-dashboard.php');
        exit;
    } else {
        $error = "Please use 'producer', 'buyer', or 'regulator' in your username";
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container-fluid vh-100">
        <div class="row h-100">
            <!-- Left side - Hero section -->
            <div class="col-lg-8 hero-section text-white d-flex align-items-center">
                <div class="hero-content p-5">
                    <div class="mb-5">
                        <div class="d-flex align-items-center mb-4">
                            <div class="feature-icon rounded-3 p-3 me-3">
                                <i class="bi bi-leaf fs-2"></i>
                            </div>
                            <div>
                                <h1 class="h2 mb-0 fw-bold">Green Ledger</h1>
                                <p class="mb-0 opacity-75">Carbon Credit Platform</p>
                            </div>
                        </div>
                        
                        <h2 class="display-5 fw-bold mb-4 lh-base">
                            Transparent, blockchain-powered carbon credit trading for a sustainable future
                        </h2>
                    </div>

                    <div class="row mb-5">
                        <div class="col-md-4 mb-4">
                            <div class="d-flex align-items-start">
                                <div class="feature-icon rounded-3 p-2 me-3">
                                    <i class="bi bi-lightning-charge"></i>
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-2">Producer Portal</h5>
                                    <p class="small opacity-75 mb-0">
                                        Record hydrogen production and generate verified carbon credits instantly
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-4">
                            <div class="d-flex align-items-start">
                                <div class="feature-icon rounded-3 p-2 me-3">
                                    <i class="bi bi-globe"></i>
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-2">Buyer Marketplace</h5>
                                    <p class="small opacity-75 mb-0">
                                        Browse and purchase carbon credits from verified producers
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-4">
                            <div class="d-flex align-items-start">
                                <div class="feature-icon rounded-3 p-2 me-3">
                                    <i class="bi bi-shield-check"></i>
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-2">Regulatory Oversight</h5>
                                    <p class="small opacity-75 mb-0">
                                        Complete transparency with real-time transaction monitoring
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Stats -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="stats-card rounded-4 p-4">
                                <div class="row text-center">
                                    <div class="col-4">
                                        <div class="h3 fw-bold mb-1">1,234</div>
                                        <div class="small opacity-75">Credits Traded</div>
                                    </div>
                                    <div class="col-4">
                                        <div class="h3 fw-bold mb-1">156</div>
                                        <div class="small opacity-75">Producers</div>
                                    </div>
                                    <div class="col-4">
                                        <div class="h3 fw-bold mb-1">89</div>
                                        <div class="small opacity-75">Buyers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right side - Login form -->
            <div class="col-lg-4 bg-white d-flex align-items-center justify-content-center">
                <div class="w-100" style="max-width: 400px;">
                    <div class="text-center mb-5">
                        <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                            <i class="bi bi-leaf text-success fs-2"></i>
                        </div>
                        <h2 class="h3 fw-bold mb-2">Welcome Back</h2>
                        <p class="text-muted">Sign in to your Green Ledger account</p>
                    </div>

                    <?php if ($error): ?>
                    <div class="alert alert-danger">
                        <i class="bi bi-exclamation-circle me-2"></i>
                        <?php echo htmlspecialchars($error); ?>
                    </div>
                    <?php endif; ?>

                    <form method="POST" class="mb-4">
                        <div class="mb-3">
                            <label for="username" class="form-label fw-medium">Username</label>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-person text-muted"></i>
                                </span>
                                <input type="text" class="form-control" id="username" name="username" 
                                       placeholder="Enter username (producer, buyer, or regulator)" required>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="password" class="form-label fw-medium">Password</label>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-lock text-muted"></i>
                                </span>
                                <input type="password" class="form-control" id="password" name="password" 
                                       placeholder="Enter your password" required>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary-green w-100 py-2 fw-medium">
                            Sign In
                        </button>
                    </form>

                    <div class="text-center mb-4">
                        <p class="text-muted small">
                            Don't have an account? 
                            <a href="#" class="text-decoration-none fw-medium">Sign up</a>
                        </p>
                    </div>

                    <div class="bg-light rounded-3 p-3">
                        <p class="small text-muted text-center mb-2"><strong>Demo Users:</strong></p>
                        <div class="small">
                            <div class="mb-1">• <strong>producer</strong> - Access Producer Dashboard</div>
                            <div class="mb-1">• <strong>buyer</strong> - Access Buyer Dashboard</div>
                            <div>• <strong>regulator</strong> - Access Regulator Dashboard</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>