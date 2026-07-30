<#
.SYNOPSIS
Sets up passwordless SSH authentication to the Proxmox server
#>

$SERVER = "greatcoder@100.81.54.86"
$SSH_DIR = "$env:USERPROFILE\.ssh"
$KEY_PATH = "$SSH_DIR\id_rsa"
$PUB_KEY = "$KEY_PATH.pub"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " SSH Automation Setup                    " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Create .ssh folder if it doesn't exist
if (!(Test-Path $SSH_DIR)) {
    New-Item -ItemType Directory -Force -Path $SSH_DIR | Out-Null
}

# 2. Generate SSH key if it doesn't exist
if (!(Test-Path $KEY_PATH)) {
    Write-Host "`n[1/3] Generating new SSH key..." -ForegroundColor Yellow
    ssh-keygen -t rsa -b 4096 -f $KEY_PATH -N '""' -q
    Write-Host "Key generated successfully." -ForegroundColor Green
} else {
    Write-Host "`n[1/3] SSH key already exists. Skipping generation." -ForegroundColor Green
}

# 3. Copy files to server
Write-Host "`n[2/3] Copying keys to the server..." -ForegroundColor Yellow
Write-Host "You will be prompted for your SSH password." -ForegroundColor Gray

scp $PUB_KEY "$SERVER`:~/id_rsa.pub"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to copy public key." -ForegroundColor Red
    exit 1
}

scp setup-server-ssh.sh "$SERVER`:~/"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to copy setup script." -ForegroundColor Red
    exit 1
}

# 4. Execute configuration on server
Write-Host "`n[3/3] Configuring server permissions..." -ForegroundColor Yellow
Write-Host "You will be prompted for your [sudo] password one last time." -ForegroundColor Gray

ssh -t $SERVER "chmod +x ~/setup-server-ssh.sh && ~/setup-server-ssh.sh && rm ~/setup-server-ssh.sh"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Server setup failed." -ForegroundColor Red
    exit 1
}

Write-Host "`n=========================================" -ForegroundColor Green
Write-Host " Setup Complete!                         " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Your deployments are now 100% automated and passwordless." -ForegroundColor Cyan
