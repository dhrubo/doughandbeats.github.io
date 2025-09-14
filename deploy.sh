#!/bin/bash
# Deploy script for GitHub Pages (using GitHub Actions)

echo "🔨 Building the project with clean build..."
npm run build:clean

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📋 Built files are in the dist/ directory"
echo "🚀 GitHub Actions will automatically deploy when you push to main branch"
echo ""
echo "To manually deploy, commit and push your changes:"
echo "  git add ."
echo "  git commit -m 'Update build'"
echo "  git push origin main"
echo "✅ Production index.html copied to root"
echo "✅ Built assets copied to /assets/"
echo "✅ Images available at /images/"
echo "✅ 404.html configured for SPA routing"
echo ""
echo "🚀 Committing and pushing to deploy..."
git add .
git commit -m "Deploy production build - $(date)"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully deployed to GitHub Pages!"
    echo "🌐 Your site will be live at https://doughandbeats.github.io in a few minutes"
    echo ""
    echo "To return to development mode, run:"
    echo "cp index.html.dev index.html"
else
    echo "❌ Failed to push to GitHub. Please check your git configuration."
fi
