const fs = require('fs');
const path = require('path');

// Fix asset paths in the built index.html for GitHub Pages
const indexPath = path.join(process.cwd(), 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Replace the incorrect base path with the correct one
  content = content.replace(/\/dough-beats-refreshed\/assets\//g, '/assets/');
  content = content.replace(/\/dough-beats-refreshed\//g, '/');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ Fixed asset paths in index.html');
} else {
  console.log('❌ dist/index.html not found');
}
