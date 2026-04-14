import { test, expect, type Page } from '@playwright/test'

async function skipTypewriter(page: Page) {
  await page.waitForTimeout(300)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
}

test('supply purchasing flow works end-to-end', async ({ page }) => {
  await page.goto('/')
  await skipTypewriter(page)

  // Skip intro
  const introInput = page.getByRole('textbox', {
    name: 'Press Enter to continue',
  })
  await introInput.press('Enter')
  await skipTypewriter(page)

  // Buy oxen
  await expect(page.locator('body')).toContainText('OXEN TEAM')
  const input = page.getByRole('textbox', { name: /amount for oxen/i })
  await input.fill('200')
  await input.press('Enter')
  await skipTypewriter(page)

  // Buy food
  await expect(page.locator('body')).toContainText('SPEND ON FOOD')
  const foodInput = page.getByRole('textbox', { name: /amount for food/i })
  await foodInput.fill('100')
  await foodInput.press('Enter')
  await skipTypewriter(page)

  // Buy ammunition
  await expect(page.locator('body')).toContainText('AMMUNITION')
  const ammoInput = page.getByRole('textbox', {
    name: /amount for ammunition/i,
  })
  await ammoInput.fill('100')
  await ammoInput.press('Enter')
  await skipTypewriter(page)

  // Buy clothing
  await expect(page.locator('body')).toContainText('CLOTHING')
  const clothingInput = page.getByRole('textbox', {
    name: /amount for clothing/i,
  })
  await clothingInput.fill('100')
  await clothingInput.press('Enter')
  await skipTypewriter(page)

  // Buy misc
  await expect(page.locator('body')).toContainText('MISCELLANEOUS')
  const miscInput = page.getByRole('textbox', { name: /amount for misc/i })
  await miscInput.fill('100')
  await miscInput.press('Enter')
  await skipTypewriter(page)

  // Should show summary and journey beginning
  await expect(page.locator('body')).toContainText('YOUR JOURNEY BEGINS')

  // Press Enter to start traveling
  const beginInput = page.getByRole('textbox', {
    name: 'Press Enter to begin the journey',
  })
  await beginInput.press('Enter')
  await skipTypewriter(page)

  // Should now be in travel phase with status display
  await expect(page.locator('body')).toContainText('MILES TRAVELED')
})
