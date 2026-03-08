@echo off
echo ========================================
echo    PWA Icon Generator
echo ========================================
echo.

REM Cek apakah ada argument
if "%~1"=="" (
    echo Drag and drop logo file ke batch ini, atau
    echo Jalankan: generate-my-icons.bat logo.png
    echo.
    pause
    exit /b
)

echo Menggunakan logo: %~1
echo.

REM Install sharp jika belum ada
echo Checking dependencies...
call npm list sharp >nul 2>&1
if errorlevel 1 (
    echo Installing sharp...
    call npm install sharp
    echo.
)

REM Generate icons
echo Generating icons...
node generate-icons.js "%~1"

echo.
echo ========================================
echo Done! Check public/icons/ folder
echo ========================================
pause
