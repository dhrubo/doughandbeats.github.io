#!/bin/bash
# Deploy script for GitHub Pages

echo "Building the project..."
npm run build

echo "Copying assets for GitHub Pages deployment..."
# Copy built assets to root assets directory
cp -r dist/assets/* assets/

# Ensure images are available
cp -r public/images .

# Copy 404.html for SPA routing
cp public/404.html .

# The root index.html is already correctly configured

echo "Files ready for GitHub Pages deployment!"
echo "✅ Built assets copied to /assets/"
echo "✅ Images copied to /images/"
echo "✅ 404.html copied for SPA routing"
echo "✅ index.html configured with correct asset paths"
echo ""
echo "You can now commit and push to deploy."
