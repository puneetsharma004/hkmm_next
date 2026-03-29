// src/app/sitemap.js
export default function sitemap() {
  const BASE = "https://harekrishnamarwar.org";
  const now = new Date();

  const staticRoutes = [
    { url: BASE,                          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/events`,              lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/gallery`,             lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/donations`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/visitor-info`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/store`,               lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/privacy-policy`,      lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms-and-condition`, lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    // FOLK Spirituals event
    { url: `${BASE}/event/ram-navami-2026`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  return staticRoutes;
}