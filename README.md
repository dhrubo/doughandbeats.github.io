# Dough & Beats - Authentic Italian Street Food

> Modern React website for Dough & Beats, featuring authentic Italian street food with a clean, responsive design.

**Live Site**: [https://doughandbeats.github.io](https://doughandbeats.github.io)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Git for version control

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/dhrubo/doughandbeats.github.io.git
cd doughandbeats.github.io

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The development server will start at `http://localhost:8080` with hot reloading enabled.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:8080 |
| `npm run build` | Build for production |
| `npm run build:clean` | Clean build (removes dist/ first) |
| `npm run preview` | Preview production build at localhost:4173 |
| `npm run preview:dist` | Build and preview in one command |
| `npm run lint` | Run ESLint code analysis |
| `./test-build.sh` | Test build compatibility and verify setup |

## 🏗️ Build Process

### Local Build & Testing

```bash
# Clean build for production
npm run build:clean

# Test the build locally
npm run preview:dist

# Verify build compatibility
./test-build.sh
```

The build process:
- Transforms 1700+ TypeScript/React modules
- Generates optimized bundles (~370KB JS, ~67KB CSS)
- Creates production-ready assets in `dist/` directory
- Ensures compatibility with GitHub Pages deployment

## 🚀 GitHub Pages Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the `main` branch triggers automatic deployment:

```bash
# Make your changes
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

The GitHub Actions workflow will:
1. Install dependencies with `npm ci`
2. Build the site with `npm run build:clean`
3. Deploy the `dist/` directory to GitHub Pages
4. Make the site live at `https://doughandbeats.github.io`

### Manual Deployment Verification

```bash
# 1. Test your build locally first
npm run build:clean
npm run preview

# 2. Run compatibility tests
./test-build.sh

# 3. If tests pass, deploy
git add .
git commit -m "Update: describe your changes"
git push origin main
```

### GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`) handles:
- ✅ Clean builds with cache optimization  
- ✅ Asset optimization and bundling
- ✅ Automatic GitHub Pages deployment
- ✅ SPA routing support with 404.html
- ✅ Custom domain support via CNAME

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with modern hooks |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Accessible UI component library |
| **React Router** | Client-side routing |
| **Lucide React** | Icon library |
| **GitHub Actions** | CI/CD pipeline |
| **GitHub Pages** | Static site hosting |

## 📁 Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Route-based page components
│   ├── lib/              # Utility functions
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── dist/                 # Production build output
├── .github/workflows/    # GitHub Actions config
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Development Guidelines

### Making Changes

1. **Start development server**: `npm run dev`
2. **Make your changes** in the `src/` directory
3. **Test locally**: Visit `http://localhost:8080`
4. **Build and test**: `npm run preview:dist`
5. **Verify compatibility**: `./test-build.sh`
6. **Deploy**: `git push origin main`

### Key Features

- ✅ **Fully responsive design** for all device sizes
- ✅ **Lightning-fast performance** with Vite optimization
- ✅ **Accessibility-first** components with proper ARIA labels
- ✅ **SEO optimized** with proper meta tags and structure
- ✅ **Modern React patterns** with hooks and TypeScript
- ✅ **Automatic deployments** via GitHub Actions

## 🐛 Troubleshooting

### Common Issues

**Blank page on GitHub Pages:**
- Run `./test-build.sh` to verify build compatibility
- Check that `index.html` exists in project root
- Ensure GitHub Pages is configured to use GitHub Actions

**Build fails locally:**
- Clear node modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite && npm run build:clean`

**Development server issues:**
- Check port 8080 isn't in use: `lsof -ti:8080`
- Try different port: `npm run dev -- --port 8081`

### Getting Help

- Check the [GitHub Issues](https://github.com/dhrubo/doughandbeats.github.io/issues)
- Review recent [GitHub Actions runs](https://github.com/dhrubo/doughandbeats.github.io/actions)
- Test build compatibility with `./test-build.sh`

## 📦 Build Output

A successful build generates:

```
dist/
├── index.html              # Main HTML file with asset references
├── assets/
│   ├── index-[hash].js     # ~370KB optimized JavaScript bundle
│   └── index-[hash].css    # ~67KB optimized CSS bundle
└── 404.html                # SPA routing fallback for GitHub Pages
```

**Important Notes:**
- The `dist/` directory is auto-generated and should not be manually edited
- Asset filenames include content hashes for cache busting
- All assets are optimized and minified for production
- The root `index.html` is the Vite entry point (do not delete!)

---

**Last Updated**: September 2025  
**Node.js**: 18+ required  
**Deployment**: Automatic via GitHub Actions
