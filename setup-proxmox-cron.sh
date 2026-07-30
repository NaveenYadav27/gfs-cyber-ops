#!/bin/bash
# Proxmox Auto-Deployment Setup Script
# This script configures your Proxmox server to automatically pull from GitHub and deploy every 15 minutes.

echo "=== Starting Proxmox CI/CD Setup ==="

# 1. Install Node.js and Git if they are not installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs git
fi

# 2. Create the auto-deploy script
DEPLOY_SCRIPT="/home/greatcoder/auto-deploy.sh"
SRC_DIR="/home/greatcoder/gfs-cyber-ops-src"
WEB_DIR="/var/www/gfs-cyber-ops"

cat << EOF > $DEPLOY_SCRIPT
#!/bin/bash
echo "Starting deployment at \$(date)"

# Clone if it doesn't exist, otherwise pull
if [ ! -d "$SRC_DIR" ]; then
    git clone https://github.com/NaveenYadav27/gfs-cyber-ops.git $SRC_DIR
    cd $SRC_DIR
else
    cd $SRC_DIR
    git fetch origin main
    
    # Check if there are updates
    LOCAL=\$(git rev-parse HEAD)
    REMOTE=\$(git rev-parse origin/main)
    if [ \$LOCAL = \$REMOTE ]; then
        echo "Already up to date."
        exit 0
    fi
    
    git pull origin main
fi

# Build the project
npm install
npm run build

# Copy to the Nginx web directory
sudo cp -r dist/* $WEB_DIR/
sudo chown -R www-data:www-data $WEB_DIR
echo "Deployment successful."
EOF

# Make the deploy script executable
chmod +x $DEPLOY_SCRIPT

# 3. Add to Crontab (Runs every 15 minutes)
# We remove any existing auto-deploy cron jobs first to avoid duplicates
crontab -l 2>/dev/null | grep -v "$DEPLOY_SCRIPT" > /tmp/current_cron
echo "*/15 * * * * $DEPLOY_SCRIPT >> /home/greatcoder/cron-deploy.log 2>&1" >> /tmp/current_cron
crontab /tmp/current_cron
rm /tmp/current_cron

echo "=== Setup Complete! ==="
echo "The server will now automatically check GitHub every 15 minutes."
echo "You can view the logs at any time by running: cat /home/greatcoder/cron-deploy.log"
