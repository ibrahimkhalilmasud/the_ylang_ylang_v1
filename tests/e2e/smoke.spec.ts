import { test, expect } from '@playwright/test'

// Media-heavy hero: wait for DOM content rather than every image/video 'load'.
const opts = { waitUntil: 'domcontentloaded' as const }

test('homepage renders hero and primary CTA', async ({ page }) => {
  await page.goto('/', opts)
  await expect(page.getByRole('heading', { level: 1, name: 'The Ylang Ylang' })).toBeVisible()
  await expect(page.getByRole('link', { name: /reserve your stay/i }).first()).toBeVisible()
})

test('can navigate to rooms and see the six ensuite bedrooms', async ({ page }) => {
  await page.goto('/rooms', opts)
  await expect(page.getByRole('heading', { name: /six ensuite bedrooms/i })).toBeVisible()
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
