/**
 * Smalk Integration - Example Page Code
 * 
 * WHY SERVER-SIDE?
 * AI Agents (ChatGPT, Claude, Perplexity, etc.) do NOT execute JavaScript.
 * Server-side tracking detects ALL visitors, including AI Agents.
 * 
 * Copy this code to your pages.
 */

import wixLocationFrontend from 'wix-location-frontend';
import { trackPageView, getAdContent } from 'backend/smalk';

$w.onReady(async function () {
  // ===========================================
  // SERVER-SIDE TRACKING (Required)
  // Detects AI Agents that don't execute JS
  // ===========================================
  trackPageView({
    path: wixLocationFrontend.path,
    referrer: wixLocationFrontend.referrer,
  });

  // ===========================================
  // ADS (Optional)
  // Fetch and display ad in a Rich Text element
  // ===========================================
  const adHtml = await getAdContent(wixLocationFrontend.url, 'sidebar-ad');
  if (adHtml) {
    $w('#adText').html = adHtml;
  }
});
