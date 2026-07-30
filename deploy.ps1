<#
.SYNOPSIS
Deployment script for GFS Cyber Ops to Proxmox Server

.DESCRIPTION
This script automates the deployment process:
1. Builds the React app using Vite
2. Copies the setup-nginx.sh script to the server and executes it (only needs to run once)
3. Copies the dist folder to the Nginx web root on the server
#>

$SERVER = "greatcoder@100.81.54.86"
$WEB_ROOT = "/var/www/gfs-cyber-ops"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " GFS Cyber Ops - Proxmox Deployment      " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Build the project
Write-Host "`n[1/3] Building the project (npm run build)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Aborting deployment." -ForegroundColor Red
    exit 1
}

# 2. Server Setup (Nginx)
Write-Host "`n[2/3] Setting up Nginx on the server..." -ForegroundColor Yellow
Write-Host "You will be prompted for your SSH password." -ForegroundColor Gray

# Copy the setup script
scp setup-nginx.sh "$SERVER`:~/"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to copy setup script." -ForegroundColor Red
    exit 1
}

# Execute the setup script on the server
ssh -t $SERVER "chmod +x ~/setup-nginx.sh && ~/setup-nginx.sh"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Server setup failed." -ForegroundColor Red
    exit 1
}

# 3. Deploy the files
Write-Host "`n[3/3] Deploying files to $WEB_ROOT..." -ForegroundColor Yellow
Write-Host "You will be prompted for your SSH password one last time." -ForegroundColor Gray

# Use scp to copy the contents of the dist folder to the web root
scp -r dist/* "$SERVER`:$WEB_ROOT/"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to copy dist files." -ForegroundColor Red
    exit 1
}

# Fix permissions so Nginx can read the newly copied files
Write-Host "`n[4/4] Fixing file permissions..." -ForegroundColor Yellow
ssh $SERVER "sudo /usr/bin/chmod -R 755 $WEB_ROOT"

Write-Host "`n=========================================" -ForegroundColor Green
Write-Host " Deployment Successful!                  " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host "You can now access your application at: http://100.81.54.86:8080" -ForegroundColor Cyan
