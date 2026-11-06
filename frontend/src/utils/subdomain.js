/**
 * Subdomain Detection and Routing Utility for GoMo Deals
 * Supports:
 * - Admin Subdomain: admin.gomodeals.com | admin.localhost | ?portal=admin
 * - Seller Subdomain: seller.dashboard.com | seller.gomodeals.com | seller.localhost | ?portal=seller
 */

export function getActiveSubdomain() {
  if (typeof window === 'undefined') return null;

  const hostname = window.location.hostname.toLowerCase();
  const search = window.location.search;

  // 1. Query parameter override (ideal for local testing without DNS edits)
  // e.g. http://localhost:5174/?portal=admin or ?subdomain=seller
  if (search) {
    const params = new URLSearchParams(search);
    const portal = params.get('portal') || params.get('subdomain');
    if (portal === 'admin') return 'admin';
    if (portal === 'seller') return 'seller';
  }

  // 2. Admin subdomain detection (admin.gomodeals.com, admin.localhost)
  if (
    hostname.startsWith('admin.') || 
    hostname === 'admin' || 
    hostname === 'admin.gomodeals.com' ||
    hostname === 'admin.localhost'
  ) {
    return 'admin';
  }

  // 3. Seller subdomain detection (seller.dashboard.com, seller.gomodeals.com, seller.localhost)
  if (
    hostname.startsWith('seller.') || 
    hostname === 'seller' ||
    hostname === 'seller.dashboard.com' ||
    hostname === 'seller.gomodeals.com' ||
    hostname === 'seller.localhost' ||
    hostname.includes('seller.dashboard')
  ) {
    return 'seller';
  }

  return null;
}

export function isSubdomain(type) {
  return getActiveSubdomain() === type;
}

/**
 * Returns the full URL to redirect to a specific portal subdomain
 */
export function getPortalUrl(portal) {
  if (typeof window === 'undefined') return '';
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : '';

  // Production GoMo Deals domain
  if (hostname.includes('gomodeals.com')) {
    if (portal === 'admin') return `${protocol}//admin.gomodeals.com`;
    if (portal === 'seller') return `${protocol}//seller.dashboard.com`;
  }

  // Local development with subdomains (admin.localhost / seller.localhost work in Chrome & modern browsers)
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost')) {
    if (portal === 'admin') return `${protocol}//admin.localhost${port}`;
    if (portal === 'seller') return `${protocol}//seller.localhost${port}`;
  }

  // Fallback direct path
  return portal === 'admin' ? '/admin' : '/seller';
}
