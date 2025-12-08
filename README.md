# LFU Informer - LFU Leaks

A modern, feature-rich website showcasing Last Fortress Underground game assets and updates for educational and informational purposes.

**Live Site**: [https://renegade2k6.github.io/LFULeaks/](https://renegade2k6.github.io/LFULeaks/)

## ✨ Features

### 🎨 Modern UI/UX
- **Stunning Dark Theme** with gradient accents and glow effects
- **Glassmorphism** header with blur effects
- **Smooth Animations** on page load and interactions
- **Enhanced Image Hover** effects with subtle glow
- **Back to Top Button** for easy navigation
- **PWA Support** - Installable on mobile devices

### 📚 Content Features
- **Update Archive** - Browse game updates by date with organized galleries
- **Text Diff Viewer** - Compare configuration changes between updates
- **Smart Search** - Real-time filtering of images and content
- **Lazy Loading** - Optimized image loading for performance
- **Lightbox Gallery** - Full-screen image viewing with smooth animations

### 🔧 Technical Features
- **RSS Feed** - Subscribe to updates at `/rss.xml`
- **Sitemap** - SEO-optimized at `/sitemap.xml`
- **Search Index** - Global search capability
- **Responsive Design** - Perfect on all devices
- **Keyboard Shortcuts** - Power user friendly (`/` to search, `?` for help)

### 🚀 Performance
- **Parallel Processing** - 3-5x faster metadata generation
- **Metadata Caching** - Instant rebuilds
- **Chunked Diffs** - Handles huge files (2MB+) efficiently
- **Optimized Build** - Fast static site generation

## 📊 Update Schedule

New updates are added regularly as game patches are released. Each update includes:
- ✅ All new and modified game sprites/images
- ✅ Text file configuration changes with diffs
- ✅ Automatic metadata generation

## Fair Use Notice

The images and artwork displayed on this website are used strictly for educational, informational, commentary, and news reporting purposes under Fair Use (Section 107 of the U.S. Copyright Act). This content is not for commercial exploitation, and no ownership of the original works is claimed. All intellectual property rights remain with their respective copyright holders.

## 🛠️ For Developers

This project uses a **modular architecture** following **SOLID principles**:

```
tools/
├── config.mjs              # Centralized configuration
├── lib/                    # Modular components
│   ├── fileSystem.mjs      # File operations
│   ├── differ.mjs          # Diff generation
│   ├── metadata.mjs        # Metadata management
│   ├── templateEngine.mjs  # HTML rendering
│   └── pageBuilder.mjs     # Page building
├── generate.mjs            # Main entry point
└── watch.mjs               # Development mode
```

### Quick Start

```bash
# Install dependencies
npm install

# Generate site
npm run generate

# Development mode (auto-rebuild on changes)
npm run dev

# Rebuild all pages
npm run rebuild

# Code quality
npm run lint
npm run format
```

### Documentation

- **[DEVELOPER.md](./DEVELOPER.md)** - Comprehensive developer guide
- **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** - v2.0 refactoring summary

## 💖 Support

If you find this resource useful, consider supporting the project:

- [Patreon](https://www.patreon.com/renegade2k6UK) - Monthly support
- [X (Twitter)](https://x.com/Renegade2k6News) - Follow for updates
