$serverMutex = New-Object System.Threading.Mutex($false, 'Local\BOpenPreview3100')
if (-not $serverMutex.WaitOne(0)) { exit }
try {
    # Rebuild the preview before serving so localhost always reflects the latest source edits.
    $projectRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
    & 'C:\Program Files\nodejs\npm.cmd' run build --prefix $projectRoot *> (Join-Path $PSScriptRoot 'build.log')
    while ($true) {
        & 'C:\Program Files\nodejs\node.exe' "$PSScriptRoot\serve.cjs" *> "$PSScriptRoot\server.log"
        Start-Sleep -Seconds 5
    }
} finally {
    $serverMutex.ReleaseMutex()
    $serverMutex.Dispose()
}
