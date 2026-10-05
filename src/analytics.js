export const GA_MEASUREMENT_ID = 'G-8KKRM5VCT5';

/**
 * Checks if the current page is being served in a local or development environment.
 */
export function isLocalhost() {
  const { hostname, protocol } = window.location;
  return (
    ['localhost', '127.0.0.1', '::1'].includes(hostname) ||
    hostname.startsWith('192.168.') ||
    hostname.endsWith('.local') ||
    protocol === 'file:'
  );
}

/**
 * Initializes Google Analytics 4 with automatic localhost exclusion.
 * Loads the gtag script and sets up dataLayer only in production environments.
 */
export function initAnalytics() {
  // Ensure gtag and dataLayer are always safely available for callers
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  if (isLocalhost()) {
    // Disable tracking for Google Analytics in local development
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    return;
  }

  // Load and initialize GA4 in production
  if (!window.__ga_initialized) {
    window.__ga_initialized = true;

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }
}

// Auto-initialize when imported
initAnalytics();
