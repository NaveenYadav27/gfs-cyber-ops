<#
.SYNOPSIS
Installs the automated CI/CD cron job on the Proxmox server

.DESCRIPTION
This script copies the setup-proxmox-cron.sh script to the server and executes it.
It will ask for your server password twice (once to copy, once to run sudo commands).
#>

$SERVER = "greatcoder@100.81.54.86"

Write-Host "=== Pushing Cron Job Setup to Proxmox ===" -ForegroundColor Cyan
Write-Host "You will be prompted for your SSH password." -ForegroundColor Yellow

# Copy the setup script to the server
scp .\setup-proxmox-cron.sh "$SERVER`:~/setup-proxmox-cron.sh"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to copy setup script." -ForegroundColor Red
    exit 1
}

# Execute the setup script on the server with pseudo-terminal allocation (-t) for sudo
ssh -t $SERVER "chmod +x ~/setup-proxmox-cron.sh && sudo ~/setup-proxmox-cron.sh"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Server setup failed." -ForegroundColor Red
    exit 1
}

Write-Host "Success! The Proxmox server is now fully automated." -ForegroundColor Green
