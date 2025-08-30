<?php
require_once 'includes/auth.php';
require_once 'includes/data.php';

requireRole('regulator');

$transactions = getTransactions();
$retiredCredits = getRetiredCredits();

$totalTransactionValue = array_sum(array_column($transactions, 'price'));
$totalCreditsTraded = array_sum(array_column($transactions, 'units'));
$completedTransactions = array_filter($transactions, function($tx) { return $tx['status'] === 'completed'; });
$successRate = count($transactions) > 0 ? (count($completedTransactions) / count($transactions)) * 100 : 0;
$totalRetiredUnits = array_sum(array_column($retiredCredits, 'units'));

include 'includes/header.php';
?>

<div class="mb-4">
    <h2 class="fw-bold">Regulator Dashboard</h2>
    <p class="text-muted">Welcome to your regulator dashboard</p>
</div>

<!-- All Transactions -->
<div class="card mb-4">
    <div class="card-header">
        <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex align-items-center">
                <i class="bi bi-activity text-primary me-2"></i>
                <h5 class="card-title mb-0 fw-bold">All Transactions</h5>
            </div>
            <div class="d-flex gap-4">
                <div class="text-center">
                    <div class="h6 fw-bold text-primary"><?php echo count($transactions); ?></div>
                    <small class="text-muted">Total Transactions</small>
                </div>
                <div class="text-center">
                    <div class="h6 fw-bold text-info"><?php echo $totalCreditsTraded; ?></div>
                    <small class="text-muted">Credits Traded</small>
                </div>
                <div class="text-center">
                    <div class="h6 fw-bold text-success">$<?php echo number_format($totalTransactionValue, 2); ?></div>
                    <small class="text-muted">Total Volume</small>
                </div>
                <div class="text-center">
                    <div class="h6 fw-bold text-primary-green"><?php echo number_format($successRate, 0); ?>%</div>
                    <small class="text-muted">Success Rate</small>
                </div>
            </div>
        </div>
        <p class="card-text text-muted mb-0">Monitor all carbon credit transactions on the platform</p>
    </div>
    <div class="card-body">
        <?php if (empty($transactions)): ?>
        <div class="text-center py-5">
            <div class="bg-light rounded-circle p-4 d-inline-flex mb-3">
                <i class="bi bi-graph-up fs-2 text-muted"></i>
            </div>
            <p class="text-muted">No transactions recorded yet</p>
        </div>
        <?php else: ?>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Transaction ID</th>
                        <th>Producer → Buyer</th>
                        <th>Credit ID</th>
                        <th>Units</th>
                        <th>Value</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                        <th>Transaction Hash</th>
                    </tr>
                </thead>
                <tbody id="transactions-tbody">
                    <?php foreach ($transactions as $transaction): ?>
                    <tr>
                        <td>
                            <code class="small bg-light px-2 py-1 rounded"><?php echo htmlspecialchars($transaction['id']); ?></code>
                        </td>
                        <td>
                            <div class="small">
                                <div class="fw-medium"><?php echo htmlspecialchars($transaction['producer']); ?></div>
                                <div class="text-muted">↓</div>
                                <div class="fw-medium"><?php echo htmlspecialchars($transaction['buyer']); ?></div>
                            </div>
                        </td>
                        <td>
                            <code class="small bg-light px-2 py-1 rounded"><?php echo htmlspecialchars($transaction['creditId']); ?></code>
                        </td>
                        <td>
                            <span class="fw-medium"><?php echo $transaction['units']; ?></span>
                            <small class="text-muted">kg CO₂</small>
                        </td>
                        <td class="fw-medium text-primary-green">
                            $<?php echo number_format($transaction['price'], 2); ?>
                        </td>
                        <td><?php echo date('M j, Y', strtotime($transaction['date'])); ?></td>
                        <td>
                            <span class="badge <?php echo $transaction['status'] === 'completed' ? 'status-completed' : 'status-pending'; ?> text-white">
                                <?php echo ucfirst($transaction['status']); ?>
                            </span>
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <code class="small bg-white px-2 py-1 rounded border me-2">
                                    <?php echo substr($transaction['transactionHash'], 0, 10) . '...'; ?>
                                </code>
                                <a href="https://polygonscan.com/tx/<?php echo $transaction['transactionHash']; ?>" 
                                   target="_blank" class="btn btn-outline-secondary btn-sm">
                                    <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php endif; ?>
    </div>
</div>

<!-- Retired Credits -->
<div class="card">
    <div class="card-header">
        <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex align-items-center">
                <i class="bi bi-archive text-purple me-2" style="color: #6366f1 !important;"></i>
                <h5 class="card-title mb-0 fw-bold">Retired Credits</h5>
            </div>
            <div class="text-center">
                <div class="h6 fw-bold" style="color: #6366f1;"><?php echo $totalRetiredUnits; ?></div>
                <small class="text-muted">Total Retired Units</small>
            </div>
        </div>
        <p class="card-text text-muted mb-0">Track carbon credits that have been permanently retired/burned</p>
    </div>
    <div class="card-body">
        <?php if (empty($retiredCredits)): ?>
        <div class="text-center py-5">
            <div class="bg-light rounded-circle p-4 d-inline-flex mb-3">
                <i class="bi bi-trash fs-2 text-muted"></i>
            </div>
            <p class="text-muted">No credits have been retired yet</p>
            <small class="text-muted">Retired credits will appear here when they are permanently removed from circulation</small>
        </div>
        <?php else: ?>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Credit ID</th>
                        <th>Original Producer</th>
                        <th>Units Retired</th>
                        <th>Retirement Date</th>
                        <th>Status</th>
                        <th>Transaction Hash</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($retiredCredits as $credit): ?>
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
                        <td><?php echo date('M j, Y', strtotime($credit['retirementDate'])); ?></td>
                        <td>
                            <span class="badge badge-retired text-white">
                                <i class="bi bi-archive me-1"></i>Retired
                            </span>
                        </td>
                        <td>
                            <?php if ($credit['transactionHash']): ?>
                            <div class="d-flex align-items-center">
                                <code class="small bg-white px-2 py-1 rounded border me-2">
                                    <?php echo substr($credit['transactionHash'], 0, 10) . '...'; ?>
                                </code>
                                <a href="https://polygonscan.com/tx/<?php echo $credit['transactionHash']; ?>" 
                                   target="_blank" class="btn btn-outline-secondary btn-sm">
                                    <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                            </div>
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