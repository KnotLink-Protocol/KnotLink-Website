@echo off
cd /d "%~dp0"

echo [1/3] git submodule update + pull...
git submodule update --init --recursive
cd nodes
git pull origin master
cd ..
cd recipes-market
git pull origin master
cd ..

echo.
echo [2/3] build nodes-data.js...
node build-nodes.js

echo.
echo [3/3] build recipes-data.js...
node build-recipes.js

echo.
echo Done. Nodes and recipes synced, data regenerated.
echo.

set /p PUSH="Push to GitHub? (y/n): "
if /i "%PUSH%"=="y" (
    git add nodes nodes-data.js recipes-market recipes-data.js
    git commit -m "sync: update nodes and recipes submodules, regenerate data"
    git push
    echo Pushed.
) else (
    echo Skipped push. Run "git push" manually when ready.
)

pause
