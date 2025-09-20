#!/bin/bash
# Restore development environment

if [ -f "index.html.dev" ]; then
    cp index.html.dev index.html
    echo "✅ Restored development index.html"
    echo "🚀 You can now run 'npm run dev' for development"
else
    echo "❌ No development backup found. Manually restore index.html to reference /src/main.tsx"
fi
