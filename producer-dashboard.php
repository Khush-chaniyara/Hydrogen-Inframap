<?php
require_once 'includes/auth.php';
require_once 'includes/data.php';

requireRole('producer');
include 'includes/header.php';
?>

<div class="mb-4">
    <h2 class="fw-bold">Producer Dashboard</h2>
    <p class="text-muted">Welcome to your producer dashboard</p>
</div>

<div class="row justify-content-center">
    <div class="col-lg-8">
        <!-- Production Form -->
        <div class="card" id="production-form">
            <div class="card-header text-center">
                <div class="bg-primary-green bg-opacity-10 rounded-3 p-3 d-inline-flex mb-3">
                    <i class="bi bi-bar-chart text-primary-green fs-4"></i>
                </div>
                <h4 class="card-title fw-bold">Record Hydrogen Production</h4>
                <p class="card-text text-muted">Submit your hydrogen production data to generate carbon credits</p>
            </div>
            <div class="card-body">
                <form id="production-form-element">
                    <div class="mb-4">
                        <label for="batchId" class="form-label fw-medium">Hydrogen Batch ID *</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-box text-muted"></i>
                            </span>
                            <input type="text" class="form-control" id="batchId" name="batchId" 
                                   placeholder="e.g., H2-2024-001" required>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="units" class="form-label fw-medium">Units Produced (kg) *</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-bar-chart text-muted"></i>
                            </span>
                            <input type="number" class="form-control" id="units" name="units" 
                                   placeholder="Enter production quantity" min="1" required>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="date" class="form-label fw-medium">Production Date *</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-calendar text-muted"></i>
                            </span>
                            <input type="date" class="form-control" id="date" name="date" 
                                   max="<?php echo date('Y-m-d'); ?>" required>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary-green w-100 py-2">
                        <i class="bi bi-bar-chart me-2"></i>
                        Submit Production
                    </button>
                </form>
            </div>
        </div>

        <!-- Confirmation Card (Hidden initially) -->
        <div class="card fade-in-up" id="confirmation-card" style="display: none;">
            <div class="card-header text-center">
                <div class="bg-success bg-opacity-10 rounded-circle p-4 d-inline-flex mb-3">
                    <i class="bi bi-check-circle text-success fs-1"></i>
                </div>
                <h4 class="card-title text-success fw-bold">Production Successfully Recorded!</h4>
                <p class="card-text text-muted">Your hydrogen production has been verified and carbon credits have been generated</p>
            </div>
            <div class="card-body">
                <div class="bg-light rounded-3 p-4 mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="fw-medium text-muted">Status:</span>
                        <span class="badge bg-success">Confirmed</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-start">
                        <span class="fw-medium text-muted">Transaction Hash:</span>
                        <div class="text-end">
                            <code class="text-truncate-hash bg-white px-2 py-1 rounded border" id="transaction-hash"></code>
                            <a href="#" id="etherscan-link" target="_blank" class="btn btn-outline-secondary btn-sm ms-2">
                                <i class="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h6 class="fw-medium">What happens next?</h6>
                    <ul class="text-muted small">
                        <li class="mb-2">Your carbon credits are now available for purchase in the marketplace</li>
                        <li class="mb-2">Buyers can view and purchase your verified credits</li>
                        <li>All transactions are recorded on the blockchain for transparency</li>
                    </ul>
                </div>

                <div class="d-grid gap-2 d-md-flex">
                    <button class="btn btn-outline-secondary flex-fill" onclick="goBackToForm()">
                        <i class="bi bi-arrow-left me-2"></i>
                        Record Another Production
                    </button>
                    <a href="#" id="etherscan-link-2" target="_blank" class="btn btn-primary-green flex-fill">
                        <i class="bi bi-box-arrow-up-right me-2"></i>
                        View on Blockchain
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>