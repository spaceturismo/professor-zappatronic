param([string]$LocalReposRoot = '', [string]$SiteRoot = '')
$ErrorActionPreference = 'Stop'
$root = if ($SiteRoot) { $SiteRoot } else { Split-Path $PSScriptRoot -Parent }
$headers = @{ Accept = 'application/vnd.github+json'; 'User-Agent' = 'Zappatronic-site-updates' }
if ($env:GH_TOKEN) { $headers.Authorization = "Bearer $env:GH_TOKEN" }
$catalog = Get-Content -LiteralPath (Join-Path $root 'games.js') -Raw
$slugs = [regex]::Matches($catalog, "(?m)^    \['([^']+)'") | ForEach-Object { $_.Groups[1].Value }
$updates = @()
foreach ($slug in $slugs) {
    if ($LocalReposRoot) {
        $directory = Join-Path $LocalReposRoot $slug
        $commit = git -C $directory log -1 '--format=%cs|%s'
        if ($LASTEXITCODE -ne 0) { throw "Cannot read history for $slug" }
        $parts = $commit -split '\|', 2
        $date = $parts[0]
        $message = $parts[1]
    } else {
        $commits = Invoke-RestMethod -Uri "https://api.github.com/repos/spaceturismo/$slug/commits?per_page=1" -Headers $headers
        $date = ([datetime]$commits[0].commit.committer.date).ToString('yyyy-MM-dd')
        $message = ($commits[0].commit.message -split "`n")[0]
    }
    if ($message -match 'Reduce high-density canvas rendering overhead') {
        $summary = 'Reduced rendering overhead on high-density screens.'
    } elseif ($message -match 'Restore flashlight shadows') {
        $summary = 'Graphics settings now restore flashlight shadows.'
    } elseif ($message -match 'Ignore setup and paused frames') {
        $summary = 'Automatic graphics tuning now ignores setup and pauses.'
    } elseif ($message -match '(?i)initial|publish|import|upload') {
        continue
    } else {
        $summary = $message
    }
    $updates += [ordered]@{ slug = $slug; date = $date; summary = $summary }
}
$encoding = New-Object System.Text.UTF8Encoding($false)
$orderedUpdates = @($updates | Sort-Object @{Expression = { $_.date }; Descending = $true}, @{Expression = { $_.slug }} | Select-Object -First 8)
[IO.File]::WriteAllText((Join-Path $root 'game-updates.json'), (ConvertTo-Json -InputObject $orderedUpdates -Depth 5) + "`n", $encoding)

try {
    $channel = 'UCGVwY61UH60w1vvO_ACSqdg'
    $response = Invoke-WebRequest -Uri "https://www.youtube.com/feeds/videos.xml?channel_id=$channel" -UseBasicParsing
    [xml]$feed = $response.Content
    $namespaces = New-Object Xml.XmlNamespaceManager($feed.NameTable)
    $namespaces.AddNamespace('atom', 'http://www.w3.org/2005/Atom')
    $namespaces.AddNamespace('yt', 'http://www.youtube.com/xml/schemas/2015')
    $videos = @()
    $cutoff = [datetimeoffset]'2026-11-02T02:45:16+00:00'
    foreach ($entry in $feed.SelectNodes('/atom:feed/atom:entry', $namespaces)) {
        $id = $entry.SelectSingleNode('yt:videoId', $namespaces).InnerText
        if ($id -notmatch '^[A-Za-z0-9_-]{11}$') { continue }
        $published = $entry.SelectSingleNode('atom:published', $namespaces).InnerText
        if ([datetimeoffset]$published -lt $cutoff) { continue }
        $videos += [ordered]@{
            id = $id
            title = $entry.SelectSingleNode('atom:title', $namespaces).InnerText
            published = $published
        }
    }
    $videos = @($videos | Select-Object -First 6)
    [IO.File]::WriteAllText((Join-Path $root 'youtube-updates.json'), (ConvertTo-Json -InputObject $videos -Depth 5) + "`n", $encoding)
    Write-Output "Refreshed $($orderedUpdates.Count) game updates and $($videos.Count) YouTube uploads."
} catch {
    if (-not (Test-Path (Join-Path $root 'youtube-updates.json'))) { throw }
    Write-Warning "YouTube feed unavailable; keeping the last successful feed: $_"
}