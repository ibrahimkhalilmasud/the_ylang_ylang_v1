import type { MetadataRoute } from 'next'
import { NAV, RESERVE_HREF } from '@/lib/nav'

const SITE = 'https://theylangylang.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', ...NAV.map((n) => n.href), RESERVE_HREF, '/contact', '/privacy', '/terms']
  // Static build date; Date.now() is avoided intentionally.
  const lastModified = new Date('2026-08-21')
  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: path === '' || path === '/rates' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === RESERVE_HREF || path === '/rates' ? 0.9 : 0.7,
  }))
}
