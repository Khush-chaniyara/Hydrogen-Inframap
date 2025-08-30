# Green Ledger - Carbon Credit Platform

A transparent, blockchain-powered carbon credit trading platform built with PHP, HTML, CSS, JavaScript, and Bootstrap.

## Features

- **Role-based Authentication**: Producer, Buyer, and Regulator dashboards
- **Producer Portal**: Record hydrogen production and generate verified carbon credits
- **Buyer Marketplace**: Browse and purchase carbon credits from verified producers  
- **Regulatory Oversight**: Complete transparency with real-time transaction monitoring
- **Live Updates**: Real-time data synchronization across all dashboards
- **Responsive Design**: Beautiful UI built with Bootstrap 5

## Technology Stack

- **Backend**: PHP with session-based authentication
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5 + Custom CSS
- **Data Storage**: PHP Sessions (in-memory for demo)
- **Icons**: Bootstrap Icons

## Installation

1. **Requirements**:
   - PHP 7.4 or higher
   - Web server (Apache, Nginx, or built-in PHP server)

2. **Setup**:
   ```bash
   # Clone or download the project files
   # No additional dependencies required - pure PHP/HTML/CSS/JS
   ```

3. **Run**:
   ```bash
   # Using PHP built-in server
   php -S localhost:8000
   
   # Or place files in your web server's document root
   ```

4. **Access**: Open `http://localhost:8000` in your browser

## Demo Login

Use these usernames to access different dashboards:

- **Producer Dashboard**: Username containing "producer" (e.g., "producer", "producer1", etc.)
- **Buyer Dashboard**: Username containing "buyer" (e.g., "buyer", "buyer1", etc.) 
- **Regulator Dashboard**: Username containing "regulator" (e.g., "regulator", "regulator1", etc.)

Password can be anything for demo purposes.

## File Structure

```
/
├── index.php                 # Main entry point
├── login.php                 # Login page
├── producer-dashboard.php    # Producer dashboard
├── buyer-dashboard.php       # Buyer dashboard  
├── regulator-dashboard.php   # Regulator dashboard
├── includes/
│   ├── auth.php             # Authentication functions
│   ├── data.php             # Data management functions
│   ├── header.php           # Common header
│   └── footer.php           # Common footer
├── assets/
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── js/
│       └── main.js          # JavaScript functionality
└── api/
    ├── produce.php          # Production API endpoint
    ├── buy.php              # Purchase API endpoint
    ├── get-data.php         # Data fetching API
    └── logout.php           # Logout handler
```

## Functionality

### Producer Dashboard
- Record hydrogen production data (Batch ID, Units, Date)
- Generate carbon credits with blockchain transaction simulation
- Success confirmation with transaction hash links

### Buyer Dashboard  
- Browse available carbon credits marketplace
- Purchase credits with one-click buying
- View purchase history and owned credits
- Real-time updates when new production is added

### Regulator Dashboard
- Monitor all platform transactions
- View comprehensive transaction statistics
- Track retired/burned credits
- Platform-wide oversight and compliance monitoring

## API Endpoints

- `POST /api/produce.php` - Record new production
- `POST /api/buy.php` - Purchase carbon credits
- `GET /api/get-data.php` - Fetch current data
- `GET /api/logout.php` - User logout

## Live Updates

The platform features real-time updates:
- When producers add production → Credits appear in buyer marketplace
- When buyers purchase credits → Transactions show in regulator dashboard
- Data refreshes automatically every 10 seconds on buyer/regulator dashboards

## Security Features

- Session-based authentication
- Role-based access control
- CSRF protection on forms
- Input validation and sanitization
- Secure API endpoints

## Customization

The platform uses a green color scheme matching the carbon credit theme. You can customize:

- **Colors**: Modify CSS variables in `assets/css/style.css`
- **Branding**: Update header/footer in `includes/` folder
- **Data**: Extend data structures in `includes/data.php`
- **Features**: Add new functionality by creating additional PHP pages

## License

This project is for demonstration purposes. Feel free to adapt and extend for your own use cases.