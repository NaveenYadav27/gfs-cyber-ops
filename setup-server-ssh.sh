#!/bin/bash
# Setup Passwordless SSH and Sudo

echo "Configuring authorized_keys..."
mkdir -p ~/.ssh
cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
rm -f ~/id_rsa.pub

echo "Configuring passwordless sudo for deployment..."
echo "greatcoder ALL=(ALL) NOPASSWD: /usr/bin/chmod -R 755 /var/www/gfs-cyber-ops" | sudo tee /etc/sudoers.d/gfs-deploy > /dev/null
sudo chmod 440 /etc/sudoers.d/gfs-deploy

echo "Server setup complete! You will no longer need a password to deploy."
