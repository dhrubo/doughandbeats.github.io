#!/bin/bash
# Post-build script to fix asset paths for GitHub Pages

echo "Fixing asset paths in built files..."

# Fix paths in index.html
sed -i '' 's|/dough-beats-refreshed/assets/|/assets/|g' dist/index.html

echo "Asset paths fixed!"
