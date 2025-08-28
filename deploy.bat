@echo off
echo Generating site files...
node tools/generate.mjs

echo Adding files to git...
git add .

echo Committing changes...
git commit -m "Update site - %date% %time%"

echo Pushing to GitHub...
git push

echo.
echo Deploy complete! Your site will update in a few minutes.
echo Visit: https://YOUR_USERNAME.github.io/LFULeaks/
pause