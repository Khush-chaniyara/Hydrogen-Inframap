<?php
function initializeData() {
    if (!isset($_SESSION['credits'])) {
        $_SESSION['credits'] = [
            [
                'id' => 'CC-2024-001',
                'batchId' => 'H2-2024-001',
                'units' => 250,
                'producer' => 'GreenTech Hydrogen Ltd.',
                'price' => 15.50,
                'productionDate' => '2024-01-15',
                'status' => 'available',
                'buyer' => null,
                'transactionHash' => null,
                'purchaseDate' => null,
                'retirementDate' => null
            ],
            [
                'id' => 'CC-2024-002',
                'batchId' => 'H2-2024-005',
                'units' => 180,
                'producer' => 'EcoHydro Solutions',
                'price' => 14.25,
                'productionDate' => '2024-01-20',
                'status' => 'available',
                'buyer' => null,
                'transactionHash' => null,
                'purchaseDate' => null,
                'retirementDate' => null
            ],
            [
                'id' => 'CC-2024-003',
                'batchId' => 'H2-2024-008',
                'units' => 420,
                'producer' => 'Renewable Energy Corp',
                'price' => 16.75,
                'productionDate' => '2024-01-18',
                'status' => 'available',
                'buyer' => null,
                'transactionHash' => null,
                'purchaseDate' => null,
                'retirementDate' => null
            ]
        ];
    }
    
    if (!isset($_SESSION['transactions'])) {
        $_SESSION['transactions'] = [
            [
                'id' => 'TXN-001',
                'creditId' => 'CC-2024-001',
                'producer' => 'GreenTech Hydrogen Ltd.',
                'buyer' => 'EcoTech Solutions Inc.',
                'units' => 100,
                'price' => 1550.00,
                'date' => '2024-01-25',
                'transactionHash' => '0x1234567890abcdef...',
                'status' => 'completed'
            ]
        ];
    }
}

function generateTxHash() {
    return '0x' . bin2hex(random_bytes(20));
}

function addProduction($batchId, $units, $date, $producer) {
    initializeData();
    
    $creditId = 'CC-2024-' . str_pad(count($_SESSION['credits']) + 1, 3, '0', STR_PAD_LEFT);
    $transactionHash = generateTxHash();
    
    $newCredit = [
        'id' => $creditId,
        'batchId' => $batchId,
        'units' => (int)$units,
        'producer' => $producer,
        'price' => 15.00 + (mt_rand(0, 500) / 100), // Random price 15-20
        'productionDate' => $date,
        'status' => 'available',
        'buyer' => null,
        'transactionHash' => null,
        'purchaseDate' => null,
        'retirementDate' => null
    ];
    
    $_SESSION['credits'][] = $newCredit;
    
    return $transactionHash;
}

function buyCredit($creditId, $buyer) {
    initializeData();
    
    $txHash = generateTxHash();
    $purchaseDate = date('Y-m-d');
    
    // Update credit
    foreach ($_SESSION['credits'] as &$credit) {
        if ($credit['id'] === $creditId) {
            $credit['status'] = 'sold';
            $credit['buyer'] = $buyer;
            $credit['transactionHash'] = $txHash;
            $credit['purchaseDate'] = $purchaseDate;
            
            // Add transaction
            $newTransaction = [
                'id' => 'TXN-' . (count($_SESSION['transactions']) + 1),
                'creditId' => $creditId,
                'producer' => $credit['producer'],
                'buyer' => $buyer,
                'units' => $credit['units'],
                'price' => $credit['price'] * $credit['units'],
                'date' => $purchaseDate,
                'transactionHash' => $txHash,
                'status' => 'completed'
            ];
            
            $_SESSION['transactions'][] = $newTransaction;
            break;
        }
    }
    
    return $txHash;
}

function getCredits() {
    initializeData();
    return $_SESSION['credits'];
}

function getTransactions() {
    initializeData();
    return $_SESSION['transactions'];
}

function getAvailableCredits() {
    $credits = getCredits();
    return array_filter($credits, function($credit) {
        return $credit['status'] === 'available';
    });
}

function getUserPurchases($username) {
    $credits = getCredits();
    return array_filter($credits, function($credit) use ($username) {
        return $credit['buyer'] === $username && $credit['status'] === 'sold';
    });
}

function getRetiredCredits() {
    $credits = getCredits();
    return array_filter($credits, function($credit) {
        return $credit['status'] === 'retired';
    });
}
?>