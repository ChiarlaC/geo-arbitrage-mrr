<![CDATA[
# PowerShell开发服务器启动脚本
Write-Host "Starting Subpricing Development Environment..."

# 进入项目目录
Set-Location "$PSScriptRoot"

# 清理缓存（如果存在）
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "Cleaned .next cache"
}

# 安装依赖
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: npm install failed" -ForegroundColor Red
    exit 1
}

# 启动开发服务器
Write-Host "Starting development server..."
npm run dev

# 自动打开浏览器
Start-Process "http://localhost:3000"
]]>
