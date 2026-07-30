#!/bin/bash
# Nginx Setup Script for GFS Cyber Ops

# Exit on any error
set -e

APP_NAME="gfs-cyber-ops"
WEB_ROOT="/var/www/$APP_NAME"
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"

echo "=== Starting Nginx Setup ==="

# 1. Install Nginx if it's not already installed
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
else
    echo "Nginx is already installed."
fi

# 2. Create the web root directory
echo "Setting up web root at $WEB_ROOT..."
sudo mkdir -p "$WEB_ROOT"

# Ensure the current user has ownership so we can SCP files into it without sudo
sudo chown -R $USER:$USER "$WEB_ROOT"
sudo chmod -R 755 "$WEB_ROOT"

# 3. Configure Nginx Server Block
echo "Configuring Nginx server block..."
sudo bash -c "cat > $NGINX_CONF" << 'EOF'
server {
    listen 8080;
    server_name _;
    
    root /var/www/gfs-cyber-ops;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;

    # Handle SPA Routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public";
    }
}
EOF

# 4. Enable the site
echo "Enabling the site..."
sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/

# 5. Test and reload Nginx
echo "Testing Nginx configuration..."
sudo nginx -t

echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "=== Setup Complete! ==="
echo "You can now SCP your dist files into $WEB_ROOT"
