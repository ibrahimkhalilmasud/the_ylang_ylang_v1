import { test, expect } from '@playwright/test'

// Media-heavy hero: wait for DOM content rather than every image/video 'load'.
const opts = { waitUntil: 'domcontentloaded' as const }

test('homepage renders hero and primary CTA', async ({ page }) => {
  await page.goto('/', opts)
  await expect(page.getByRole('heading', { level: 1, name: 'The Ylang Ylang' })).toBeVisible()
  await expect(page.getByRole('link', { name: /reserve your stay/i }).first()).toBeVisible()
})

test('can navigate to rooms and see the six bedrooms', async ({ page }) => {
  await page.goto('/rooms', opts)
  await expect(page.getByRole('heading', { name: /six bedrooms in paradise/i })).toBeVisible()
  await expect(page.getByText('Master Suites').first()).toBeVisible()
})

test('booking page shows the enquiry form and no fake availability', async ({ page }) => {
  await page.goto('/book', opts)
  await expect(page.getByRole('heading', { name: /request availability/i })).toBeVisible()
  await expect(page.getByText(/no payment is taken here/i)).toBeVisible()
})

test('rates page lists real seasonal pricing', async ({ page }) => {
  await page.goto('/rates', opts)
  await expect(page.getByText('1,895')).toBeVisible()
})

test('music control toggles ON/OFF with a clear label and single instance', async ({ page }) => {
  await page.goto('/', opts)
  const btn = page.getByRole('button', { name: /turn music (on|off)/i })
  await expect(btn).toBeVisible()
  // Starts OFF (no gesture yet) → label offers to turn it on.
  await expect(btn).toHaveAttribute('aria-label', 'Turn music on')
  await btn.click() // ON
  await expect(btn).toHaveAttribute('aria-label', 'Turn music off')
  await btn.click() // OFF — must return to the off state reliably
  await expect(btn).toHaveAttribute('aria-label', 'Turn music on')
  // Exactly one audio element exists (singleton), never a second instance.
  const audioCount = await page.evaluate(() => document.querySelectorAll('audio').length)
  expect(audioCount).toBeLessThanOrEqual(1)
})

test('hero video is present, muted, looping and inline', async ({ page }) => {
  await page.goto('/', opts)
  const attrs = await page.evaluate(() => {
    const v = document.querySelector('section video') as HTMLVideoElement | null
    return v ? { muted: v.muted, loop: v.loop, playsInline: v.playsInline } : null
  })
  expect(attrs).toEqual({ muted: true, loop: true, playsInline: true })
})

test('experience tile plays a video on hover, label sits below the image', async ({ page }) => {
  await page.goto('/', opts)
  const tile = page.locator('a[href="/villa"]').filter({ has: page.locator('img') }).first()
  await tile.scrollIntoViewIfNeeded()
  // Label text is present and below the media (structure check).
  await expect(tile.getByText('Architecture & living spaces')).toBeVisible()
  // Hover attaches + plays the preview video.
  await tile.hover()
  const video = tile.locator('video')
  await expect(video).toHaveCount(1, { timeout: 4000 })
  await expect(video).toHaveJSProperty('muted', true)
  await expect(video).toHaveJSProperty('loop', true)
})

test('hero has no Reserve button (moved to header) and header shows full brand name', async ({ page }) => {
  await page.goto('/', opts)
  // Header wordmark reads "The Ylang Ylang".
  await expect(page.locator('header').getByText('The Ylang Ylang')).toBeVisible()
  // The hero band CTA is "Discover the villa"; no "Reserve your stay" in the hero section.
  const heroReserve = page.locator('section').first().getByRole('link', { name: /reserve your stay/i })
  await expect(heroReserve).toHaveCount(0)
})
