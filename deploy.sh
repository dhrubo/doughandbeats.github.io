#!/bin/bash
# Deploy script for GitHub Pages

echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "📦 Copying assets for GitHub Pages deployment..."

# Backup current index.html (development version)
cp index.html index.html.dev

# Copy built index.html to root (this has the correct asset references)
cp -f dist/index.html .

# Copy built assets to root assets directory
mkdir -p assets
cp dist/assets/index-*.js dist/assets/index-*.css assets/ 2>/dev/null || echo "No new assets to copy"

# Ensure images are available
cp -r public/images . 2>/dev/null || echo "Images already in place"

# Copy 404.html for SPA routing
cp public/404.html . 2>/dev/null || echo "404.html already in place"

echo "✅ Files ready for GitHub Pages deployment!"
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
