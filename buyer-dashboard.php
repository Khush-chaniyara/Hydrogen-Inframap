<?php
require_once 'includes/auth.php';
require_once 'includes/data.php';

requireRole('buyer');

$availableCredits = getAvailableCredits();
$userPurchases = getUserPurchases(getCurrentUser()['username']);
$userTransactions = array_filter(getTransactions(), function($tx) {
    return $tx['buyer'] === getCurrentUser()['username'];
});

$totalSpent = array_sum(array_column($userTransactions, 'price'));
$totalCredits = array_sum(array_column($userPurchases, 'units'));

include 'includes/header.php';
?>

<div class="mb-4">
    <h2 class="fw-bold">Buyer Dashboard</h2>
    <p class="text-muted">Welcome to your buyer dashboard</p>
</div>

<!-- Available Credits -->
<div class="card mb-4">
    <div class="card-header">
        <div class="d-flex align-items-center">
            <i class="bi bi-leaf text-success me-2"></i>
            <h5 class="card-title mb-0 fw-bold">Available Carbon Credits</h5>
        </div>
        <p class="card-text text-muted mb-0">Browse and purchase carbon credits from verified producers</p>
    </div>
    <div class="card-body">
        <?php if (empty($availableCredits)): ?>
        <div class="text-center py-5">
            <div class="bg-light rounded-circle p-4 d-inline-flex mb-3">
                <i class="bi bi-leaf fs-2 text-muted"></i>
            </div>
            <p class="text-muted">No carbon credits available at the moment</p>
        </div>
        <?php else: ?>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Credit ID</th>
                        <th>Producer</th>
                        <th>Units</th>
                        <th>Price/Unit</th>
                        <th>Total Value</th>
                        <th>Production Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="available-credits-tbody">
                    <?php foreach ($availableCredits as $credit): ?>
                    <tr>
                        <td>
                            <code class="small bg-light px-2 py-1 rounded"><?php echo htmlspecialchars($credit['id']); ?></code>
                        </td>
                        <td>
                            <div class="fw-medium"><?php echo htmlspecialchars($credit['producer']); ?></div>
                            <small class="text-muted">Batch: <?php echo htmlspecialchars($credit['batchId']); ?></small>
                        </td>
                        <td>
                            <span class="fw-medium"><?php echo $credit['units']; ?></span>
                            <small class="text-muted">kg CO₂</small>
                        </td>
                        <td class="fw-medium">$<?php echo number_format($credit['price'], 2); ?></td>
                        <td class="fw-medium text-primary-green">
                            $<?php echo number_format($credit['price'] * $credit['units'], 2); ?>
                        </td>
                        <td><?php echo date('M j, Y', strtotime($credit['productionDate'])); ?></td>
                        <td>
                            <span class="badge status-available text-white me-2">Available</span>
                            <button class="btn btn-primary-green btn-sm" 
                                    onclick="buyCredit('<?php echo $credit['id']; ?>', <?php echo $credit['units']; ?>, <?php echo $credit['price']; ?>)">
                                <i class="bi bi-cart-plus me-1"></i>Buy
                            </button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php endif; ?>
    </div>
</div>

<!-- Purchase History -->
<div class="card">
    <div class="card-header">
        <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex align-items-center">
                <i class="bi bi-clock-history text-primary me-2"></i>
                <h5 class="card-title mb-0 fw-bold">Purchase History</h5>
            </div>
            <div class="d-flex gap-4">
                <div class="text-center">
                    <div class="h5 fw-bold text-primary-green mb-0"><?php echo $totalCredits; ?></div>
                    <small class="text-muted">Credits Owned</small>
                </div>
                <div class="text-center">
                    <div class="h5 fw-bold text-primary mb-0">$<?php echo number_format($totalSpent, 2); ?></div>
                    <small class="text-muted">Total Spent</small>
                </div>
            </div>
        </div>
        <p class="card-text text-muted mb-0">Your carbon credit purchase transactions</p>
    </div>
    <div class="card-body">
        <?php if (empty($userPurchases)): ?>
        <div class="text-center py-5">
            <div class="bg-light rounded-circle p-4 d-inline-flex mb-3">
                <i class="bi bi-bag fs-2 text-muted"></i>
            </div>
            <p class="text-muted">No purchases yet</p>
            <small class="text-muted">Browse available credits above to make your first purchase</small>
        </div>
        <?php else: ?>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Credit ID</th>
                        <th>Producer</th>
                        <th>Units</th>
                        <th>Amount Paid</th>
                        <th>Purchase Date</th>
                        <th>Status</th>
                        <th>Transaction</th>
                    </tr>
                </thead>
                <tbody id="purchase-history-tbody">
                    <?php foreach ($userPurchases as $credit): ?>
                    <tr>
                        <td>
                            <code class="small bg-light px-2 py-1 rounded"><?php echo htmlspecialchars($credit['id']); ?></code>
                        </td>
                        <td>
                            <div class="fw-medium"><?php echo htmlspecialchars($credit['producer']); ?></div>
                            <small class="text-muted">Batch: <?php echo htmlspecialchars($credit['batchId']); ?></small>
                        </td>
                        <td>
                            <span class="fw-medium"><?php echo $credit['units']; ?></span>
                            <small class="text-muted">kg CO₂</small>
                        </td>
                        <td class="fw-medium text-primary-green">
                            $<?php echo number_format($credit['price'] * $credit['units'], 2); ?>
                        </td>
                        <td><?php echo date('M j, Y', strtotime($credit['purchaseDate'])); ?></td>
                        <td>
                            <span class="badge status-completed text-white">Completed</span>
                        </td>
                        <td>
                            <?php if ($credit['transactionHash']): ?>
                            <a href="https://polygonscan.com/tx/<?php echo $credit['transactionHash']; ?>" 
                               target="_blank" class="btn btn-outline-secondary btn-sm">
                                <i class="bi bi-box-arrow-up-right"></i>
                            </a>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php endif; ?>
    </div>
</div>

<?php include 'includes/footer.php'; ?>