import { test, expect, type Page } from '@playwright/test'

async function skipTypewriter(page: Page) {
  await page.waitForTimeout(300)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
}

async function startGame(page: Page) {
  await page.goto('/')
  await page.getByText('[ BOOT SYSTEM ]').first().click()
  await skipTypewriter(page)

  const introInput = page.getByRole('textbox', {
    name: 'Press Enter to continue',
  })
  await introInput.press('Enter')
  await skipTypewriter(page)
}

test('supply purchasing flow works end-to-end', async ({ page }) => {
  await startGame(page)

  // Should see store layout
  await expect(page.locator('body')).toContainText('INDEPENDENCE_MO')

  // Buy oxen
  const oxenInput = page.getByRole('textbox', { name: /amount for oxen/i })
  await oxenInput.fill('200')
  await oxenInput.press('Enter')
  await skipTypewriter(page)

  // Buy food
  const foodInput = page.getByRole('textbox', { name: /amount for food/i })
  await foodInput.fill('100')
  await foodInput.press('Enter')
  await skipTypewriter(page)

  // Buy ammunition
  const ammoInput = page.getByRole('textbox', {
    name: /amount for ammunition/i,
  })
  await ammoInput.fill('100')
  await ammoInput.press('Enter')
  await skipTypewriter(page)

  // Buy clothing
  const clothingInput = page.getByRole('textbox', {
    name: /amount for clothing/i,
  })
  await clothingInput.fill('100')
  await clothingInput.press('Enter')
  await skipTypewriter(page)

  // Buy misc
  const miscInput = page.getByRole('textbox', { name: /amount for misc/i })
  await miscInput.fill('100')
  await miscInput.press('Enter')
  await skipTypewriter(page)

  // Should show journey beginning
  await expect(page.locator('body')).toContainText('YOUR JOURNEY BEGINS')

  // Press Enter to start traveling
  const beginInput = page.getByRole('textbox', {
    name: 'Press Enter to begin the journey',
  })
  await beginInput.press('Enter')
  await skipTypewriter(page)

  // Should now be in travel phase with status panels
  await expect(page.locator('body')).toContainText('PARTY_STATUS')
})
