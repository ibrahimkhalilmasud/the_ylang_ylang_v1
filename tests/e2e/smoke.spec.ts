import { test, expect } from '@playwright/test'

test('homepage renders hero and primary CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'The Ylang Ylang' })).toBeVisible()
  await expect(page.getByRole('link', { name: /reserve your stay/i }).first()).toBeVisible()
})

test('can navigate to rooms and see the six suites', async ({ page }) => {
  await page.goto('/rooms')
  await expect(page.getByRole('heading', { name: /six suites/i })).toBeVisible()
  await expect(page.getByText('Master Suites').first()).toBeVisible()
})

test('booking page shows the enquiry form and no fake availability', async ({ page }) => {
  await page.goto('/book')
  await expect(page.getByRole('heading', { name: /request availability/i })).toBeVisible()
  await expect(page.getByText(/no payment is taken/i)).toBeVisible()
})

test('rates page lists real seasonal pricing', async ({ page }) => {
  await page.goto('/rates')
  await expect(page.getByText('1,895')).toBeVisible()
})
