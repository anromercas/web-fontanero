import type { ServiceSlug } from './business';

export const serviceIcons: Record<ServiceSlug, string> = {
  'instalaciones-fontaneria':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 11 12 4l9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>',
  'reparaciones-urgentes':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8z"/></svg>',
  'reparacion-fugas':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-3.5 5-5.5 8.3-5.5 11a5.5 5.5 0 0 0 11 0C17.5 11.3 15.5 8 12 3z"/></svg>',
  'griferia':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9V6a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v3"/><path d="M6 9h9a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8z"/></svg>',
  'termos-calentadores':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="7" y="3" width="10" height="18" rx="3"/><path d="M12 8v5l3 2"/></svg>',
  'atascos-desagues':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M17 12a5 5 0 1 0-5 5"/><path d="M12 12h.01"/></svg>',
};
