# LFULeaks Auto-Deploy Script
# Runs silently via Windows Task Scheduler at 00:01 daily.
# Regenerates site (updates "Last updated X days ago" labels) and pushes to GitHub.

$ErrorActionPreference = "Continue"

$repoRoot = "F:\Github\LFULeaks"
$logFile  = "$repoRoot\auto-deploy.log"
$maxLogLines = 500

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$timestamp] [$Level] $Message"
    Add-Content -Path $logFile -Value $line
}

# Trim log file to last $maxLogLines lines so it doesn't grow forever
function Trim-Log {
    if (Test-Path $logFile) {
        $lines = Get-Content $logFile
        if ($lines.Count -gt $maxLogLines) {
            $lines | Select-Object -Last $maxLogLines | Set-Content $logFile
        }
    }
}

try {
    Trim-Log
    Write-Log "=== Auto-deploy started ==="

    Set-Location $repoRoot

    # Add Node.js and Git to PATH for this session
    $env:PATH = "C:\Program Files\nodejs;C:\Program Files\Git\cmd;$env:PATH"

    # Step 1: Regenerate site
    Write-Log "Running site generator..."
    $genOutput = & node tools/generate.mjs 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Generator failed (exit $LASTEXITCODE): $genOutput" "ERROR"
        exit 1
    }
    Write-Log "Generator completed successfully"

    # Step 2: Update service worker cache version
    $cacheVersion = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds().ToString()
    (Get-Content "sw.js") -replace 'const CACHE_VERSION = "[^"]*"', "const CACHE_VERSION = `"$cacheVersion`"" |
        Set-Content "sw.js"
    Write-Log "Cache version updated to $cacheVersion"

    # Step 3: Stage all changes
    & git add . 2>&1 | Out-Null

    # Step 4: Commit (may have nothing to commit - that's fine)
    $commitMsg = "Daily auto-update $(Get-Date -Format 'yyyy-MM-dd')"
    $commitOutput = & git commit -m $commitMsg 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Nothing new to commit (or commit failed): $commitOutput"
    } else {
        Write-Log "Committed: $commitMsg"
    }

    # Step 5: Push to GitHub
    $pushOutput = & git push 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Push failed: $pushOutput" "ERROR"
        exit 1
    }
    Write-Log "Pushed to GitHub successfully"
    Write-Log "=== Auto-deploy complete ==="

} catch {
    Write-Log "Unexpected error: $_" "ERROR"
    exit 1
}
