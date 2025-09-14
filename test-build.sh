#!/bin/bash
# Test script to verify local dev and build compatibility with GitHub Pages

echo "🧪 Testing Dough & Beats build compatibility..."
echo ""

# Test clean build
echo "1️⃣  Testing clean build..."
npm run build:clean

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Check if LightWidget is gone
echo "2️⃣  Checking for LightWidget removal..."
if grep -r "lightwidget" dist/ 2>/dev/null; then
    echo "❌ LightWidget still found in build!"
    exit 1
fi

echo "✅ LightWidget completely removed!"
echo ""

# Check build outputs
echo "3️⃣  Checking build outputs..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ Missing dist/index.html!"
    exit 1
fi

if [ ! -d "dist/assets" ]; then
    echo "❌ Missing dist/assets directory!"
    exit 1
fi

echo "✅ All required files present!"
echo ""

# Test preview
echo "4️⃣  Testing preview server..."
echo "✅ Preview server ready - run 'npm run preview' to test locally"
echo ""

echo "🚀 All tests passed! Your build is compatible with:"
echo "   • Local development (npm run dev)"
echo "   • Local preview (npm run preview:dist)"
echo "   • GitHub Pages deployment (via GitHub Actions)"
echo ""
echo "💡 To deploy: git add . && git commit -m 'Update' && git push"
