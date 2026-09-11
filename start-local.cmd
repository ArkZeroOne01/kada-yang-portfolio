@echo off
setlocal

set "PROJECT_DIR=%~dp0"
set "NODE_BIN=E:\Desktop\astro-scholar-main\.tools\node22\node_modules\node\bin"
set "NODE_EXE=%NODE_BIN%\node.exe"
set "NPM_CLI=E:\Desktop\astro-scholar-main\.tools\npm10\node_modules\npm\bin\npm-cli.js"
set "PATH=%NODE_BIN%;%PATH%"
set "ASTRO_TELEMETRY_DISABLED=1"
set "npm_config_cache=%PROJECT_DIR%.npm-cache"

if not exist "%NODE_EXE%" (
  echo Node.js 22.12.0 was not found at:
  echo %NODE_EXE%
  exit /b 1
)

if not exist "%NPM_CLI%" (
  echo npm 10.9.0 was not found at:
  echo %NPM_CLI%
  exit /b 1
)

cd /d "%PROJECT_DIR%"
"%NODE_EXE%" "%NPM_CLI%" run dev -- --host 127.0.0.1

