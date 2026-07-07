@echo off
cd /d "%~dp0"

echo [1/2] git submodule update + pull...
git submodule update --init --recursive
cd nodes
git pull origin master
cd ..

echo.
echo [2/2] build nodes-data.js...
node build-nodes.js

echo.
echo Done. Nodes synced and data regenerated.
echo.

set /p PUSH="Push to GitHub? (y/n): "
if /i "%PUSH%"=="y" (
    git add nodes nodes-data.js
    git commit -m "sync: update nodes submodule"
    git push
    echo Pushed.
) else (
    echo Skipped push. Run "git push" manually when ready.
)

pause
