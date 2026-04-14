import { test, expect, type Page } from '@playwright/test'

async function skipTypewriter(page: Page) {
  // Wait for React to render and animation to start
  await page.waitForTimeout(300)
  // Skip the typewriter animation
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
}

test('page loads with intro text', async ({ page }) => {
  await page.goto('/')
  await skipTypewriter(page)

  await expect(page.locator('body')).toContainText('THE OREGON TRAIL')
  await expect(page.locator('body')).toContainText('PRESS ENTER TO CONTINUE')
  await expect(page.getByLabel('Switch to amber phosphor theme')).toBeVisible()
})

test('intro transitions to supply setup on Enter', async ({ page }) => {
  await page.goto('/')
  await skipTypewriter(page)

  const input = page.getByRole('textbox', {
    name: 'Press Enter to continue',
  })
  await input.press('Enter')
  await skipTypewriter(page)

  await expect(page.locator('body')).toContainText(
    'HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM',
  )
})
