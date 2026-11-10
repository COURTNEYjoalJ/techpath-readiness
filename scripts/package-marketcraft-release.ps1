param(
  [Parameter(Mandatory=$true)][string]$PreparedPackage,
  [Parameter(Mandatory=$true)][string]$SourceCommit
)
$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path.TrimEnd([IO.Path]::DirectorySeparatorChar)
$packageRoot = (Resolve-Path $PreparedPackage).Path
$target = [IO.Path]::GetFullPath((Join-Path $repoRoot 'marketcraft\learn'))
if (!$target.StartsWith($repoRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe package destination.' }
$required = @('index.html','styles.css','app.js','frontend','assets','marketcraft-3d\index.html','marketcraft-3d\style.css','marketcraft-3d\scene.js','marketcraft-3d\assets\dark-depth.webp','marketcraft-3d\assets\light-depth.webp','marketcraft-3d\assets\dark-mountains-clean.png','marketcraft-3d\assets\light-mountains-clean.png')
foreach ($path in $required) { if (!(Test-Path (Join-Path $packageRoot $path))) { throw "Required runtime file missing: $path" } }
$bad = Get-ChildItem $packageRoot -Recurse -File | Where-Object { $_.Extension -in @('.md','.test','.spec') -or $_.FullName -match '[\\/](tests?|docs?|\.git|\.github|backend|node_modules)[\\/]' -or $_.Name -match '^\.env' }
if ($bad) { throw "Package contains non-runtime files: $($bad.FullName -join ', ')" }
$stage = Join-Path $env:TEMP ('marketcraft-learn-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $stage | Out-Null
try {
  Get-ChildItem $packageRoot -Force | Where-Object { $_.Name -ne 'DEPLOYMENT.txt' } | ForEach-Object { Copy-Item -LiteralPath $_.FullName -Destination $stage -Recurse -Force }
  $htmlPath = Join-Path $stage 'index.html'
  $html = [IO.File]::ReadAllText($htmlPath)
  $privacyAnchor = '<a href="https://techpathready.com/privacy-policy.html" target="_blank" rel="noopener noreferrer">TechPathReady privacy policy</a>'
  if ([regex]::Matches($html,[regex]::Escape($privacyAnchor)).Count -ne 1) { throw 'Could not safely add the TechPathReady return link.' }
  $returnAnchor = '<a href="https://techpathready.com/" class="techpathready-return">Back to TechPathReady</a>'
  $html = $html.Replace($privacyAnchor,$privacyAnchor + $returnAnchor)
  [IO.File]::WriteAllText($htmlPath,$html,(New-Object System.Text.UTF8Encoding($false)))
  foreach ($path in $required) { if (!(Test-Path (Join-Path $stage $path))) { throw "Staged runtime file missing: $path" } }
  if (Test-Path $target) {
    $changes = (((& git -C $repoRoot status --porcelain --untracked-files=all -- 'marketcraft/learn') -join [Environment]::NewLine).Trim())
    if ($changes) { throw 'Generated target has uncommitted changes; refusing to replace it.' }
    Remove-Item -LiteralPath $target -Recurse -Force
  }
  New-Item -ItemType Directory -Path (Split-Path $target -Parent) -Force | Out-Null
  New-Item -ItemType Directory -Path $target -Force | Out-Null
  Copy-Item -Path (Join-Path $stage '*') -Destination $target -Recurse -Force
  Remove-Item -LiteralPath $stage -Recurse -Force
  $count = (Get-ChildItem $target -Recurse -File).Count
  Write-Output "Packaged $count runtime files from MarketCraft $SourceCommit to marketcraft/learn."
} catch {
  if (Test-Path $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
  throw
}





