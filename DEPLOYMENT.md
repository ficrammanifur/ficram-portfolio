# Deployment Guide

## GitHub Pages Deployment

### Step 1: Prepare Your Repository
1. Create a new repository named `portfolio` (or any name you prefer)
2. Clone the repository locally
3. Copy all portfolio files into the repository

### Step 2: Configure GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select:
   - Branch: `main` (or your default branch)
   - Folder: `/root`
4. Click **Save**

### Step 3: Access Your Site
Your portfolio will be available at:
- `https://yourusername.github.io/portfolio/` (if repo is named "portfolio")
- `https://yourusername.github.io/` (if repo is named "yourusername.github.io")

### Step 4: Custom Domain (Optional)
1. Purchase a domain from a registrar
2. Go to Settings → Pages
3. Under "Custom domain", enter your domain
4. Add DNS records to point to GitHub Pages (follow GitHub's instructions)
5. Enable "Enforce HTTPS"

## Local Development

To test locally before deploying:

1. Open `index.html` in your browser, or
2. Use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server)
   npm install -g http-server
   http-server
   ```
3. Visit `http://localhost:8000` in your browser

## File Structure for GitHub Pages

```
your-repo/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   ├── main.css
│   ├── about.css
│   ├── projects.css
│   └── contact.css
├── js/
│   ├── main.js
│   └── particles.js
└── README.md
```

## Troubleshooting

### Site not loading
- Ensure all HTML files are in the root directory
- Check that CSS/JS file paths are correct (relative paths)
- Clear browser cache and refresh

### Styling looks broken
- Verify CSS file paths in HTML head
- Check browser console for 404 errors
- Ensure CSS files are being served correctly

### Animations not working
- Check if JavaScript is enabled in browser
- Verify `js/` folder contains both `.js` files
- Check browser console for JavaScript errors

### Contact form not working
- Email links (`mailto:`) work directly
- For actual form submissions, you'd need a backend service
- Consider using Formspree, Netlify Forms, or similar

## Performance Tips

1. **Optimize Images**: Compress GitHub Stats images and external resources
2. **Browser Caching**: GitHub Pages automatically sets cache headers
3. **Minify CSS/JS**: Consider minifying for production (optional)
4. **Monitor Performance**: Use Lighthouse or WebPageTest to check performance

## Updates and Maintenance

1. Edit files locally
2. Commit changes: `git add . && git commit -m "Update portfolio"`
3. Push to GitHub: `git push origin main`
4. GitHub automatically rebuilds and deploys your site (usually within seconds)

---

Questions? Check GitHub Pages documentation: https://pages.github.com/
