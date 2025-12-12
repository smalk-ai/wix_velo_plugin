/**
 * Smalk Ad - Custom Element (Advanced/Optional)
 * 
 * This is an optional custom element for displaying Smalk Ads.
 * For most use cases, the simpler HTML Component approach is recommended.
 * 
 * Usage:
 * 1. Add this file to your public folder
 * 2. Register the custom element in masterPage.js
 * 3. Use <smalk-ad placement-id="your-id"></smalk-ad>
 */

class SmalkAdElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._content = '';
    this.render();
  }
  
  static get observedAttributes() {
    return ['placement-id', 'page-url'];
  }
  
  connectedCallback() {
    if (this.placementId && this.pageUrl) {
      this.dispatchEvent(new CustomEvent('smalk-ad-load', {
        bubbles: true,
        detail: {
          placementId: this.placementId,
          pageUrl: this.pageUrl
        }
      }));
    }
  }
  
  get placementId() {
    return this.getAttribute('placement-id');
  }
  
  get pageUrl() {
    return this.getAttribute('page-url') || window.location.href;
  }
  
  /**
   * Set ad content (called from parent after fetching from backend)
   */
  setContent(html) {
    this._content = html || '';
    this.render();
  }
  
  clear() {
    this._content = '';
    this.render();
  }
  
  render() {
    const styles = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        [smalk-ads] {
          width: 100%;
          min-height: 20px;
          font-family: system-ui, sans-serif;
        }
        [smalk-ads]:empty {
          display: none;
        }
        [smalk-ads] img {
          max-width: 100%;
          height: auto;
        }
        [smalk-ads] a {
          color: inherit;
        }
      </style>
    `;
    
    this.shadowRoot.innerHTML = `
      ${styles}
      <div smalk-ads>${this._content}</div>
    `;
  }
}

// Register custom element
if (typeof customElements !== 'undefined' && !customElements.get('smalk-ad')) {
  customElements.define('smalk-ad', SmalkAdElement);
}
