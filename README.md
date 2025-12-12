# Smalk for Wix (Velo)

Complete GEO (Generative Engine Optimization) integration for Wix using Velo.

## Why Server-Side?

**AI Agents (ChatGPT, Claude, Perplexity, Google AIO, etc.) do not execute JavaScript.**

This means:
- ❌ Traditional JavaScript analytics → **invisible to AI Agents**
- ❌ Client-side ad injection → **never displayed to AI Agents**

Smalk solves this with:
- ✅ **Server-side tracking** - Detects ALL visitors including AI Agents
- ✅ **Server-side ad fetching** - Get ad content via Velo backend

**Result:** Publishers can finally monetize AI Agent traffic.

## Requirements

- Wix site with Velo enabled
- Smalk account ([app.smalk.ai](https://app.smalk.ai))

## Installation

### Step 1: Enable Velo

1. Open your site in the Wix Editor
2. Click **Dev Mode** in the top bar
3. Click **Turn on Dev Mode**

### Step 2: Add Your API Keys

1. Go to **Secrets Manager** (Settings → Secrets Manager)
2. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `SMALK_PROJECT_KEY` | Your project UUID (Dashboard → Integrations) |
| `SMALK_API_KEY` | Your API key (Dashboard → Settings → API Keys) |

### Step 3: Add Backend Module

1. In Velo sidebar, click **Backend** (folder icon)
2. Create a new file: `smalk.jsw`
3. Copy the contents from `backend/smalk.jsw` in this package

### Step 4: Add Tracking to Pages

Add this code to your pages:

```javascript
import wixLocationFrontend from 'wix-location-frontend';
import { trackPageView } from 'backend/smalk';

$w.onReady(function () {
  // Server-side tracking (detects AI Agents)
  trackPageView({
    path: wixLocationFrontend.path,
    referrer: wixLocationFrontend.referrer,
  });
});
```

**That's it!** Your site is now tracking AI Agents.

### Step 5: Add Ad Placements (Optional)

To display ads, fetch ad content via the backend and display it in a Text or HTML element:

```javascript
import wixLocationFrontend from 'wix-location-frontend';
import { trackPageView, getAdContent } from 'backend/smalk';

$w.onReady(async function () {
  // Server-side tracking
  trackPageView({
    path: wixLocationFrontend.path,
    referrer: wixLocationFrontend.referrer,
  });

  // Fetch and display ad
  const adHtml = await getAdContent(wixLocationFrontend.url, 'sidebar-ad');
  if (adHtml) {
    $w('#adText').html = adHtml;  // Use a Rich Text element
  }
});
```

**Setup:**
1. Add a **Rich Text** element to your page
2. Set its ID (e.g., `#adText`)
3. The ad content will be injected when the page loads

## How It Works

```
┌─────────────────────────────────────────────────┐
│              Visitor loads page                  │
│         (Human browser OR AI Agent)              │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│            $w.onReady()                          │
│                                                  │
│   trackPageView() → Smalk API (via Velo backend) │
│   (detects AI Agents server-side)                │
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

### `checkConfiguration()`

Verify your setup is correct.

```javascript
import { checkConfiguration } from 'backend/smalk';

const status = await checkConfiguration();
console.log(status);
// { hasProjectKey: true, hasApiKey: true, isConfigured: true }
```

## File Structure

```
your-wix-site/
├── backend/
│   └── smalk.jsw          # Backend module (copy from this package)
└── pages/
    └── your-page.js       # Add trackPageView() call
```

## Troubleshooting

### Tracking Not Working

1. **Check Secrets**: Verify `SMALK_API_KEY` is set in Secrets Manager
2. **Publish your site**: Backend code only works on published sites
3. **Test configuration**:

```javascript
import { checkConfiguration } from 'backend/smalk';
const status = await checkConfiguration();
console.log(status);
```

### Ads Not Appearing

1. **Check Secrets**: Both `SMALK_PROJECT_KEY` and `SMALK_API_KEY` must be set
2. **Check element ID**: Make sure the Rich Text element ID matches your code
3. **Check ad availability**: You may not have active campaigns in your Smalk dashboard

## Support

- **Documentation**: https://smalk.ai/docs
- **Dashboard**: https://app.smalk.ai
- **Support**: support@smalk.ai
