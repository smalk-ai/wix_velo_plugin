# Smalk for Wix (Velo)

Complete GEO (Generative Engine Optimization) integration for Wix using Velo.

## Features

### 1. 🌐 JavaScript Tracker (Frontend Analytics)
Client-side tracking for browser-based visitors via the Smalk tracker script.

### 2. 🖥️ Server-Side Tracking (AI Bot Detection)
Track ALL page visits server-side to detect AI bots that don't execute JavaScript:
- ChatGPT, Claude, Perplexity
- Google AIO, Bing AI
- AI crawlers and scrapers

**Critical:** Without server-side tracking, you'll miss 70-90% of AI bot traffic!

### 3. 📊 AI Search Ads
Display contextual ads for AI-driven traffic using `<div smalk-ads>` elements in HTML components.

## Requirements

- Wix site with Velo enabled
- Smalk account with API credentials

## Setup

### Step 1: Enable Velo

1. Open your site in the Wix Editor
2. Click **Dev Mode** in the top bar
3. Click **Turn on Dev Mode**

### Step 2: Add Secrets

Store your API credentials securely:

1. Go to **Secrets Manager** (Settings → Secrets Manager)
2. Add these two secrets:

| Secret Name | Value |
|-------------|-------|
| `SMALK_PROJECT_KEY` | Your project UUID (from Dashboard → Integrations) |
| `SMALK_API_KEY` | Your API key (from Dashboard → Settings → API Keys) |

### Step 3: Create Backend Module

1. In Velo sidebar, click **Backend** (folder icon)
2. Create a new file: `smalk.jsw`
3. Copy the contents from `backend/smalk.jsw` in this package

### Step 4: Add Page Code

Add tracking to your pages:

```javascript
import wixLocationFrontend from 'wix-location-frontend';
import { trackPageView, getAdContent } from 'backend/smalk';

$w.onReady(async function () {
  // Server-side tracking (CRITICAL for AI bot detection)
  trackPageView({
    path: wixLocationFrontend.path,
    referrer: wixLocationFrontend.referrer,
  });

  // Load ads if using HTML components
  const adHtml = await getAdContent(wixLocationFrontend.url, 'sidebar-ad');
  if (adHtml) {
    $w('#sidebarAdContainer').postMessage(adHtml);
  }
});
```

### Step 5: Create Ad Containers (Optional)

For displaying ads, create HTML iframe components:

1. Add an **HTML iframe** element
2. Set the element ID (e.g., `#sidebarAdContainer`)
3. Use this HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; }
    [smalk-ads]:empty { display: none; }
  </style>
</head>
<body>
  <div smalk-ads></div>
  <script>
    const adContainer = document.querySelector('[smalk-ads]');
    window.onmessage = (event) => {
      if (event.data && typeof event.data === 'string') {
        adContainer.innerHTML = event.data;
      }
    };
  </script>
</body>
</html>
```

## How It Works

```
┌─────────────────────────────────────────────────┐
│            Visitor requests page                 │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│            $w.onReady()                          │
│                                                  │
│  1. trackPageView() → Smalk API                  │
│     (detects AI bots server-side)               │
│                                                  │
│  2. getAdContent() → Smalk API                   │
│     (fetches contextual ad HTML)                │
│                                                  │
│  3. postMessage() → HTML iframe                  │
│     (displays ad content)                       │
└─────────────────────────────────────────────────┘
```

## API Reference

### `trackPageView(context)`

Track a page visit server-side.

```javascript
trackPageView({
  path: '/products/widget',
  referrer: 'https://google.com',
});
```

### `getAdContent(pageUrl, selectorId)`

Fetch ad content for a placement.

```javascript
const adHtml = await getAdContent(
  'https://mysite.com/blog/post',
  'sidebar-ad'
);
```

### `getTrackerScript()`

Get the JavaScript tracker script tag.

```javascript
const script = await getTrackerScript();
// <script src="https://api.smalk.ai/tracker.js?PROJECT_KEY=xxx" async></script>
```

### `checkConfiguration()`

Verify your setup is correct.

```javascript
const status = await checkConfiguration();
// { hasProjectKey: true, hasApiKey: true, isConfigured: true }
```

## Ad Placement HTML

Use the `smalk-ads` attribute:

```html
<div smalk-ads></div>
<div smalk-ads id="header-ad"></div>
```

## Troubleshooting

### Tracking Not Working

1. **Check Secrets**: Verify `SMALK_API_KEY` is set
2. **Publish site**: Backend code only works on published sites
3. **Test configuration**:
```javascript
import { checkConfiguration } from 'backend/smalk';
const status = await checkConfiguration();
console.log(status);
```

### Ads Not Appearing

1. **Check Secrets**: Both `SMALK_PROJECT_KEY` and `SMALK_API_KEY` needed
2. **Check HTML component**: Ensure postMessage is working
3. **Check ad availability**: You may not have active campaigns

## File Structure

```
your-wix-site/
├── backend/
│   └── smalk.jsw          # Backend module
└── pages/
    └── your-page.js       # Page code with tracking
```

## Support

- **Documentation**: https://smalk.ai/docs
- **Dashboard**: https://app.smalk.ai
- **Support**: support@smalk.ai
