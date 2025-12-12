/**
 * Smalk Integration - Example Page Code
 * 
 * This example shows how to integrate Smalk tracking and ads on a Wix page.
 * Copy the relevant parts to your page code.
 */

// =============================================================================
// IMPORTS
// =============================================================================

import wixLocationFrontend from 'wix-location-frontend';
import { trackPageView, getAdContent } from 'backend/smalk';

// =============================================================================
// PAGE INITIALIZATION
// =============================================================================

$w.onReady(async function () {
  // ----- SERVER-SIDE TRACKING (Highly Recommended) -----
  // This tracks AI bots that don't execute JavaScript
  // Call this on every page load
  trackPageView({
    path: wixLocationFrontend.path,
    referrer: wixLocationFrontend.referrer,
  });

  // ----- LOAD ADS (Optional) -----
  // If you have HTML components for ad display
  await loadAds();
});

// =============================================================================
// AD LOADING
// =============================================================================

/**
 * Load ads into HTML components.
 * 
 * Make sure your HTML components have element IDs matching
 * the component IDs used below (e.g., #headerAdContainer).
 */
async function loadAds() {
  const currentUrl = wixLocationFrontend.url;

  // Load header ad
  const headerAd = await getAdContent(currentUrl, 'header-ad');
  if (headerAd) {
    $w('#headerAdContainer').postMessage(headerAd);
  }

  // Load sidebar ad
  const sidebarAd = await getAdContent(currentUrl, 'sidebar-ad');
  if (sidebarAd) {
    $w('#sidebarAdContainer').postMessage(sidebarAd);
  }

  // Load footer ad
  const footerAd = await getAdContent(currentUrl, 'footer-ad');
  if (footerAd) {
    $w('#footerAdContainer').postMessage(footerAd);
  }
}
