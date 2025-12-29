# Pinnacle Financial PHP Backend

This is the self-hosted PHP backend for the Pinnacle Financial website.

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache with mod_rewrite enabled (or nginx with equivalent config)

## Installation

### 1. Database Setup

Run the SQL script to create the database and tables:

```bash
mysql -u root -p < setup.sql
```

### 2. Configuration

Edit `config.php` and update the following:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'pinnacle_financial');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

// Update with your frontend URL
define('ALLOWED_ORIGIN', 'https://your-frontend-domain.com');

// Change the JWT secret!
define('JWT_SECRET', 'your-secret-key-change-this-in-production');
```

### 3. File Permissions

Ensure the web server can read the PHP files:

```bash
chmod 644 *.php
chmod 644 api/*.php
chmod 644 .htaccess
```

### 4. Apache Configuration

Ensure `mod_rewrite` is enabled:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

Make sure your Apache virtual host allows `.htaccess` overrides:

```apache
<Directory /var/www/html/backend>
    AllowOverride All
</Directory>
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/password
- `GET /api/auth/verify` - Verify JWT token

### Content
- `GET /api/content` - Get all site content
- `PUT /api/content` - Update site content (requires auth)

### Contacts
- `GET /api/contacts` - List all contact submissions (requires auth)
- `POST /api/contacts` - Submit contact form (public)
- `PUT /api/contacts/:id` - Update contact status (requires auth)
- `DELETE /api/contacts/:id` - Delete contact (requires auth)

### Users
- `GET /api/users` - List admin users (requires auth)
- `POST /api/users` - Create new user (requires auth)
- `DELETE /api/users/:id` - Delete user (requires auth)

### Pages
- `GET /api/pages` - List all dynamic pages
- `GET /api/pages/path/:path` - Get page by path
- `POST /api/pages` - Create new page (requires auth)
- `PUT /api/pages/:id` - Update page (requires auth)
- `DELETE /api/pages/:id` - Delete page (requires auth)

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**⚠️ Change these immediately after first login!**

## Security Notes

1. Always use HTTPS in production
2. Change the default admin password immediately
3. Update the JWT secret in config.php
4. Restrict ALLOWED_ORIGIN to your actual frontend domain
5. Keep PHP and MySQL updated
