/**
 * Smalk Integration - Example Page Code
 * 
 * WHY SERVER-SIDE?
 * AI Agents (ChatGPT, Claude, Perplexity, etc.) do NOT execute JavaScript.
 * Server-side tracking detects ALL visitors, including AI Agents.
 * 
 * SETUP: Only SMALK_API_KEY needed in Secrets Manager.
 * Workspace info is fetched automatically.
 */

import wixLocationFrontend from 'wix-location-frontend';
import { trackPageView, getAdContent } from 'backend/smalk';

$w.onReady(async function () {
  // ===========================================
  // SERVER-SIDE TRACKING (fire-and-forget, non-blocking)
  // Detects AI Agents that don't execute JS
  // ===========================================
  trackPageView({
    path: wixLocationFrontend.path,
    referrer: wixLocationFrontend.referrer,
  });
  // Note: No await - tracking runs in background without blocking page load

  // ===========================================
  // ADS (Optional - requires Publisher activated)
  // Must await - we need the response for display
  // ===========================================
  const adHtml = await getAdContent(wixLocationFrontend.url, 'sidebar-ad');
  if (adHtml) {
    $w('#adText').html = adHtml;
  }
});
