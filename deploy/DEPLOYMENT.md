# Deployment & Apache Verification Guide — `aijiesuo.biz`

This guide covers building the static VitePress site, running QA checks, deploying to Apache (`httpd` / `apache2`), and verifying all production routing, SEO, caching, and security behaviors.

---

## 1. Build & QA Pipeline

Run from the repository root:

```bash
# 1. Install dependencies (first time or after lockfile updates)
npm ci

# 2. Build VitePress static site + generate rss.xml / verify sitemap.xml & robots.txt
npm run docs:build

# 3. Run automated static + source QA audit (outputs QA-REPORT.md)
npm run qa
```

`docs/.vitepress/dist/` is the complete static artifact directory.

---

## 2. Apache Server Setup

### Enable Required Modules (Debian / Ubuntu)

```bash
sudo a2enmod rewrite headers expires deflate ssl http2
# Optional (recommended for smaller JS/CSS/search chunk payloads):
sudo a2enmod brotli
```

### Install VirtualHost & Deploy Files

1. Create the web root:
   ```bash
   sudo mkdir -p /var/www/aijiesuo.biz/dist
   ```
2. Sync `docs/.vitepress/dist/` and `deploy/.htaccess` into `/var/www/aijiesuo.biz/dist/`:
   ```bash
   rsync -av --delete docs/.vitepress/dist/ /var/www/aijiesuo.biz/dist/
   cp deploy/.htaccess /var/www/aijiesuo.biz/dist/.htaccess
   ```
   Ensure readable permissions for the Apache user (`www-data` or `apache`):
   ```bash
   sudo chown -R www-data:www-data /var/www/aijiesuo.biz/dist
   sudo find /var/www/aijiesuo.biz/dist -type d -exec chmod 755 {} \;
   sudo find /var/www/aijiesuo.biz/dist -type f -exec chmod 644 {} \;
   ```
3. Copy `deploy/aijiesuo.biz.conf` to `/etc/apache2/sites-available/aijiesuo.biz.conf`, verify SSL certificate paths, then enable and reload:
   ```bash
   sudo a2ensite aijiesuo.biz.conf
   sudo apache2ctl configtest
   sudo systemctl reload apache2
   ```

> **Note:** `AllowOverride All` must be enabled in `<Directory /var/www/aijiesuo.biz/dist>` for `.htaccess` rules to take effect.

---

## 3. Production Verification Checklist

Run these checks immediately after deployment (replace sample nested route paths with actual built routes if needed):

| Check | Command | Expected Result |
| --- | --- | --- |
| **HTTP -> HTTPS redirect** | `curl -I http://aijiesuo.biz/` | `301 Moved Permanently` with `Location: https://aijiesuo.biz/` |
| **`www` -> apex redirect** | `curl -I https://www.aijiesuo.biz/` | `301 Moved Permanently` with `Location: https://aijiesuo.biz/` |
| **Homepage** | `curl -I https://aijiesuo.biz/` | `200 OK`, `text/html; charset=UTF-8`, `Cache-Control: no-cache, must-revalidate` |
| **Multi-level URLs** | `curl -I https://aijiesuo.biz/brands/` and a nested page `curl -I https://aijiesuo.biz/guides/...` | `200 OK` serving static `index.html` or `<page>.html` directly |
| **Trailing slash handling** | `curl -I https://aijiesuo.biz/brands` (dir) & `curl -I https://aijiesuo.biz/about/` (file) | Directory without slash `301` -> `/brands/`; `.html` file with trailing slash `301` -> `/about` |
| **Real HTTP 404 (no SPA fallback)** | `curl -I https://aijiesuo.biz/this-page-does-not-exist-404` | `404 Not Found` (must **NOT** return `200 OK` or root `index.html`), renders `/404.html` |
| **`sitemap.xml`** | `curl -I https://aijiesuo.biz/sitemap.xml` | `200 OK`, `application/xml`, `Cache-Control: public, max-age=3600, must-revalidate` |
| **`robots.txt`** | `curl -s https://aijiesuo.biz/robots.txt` | `200 OK`, `text/plain`, contains `Sitemap: https://aijiesuo.biz/sitemap.xml` |
| **`rss.xml`** | `curl -I https://aijiesuo.biz/rss.xml` | `200 OK`, `application/rss+xml` (or `application/xml`), valid RSS 2.0 XML |
| **Local search chunks** | Inspect `<script>`/network tab on site search | `/assets/chunks/@localSearchIndex*.js` or `/assets/chunks/VPLocalSearchBox*.js` returns `200 OK`, `application/javascript`, `immutable` |
| **Hashed JS / CSS assets** | `curl -I -H "Accept-Encoding: br,gzip" https://aijiesuo.biz/assets/<bundle>.css` | `200 OK`, `Content-Encoding: br` (or `gzip`), `Cache-Control: public, max-age=31536000, immutable` |
| **Images & Fonts** | `curl -I https://aijiesuo.biz/images/logos/<logo>.webp` | `200 OK`, `Cache-Control: public, max-age=2592000` (images) / `max-age=31536000, immutable` (fonts in `/assets/`) |
| **Security Headers** | `curl -I https://aijiesuo.biz/` | `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Strict-Transport-Security` |

---

## 4. Common Troubleshooting

- **Multi-level clean URL returns 404:** Confirm `mod_rewrite` is loaded, `AllowOverride All` is set in `aijiesuo.biz.conf`, and `Options -MultiViews` is active so Apache does not attempt content negotiation before `.htaccess` runs.
- **Redirect loop behind Cloudflare / CDN:** Ensure SSL mode at the CDN is set to **Full (strict)**, or verify `X-Forwarded-Proto: https` is forwarded to Apache.
- **404 returns `200 OK`:** Check that `ErrorDocument 404 /404.html` uses a relative local URI (`/404.html`), **not** `https://aijiesuo.biz/404.html` (an absolute URL forces Apache to issue a `302` redirect).
