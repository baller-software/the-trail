import { test, expect, type Page } from '@playwright/test'

async function skipTypewriter(page: Page) {
  await page.waitForTimeout(300)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
}

test('landing page loads with hero text', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).toContainText('YOU HAVE DIED OF DYSENTERY')
  await expect(page.getByText('[ BOOT SYSTEM ]').first()).toBeVisible()
  await expect(page.getByText('OREGON_TRAIL_v1.0')).toBeVisible()
})

test('clicking BOOT SYSTEM starts the game', async ({ page }) => {
  await page.goto('/')
  await page.getByText('[ BOOT SYSTEM ]').first().click()
  await skipTypewriter(page)

  await expect(page.locator('body')).toContainText('THE OREGON TRAIL')
  await expect(
    page.getByRole('textbox', { name: 'Press Enter to continue' }),
  ).toBeVisible()
})

test('full flow: landing → intro → setup', async ({ page }) => {
  await page.goto('/')
  await page.getByText('[ BOOT SYSTEM ]').first().click()
  await skipTypewriter(page)

  // Press Enter to proceed past intro
  const input = page.getByRole('textbox', {
    name: 'Press Enter to continue',
  })
  await input.press('Enter')
  await skipTypewriter(page)

  // Should see the store layout
  await expect(page.locator('body')).toContainText('INDEPENDENCE_MO')
  await expect(page.locator('body')).toContainText('OXEN')
})
