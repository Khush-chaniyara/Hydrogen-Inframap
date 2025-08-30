// Green Ledger JavaScript Functions

// Show toast notifications
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'position-fixed top-0 end-0 p-3';
        container.style.zIndex = '1050';
        document.body.appendChild(container);
    }
    
    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'error' ? 'bg-danger' : 'bg-success';
    
    const toastHtml = `
        <div id="${toastId}" class="toast" role="alert">
            <div class="toast-header ${bgClass} text-white">
                <i class="bi bi-check-circle-fill me-2"></i>
                <strong class="me-auto">${type === 'error' ? 'Error' : 'Success'}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.getElementById('toast-container').insertAdjacentHTML('beforeend', toastHtml);
    
    const toast = new bootstrap.Toast(document.getElementById(toastId));
    toast.show();
    
    // Remove toast element after it's hidden
    document.getElementById(toastId).addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

// Handle form submissions with loading states
function handleFormSubmit(formId, submitCallback) {
    const form = document.getElementById(formId);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        
        try {
            await submitCallback(new FormData(form));
        } catch (error) {
            showToast('An error occurred. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Producer form submission
async function submitProduction(formData) {
    const response = await fetch('api/produce.php', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
        showToast(`Successfully recorded ${formData.get('units')} kg of hydrogen production`);
        showConfirmation(result.transactionHash);
    } else {
        throw new Error(result.message);
    }
}

// Show production confirmation
function showConfirmation(transactionHash) {
    const formCard = document.getElementById('production-form');
    const confirmationCard = document.getElementById('confirmation-card');
    
    formCard.style.display = 'none';
    confirmationCard.style.display = 'block';
    
    document.getElementById('transaction-hash').textContent = transactionHash;
    document.getElementById('etherscan-link').href = `https://polygonscan.com/tx/${transactionHash}`;
}

// Go back to form
function goBackToForm() {
    document.getElementById('production-form').style.display = 'block';
    document.getElementById('confirmation-card').style.display = 'none';
    document.getElementById('production-form-element').reset();
}

// Buy credit
async function buyCredit(creditId, units, price) {
    const response = await fetch('api/buy.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ creditId })
    });
    
    const result = await response.json();
    
    if (result.success) {
        showToast(`Successfully purchased ${units} carbon credits for $${(price * units).toFixed(2)}`);
        // Refresh the page to show updated data
        setTimeout(() => location.reload(), 1500);
    } else {
        showToast(result.message, 'error');
    }
}

// Live data refresh for buyer and regulator dashboards
function startLiveUpdates() {
    // Only enable live updates on buyer and regulator dashboards
    const currentPage = window.location.pathname;
    if (currentPage.includes('buyer-dashboard') || currentPage.includes('regulator-dashboard')) {
        setInterval(refreshData, 10000); // Refresh every 10 seconds
    }
}

// Refresh data tables
async function refreshData() {
    try {
        const response = await fetch('api/get-data.php');
        const data = await response.json();
        
        if (data.success) {
            updateTables(data);
        }
    } catch (error) {
        console.error('Failed to refresh data:', error);
    }
}

// Update tables with new data
function updateTables(data) {
    // Update available credits table
    const availableCreditsTable = document.getElementById('available-credits-tbody');
    if (availableCreditsTable) {
        updateAvailableCreditsTable(availableCreditsTable, data.availableCredits);
    }
    
    // Update transactions table
    const transactionsTable = document.getElementById('transactions-tbody');
    if (transactionsTable) {
        updateTransactionsTable(transactionsTable, data.transactions);
    }
    
    // Update purchase history
    const purchaseHistoryTable = document.getElementById('purchase-history-tbody');
    if (purchaseHistoryTable) {
        updatePurchaseHistoryTable(purchaseHistoryTable, data.userPurchases);
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize producer form if exists
    if (document.getElementById('production-form-element')) {
        handleFormSubmit('production-form-element', submitProduction);
    }
    
    // Start live updates
    startLiveUpdates();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Format date for display
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Truncate hash for display
function truncateHash(hash, length = 10) {
    return hash.substring(0, length) + '...';
}